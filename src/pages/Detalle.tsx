import { LoaderFunction, Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

import { LoaderFunctionArgs } from "react-router-dom";
import { Product, Products } from "@/types";
import Navbar from "@/components/navbar";
import { ProductCard } from "@/components/ProductCard";
import { LoadingSkeleton } from "@/components/Skeleton";

export const DetalleLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const response = fetch(`https://server.jonarrodi99136.workers.dev/items?q=${q}`).then((r) => r.json());
  return defer({ data: response });
};


const Detalle = () => {
  const data = useLoaderData() as { data: Products[] };

  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingSkeleton />}>
        <Await resolve={data.data}>
          {(products: Products[]) => (
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

export default Detalle;

