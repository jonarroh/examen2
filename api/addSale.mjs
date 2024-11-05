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

        // Enviar la compra a Firebase
        const response = await fetch('https://daybook-460dd-default-rtdb.firebaseio.com/jonarro/sales.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...body, date: new Date().toISOString() }),
        });

        if (!response.ok) {
            throw new Error('Error al registrar la compra en Firebase');
        }

        // Respuesta exitosa
        return new Response(JSON.stringify({ success: true }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: 'Error processing request: ' + error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
