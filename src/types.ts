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
export interface Products {
  availabilityStatus:   AvailabilityStatus;
  brand?:               string;
  category:             Category;
  description:          string;
  dimensions:           Dimensions;
  discountPercentage:   number;
  id:                   number;
  images:               string[];
  meta:                 Meta;
  minimumOrderQuantity: number;
  price:                number;
  rating:               number;
  returnPolicy:         ReturnPolicy;
  reviews:              Review[];
  shippingInformation:  string;
  sku:                  string;
  stock:                number;
  tags:                 string[];
  thumbnail:            string;
  title:                string;
  warrantyInformation:  string;
  weight:               number;
}

export type AvailabilityStatus = "Low Stock" | "In Stock";

export type Category = "beauty" | "fragrances" | "furniture" | "groceries";

export interface Dimensions {
  depth:  number;
  height: number;
  width:  number;
}

export interface Meta {
  barcode:   string;
  createdAt: Date;
  qrCode:    string;
  updatedAt: Date;
}

export type ReturnPolicy = "30 days return policy" | "60 days return policy" | "90 days return policy" | "No return policy" | "7 days return policy";

export interface Review {
  comment:       string;
  date:          Date;
  rating:        number;
  reviewerEmail: string;
  reviewerName:  string;
}


export type { Product };