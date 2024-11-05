import { products } from "../hello.mjs"; // Asegúrate de que la ruta sea correcta

export async function GET(request) {
    // Asegúrate de que 'params' esté definido
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
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