import { compras } from "./hello.mjs";

export async function POST(request) {
    try {
        const body = await request.json();

        // Validación de datos de entrada
        if (!body.productId || !body.quantity) {
            return new Response(JSON.stringify({ success: false, message: 'Invalid data' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Registrar la compra
        compras.push({ ...body, date: new Date() });

        // Respuesta exitosa
        return new Response(JSON.stringify({ success: true }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: 'Error processing request' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}