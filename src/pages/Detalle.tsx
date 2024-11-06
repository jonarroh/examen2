import { LoaderFunction, Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LoaderFunctionArgs } from "react-router-dom";
import { Product } from "@/types";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";

// Loader para obtener los datos del producto desde la API
export const DetalleLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const response = fetch(`https://examen2-mauve.vercel.app/api/items?q=${q}`).then((r) => r.json());
  return defer({ data: response });
};

// Componente principal
const Detalle = () => {
  const data = useLoaderData() as { data: Product[] };

  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingSkeleton />}>
        <Await resolve={data.data}>
          {(products: Product[]) => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </Await>
      </Suspense>
    </>
  )
};

// Componente de tarjeta de producto
const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
      <CardHeader className="p-4">
        <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => e.currentTarget.src = "/logo.jpg"}
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold">{product.title}</CardTitle>
        <p className="text-sm text-gray-500">{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4">
        <StarPuntuacion rating={product.rating} />
        <span className="text-xl font-semibold text-blue-600">${product.price.toFixed(2)}</span>
        <span className="text-sm text-gray-500">{product.stock} disponibles</span>
        <Button variant="default" size="sm"
          onClick={() => navigate(`/producto/${product.id}`)}
        >Ver</Button>
      </CardFooter>
    </Card>
  );
}

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    {[...Array(6)].map((_, i) => (
      <Skeleton key={i} className="w-full h-64 bg-gray-200 rounded-lg" />
    ))}
  </div>
);

const StarPuntuacion = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ))}
    </div>
  );
}


export default Detalle;

