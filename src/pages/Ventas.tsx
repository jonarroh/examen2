import { LoaderFunction, Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/navbar";
import { Product } from "@/types";

// Loader para obtener los datos de ventas desde la API
export const SalesLoader: LoaderFunction = async () => {
  const response = await fetch(`https://server.jonarrodi99136.workers.dev/sales`);
  const data = await response.json();

  // Convertir el objeto con claves dinámicas en un arreglo
  const sales = Promise.resolve(Object.values(data).reverse());
  return defer({ sales });
};

const Sales = () => {
  const data = useLoaderData() as { sales: Product[] };

  console.log(data);
  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingSkeleton />}>
        <Await resolve={data.sales}>
          {(sales: Product[]) => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {sales.map((sale) => (
                sale.productId ? <SaleCard key={sale.productId.toString()} sale={sale} /> : null
              ))}
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
};

const SaleCard = ({ sale }: { sale: Product }) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
      <CardHeader className="p-4">
        <img src={sale.images[0]} alt={sale.title} className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => e.currentTarget.src = "/logo.jpg"}
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold">{sale.title}</CardTitle>
        <p className="text-sm text-gray-500">{sale.description}</p>
        <span className="text-xl font-semibold text-green-600">${Number(sale.price).toFixed(2)}</span>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4">

      </CardFooter>
    </Card>
  );
};

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    {[...Array(6)].map((_, i) => (
      <Skeleton key={i} className="w-full h-64 bg-gray-200 rounded-lg" />
    ))}
  </div>
);

export default Sales;