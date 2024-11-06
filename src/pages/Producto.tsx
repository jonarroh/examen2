import Navbar from "@/components/navbar";
import { Product } from "@/types";
import { Suspense } from "react";
import { ActionFunctionArgs, Await, defer, LoaderFunction, LoaderFunctionArgs, redirect, useFetcher, useLoaderData } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Loader para obtener los datos del producto específico desde la API
export const ProductLoader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id || ""; // Acceder directamente a params.id
  const response = await fetch(`https://examen2-mauve.vercel.app/api/items/${id}`);
  const data = await response.json();
  return defer({ data });
};

// Action para manejar la compra
export const ProductAction = async ({ request }: ActionFunctionArgs) => {
  try {
    // Convertir FormData a un objeto JSON
    const formData = await request.formData();
    const productData = Object.fromEntries(formData.entries());

    // Asegurarse de que 'images' esté bien formateado (si es una cadena, parsearlo)
    let images = productData.images;
    if (typeof images === 'string') {
      images = JSON.parse(images); // Solo parsear si es un string JSON
    }

    // Preparar el objeto de datos para enviar en la solicitud
    const json = JSON.stringify({
      productId: productData.productId,
      title: productData.title,
      price: productData.price,
      description: productData.description,
      brand: productData.brand,
      stock: productData.stock,
      category: productData.category,
      images,  // Imágenes ya procesadas
      quantity: productData.quantity,
    });

    // Enviar la solicitud POST
    const response = await fetch("https://examen2-mauve.vercel.app/api/addSale", {
      method: 'POST',
      body: json,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return redirect("/"); // Redirige a la página principal
    } else {
      const errorData = await response.json();
      return { status: response.status, error: errorData };
    }
  } catch (error) {
    console.error("Error en la acción del producto:", error);
    return { status: 500, error: "Error interno del servidor" };
  }
};


// Componente para mostrar detalles del producto
function Producto() {
  const data = useLoaderData() as { data: Product };
  const fetcher = useFetcher();

  const handlePurchase = (product: Product) => {
    // Crear FormData y agregar los datos del producto
    const formData = new FormData();
    formData.append("productId", product.id.toString());
    formData.append("title", product.title);
    formData.append("price", product.price.toString());
    formData.append("description", product.description);
    formData.append("brand", product.brand);
    formData.append("stock", product.stock.toString());
    formData.append("category", product.category);
    formData.append("images", JSON.stringify(product.images)); // Convertir imágenes a string
    formData.append("quantity", "1");

    // Enviar los datos usando fetcher.submit con FormData
    fetcher.submit(formData, {
      method: "POST",
      action: `/producto/${product.id}`,
    });
  };

  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingSkeleton />}>
        <Await resolve={data.data}>
          {(product: Product) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
              <ProductDetail key={product.id} product={product} onPurchase={handlePurchase} />
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
}

export default Producto;

// Componente de detalles del producto con botón de compra
const ProductDetail = ({ product, onPurchase }: { product: Product; onPurchase: (product: Product) => void }) => (
  <Card className="shadow-lg p-6">
    <CardHeader className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <div className="flex space-x-2 overflow-x-auto">
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={product.title} className="w-32 h-32 object-cover rounded-lg"
            onError={
              (e) => {
                e.currentTarget.src = "/logo.jpg";
              }
            }
          />
        ))}
      </div>
    </CardHeader>
    <CardContent className="mt-4">
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-lg font-semibold text-gray-800">Precio: ${product.price.toFixed(2)}</p>
      <p className="text-gray-600">Marca: {product.brand}</p>
      <p className="text-gray-600">Stock: {product.stock} unidades</p>
      <p className="text-gray-600">Categoría: {product.category}</p>
    </CardContent>
    <CardFooter className="flex justify-center mt-4">
      <Button onClick={() => onPurchase(product)} className="bg-blue-600 text-white hover:bg-blue-700">
        Comprar
      </Button>
    </CardFooter>
  </Card>
);

// Componente de carga mientras se obtienen los datos
const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
    <Skeleton className="w-full h-80 bg-gray-200 rounded-lg" />
  </div>
);
