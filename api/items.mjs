export async function GET(request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';

  try {
    // Reemplaza 'YOUR_FIREBASE_URL' con la URL de tu base de datos de Firebase
    const response = await fetch('https://daybook-460dd-default-rtdb.firebaseio.com/products.json');

    if (!response.ok) {
      throw new Error('Error al obtener productos de Firebase');
    }

    const data = await response.json();
    const products = Object.values(data); // Convierte el objeto en un array

    // Filtrar productos que contengan la query en su título o descripción
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );

    return new Response(JSON.stringify(filteredProducts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
