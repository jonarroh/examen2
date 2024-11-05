import { products } from './hello.mjs'

export async function GET(request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';

  // Filtrar productos que contengan la query en su título o descripción
  const filteredProducts = products.products.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );

  return new Response(JSON.stringify(filteredProducts), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}