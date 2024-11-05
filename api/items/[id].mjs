import { products } from "../hello.mjs";

export async function GET(request, { params }) {
    const { id } = params;
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