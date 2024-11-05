import { products } from "../../hello.mjs"; // Asegúrate de que la ruta sea correcta

export async function GET(request, { params }) {
  // Asegúrate de que 'params' esté definido
  if (!params || !params.id) {
    return new Response(JSON.stringify({ error: 'ID not provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const id = params.id; // Aquí debería estar 'id'
  const product = products.products.find(product => product.id === Number(id));

  if (!product) {
    return new Response(JSON.stringify({ error: 'Product not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}