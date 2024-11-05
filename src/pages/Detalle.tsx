import { LoaderFunction, Await, defer, useLoaderData } from 'react-router-dom';
import { Product } from '../types';
import { Suspense } from 'react';

// Define el tipo de los parámetros de DetalleLoader
import { LoaderFunctionArgs } from 'react-router-dom';

export const DetalleLoader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  const q = params.q ? new URLSearchParams({ q: params.q }).get('q') : '';
  const response = fetch(`https://examen2-mauve.vercel.app/api/hello?type=search&q=${q}`)
    .then((r) => r.json());

  return defer({ data: response });
};

const Detalle = () => {
  const data = useLoaderData() as { data: Product };

  return (
    <Suspense fallback={<p>cargando</p>}>
      <Await resolve={data.data}>
        {(product: Product) => (
          <div>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.discountPercentage}</p>
            <p>{product.rating}</p>
            <p>{product.stock}</p>
            <p>{product.brand}</p>
            <p>{product.category}</p>
            <img src={product.thumbnail} alt={product.title} />
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default Detalle;
