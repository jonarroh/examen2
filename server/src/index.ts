import { Hono } from 'hono';
import { cors } from 'hono/cors'
const app = new Hono();

app.use(cors({
  origin: '*',
  allowHeaders: ['Content-Type'],
  allowMethods: ['*'],
}));

app.get('/sales', async (c) => {
  try {
    // Obtener compras de Firebase
    const response = await fetch('https://daybook-460dd-default-rtdb.firebaseio.com/jonarro/sales.json'); // Cambia esta URL por la de tu base de datos
    if (!response.ok) {
      throw new Error('Error al obtener compras de Firebase');
    }

    const compras = await response.json();

    // Si no hay compras, devolver un mensaje adecuado
    if (!compras || Object.keys(compras).length === 0) {
      return c.json({ message: 'No purchases found' }, 404);
    }

    // Devolver las compras si existen
    return c.json(compras, 200);
  } catch (error: any) {
    return c.json({ error: 'Error processing request: ' + (error as Error).message }, 500);
  }
});
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}


app.post('/addSale', async (c) => {
  try {
    const body = await c.req.json();  // Obtener el cuerpo de la solicitud

    // Validación de datos de entrada
    if (!body.productId || !body.quantity) {
      return c.json({ success: false, message: 'Invalid data' }, 400);
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
    return c.json({ success: true }, 201);

  } catch (error: any) {
    return c.json({ success: false, message: 'Error processing request: ' + error.message }, 500);
  }
});

app.get('/items/:id', async (c) => {
  try {
    // Obtener el ID del producto de la URL
    const id = c.req.param('id');

    // Obtener productos de Firebase
    const response = await fetch('https://daybook-460dd-default-rtdb.firebaseio.com/products.json'); // Cambia esta URL por la de tu base de datos
    if (!response.ok) {
      throw new Error('Error al obtener productos de Firebase');
    }

    const productsData = await response.json() as any;
    const products = productsData || [];
    const product = products.find((product:any) => product.id === Number(id));

    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }

    // Responder con el producto encontrado
    return c.json(product, 200);

  } catch (error) {
    return c.json({ error: 'Error processing request: ' + (error as Error).message }, 500);
  }
});

app.get('/items', async (c) => {
  const query = c.req.query('q') || '';  // Obtener el parámetro 'q' de la query string

  try {
    // Reemplaza la URL con la de tu base de datos de Firebase
    const response = await fetch('https://daybook-460dd-default-rtdb.firebaseio.com/products.json');

    if (!response.ok) {
      throw new Error('Error al obtener productos de Firebase');
    }

    const data = await response.json() as any;
    console.log(data);
    console.log(typeof data);
  
    const products: any[]= data || [];

    // Filtrar productos que contengan la query en su marca o categoría
    const filteredProducts = products.filter(product =>
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.title.toLowerCase().includes(query.toLowerCase()) 
    );

    console.log(filteredProducts);

    // Devolver los productos filtrados
    return c.json(filteredProducts, 200);

  } catch (error) {
    // Manejar errores
    return c.json({ error: (error as Error).message }, 500);
  }
});

export default app;
