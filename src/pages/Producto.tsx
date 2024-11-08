import Navbar from "@/components/navbar";
import { Product } from "@/types";
import { Suspense } from "react";
import { ActionFunctionArgs, Await, defer, LoaderFunction, LoaderFunctionArgs, redirect, useFetcher, useLoaderData } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export const ProductLoader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id || "";
  const response = await fetch(`https://server.jonarrodi99136.workers.dev/items/${id}`);
  const data = await response.json();
  return defer({ data });
};

export const ProductAction = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const productData = Object.fromEntries(formData.entries());


    let images = productData.images;
    if (typeof images === 'string') {
      images = JSON.parse(images);
    }


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


    await fetch("https://server.jonarrodi99136.workers.dev/addSale", {
      method: 'POST',
      body: json,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    toast.success("Producto comprado exitosamente");

    return redirect("/sales");


  } catch (error) {
    console.error("Error en la acción del producto:", error);
    return { status: 500, error: "Error interno del servidor" };
  }
};



function Producto() {
  const data = useLoaderData() as { data: Product };
  const fetcher = useFetcher();

  const handlePurchase = (product: Product) => {
    const formData = new FormData();
    formData.append("productId", product.id.toString());
    formData.append("title", product.title);
    formData.append("price", product.price.toString());
    formData.append("description", product.description);
    formData.append("brand", product.brand);
    formData.append("stock", product.stock.toString());
    formData.append("category", product.category);
    formData.append("images", JSON.stringify(product.images))
    formData.append("quantity", "1");

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 w-full">
              <ProductDetail key={product.id} product={product} onPurchase={handlePurchase} />
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
}

export default Producto;

const ProductDetail = ({ product, onPurchase }: { product: Product; onPurchase: (product: Product) => void }) => (
  <Card className="shadow-lg p-6 w-screen">
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
      <p className="text-gray-600">Marca: {product.brand ?? "N/A"}</p>
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

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
    <Skeleton className="w-full h-80 bg-gray-200 rounded-lg" />
  </div>
);
