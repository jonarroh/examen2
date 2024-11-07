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
  productId?: number;
}
interface Order {
  [key: string]: {
    date: string;
    productId: number;
    quantity: number;
    title: string;
    price: number;
    description: string;
    brand: string;
    category: string;
    images: string[];
  }
}
interface ProductsData {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}


export type { Product, ProductsData, Order };