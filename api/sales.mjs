export async function GET(request) {
  try {
    // Obtener compras de Firebase
    const response = await fetch(`https://daybook-460dd-default-rtdb.firebaseio.com/jonarro/sales.json`); // Cambia esta URL por la de tu base de datos
    if (!response.ok) {
      throw new Error('Error al obtener compras de Firebase');
    }

    const compras = await response.json();

    // Si necesitas manejar el caso donde no hay compras
    if (!compras || Object.keys(compras).length === 0) {
      return new Response(JSON.stringify({ message: 'No purchases found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(compras), {
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
