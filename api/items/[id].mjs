export async function GET(request) {
    try {
        // Obtener el ID del producto de la URL
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();

        // Obtener productos de Firebase
        const response = await fetch(`https://daybook-460dd-default-rtdb.firebaseio.com/products.json`); // Cambia esta URL por la de tu base de datos
        if (!response.ok) {
            throw new Error('Error al obtener productos de Firebase');
        }

        const products = await response.json();

        // Buscar el producto por ID
        const product = Object.values(products).find(product => product.id === Number(id));

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
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error processing request: ' + error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
