export interface Product {
  id: number;
  name: string;
  origin: string;
  country: string;
  category: string;
  roast: string;
  roastLevel: number; // 1-5
  price: number;
  weight: string;
  description: string;
  shortDesc: string;
  notes: string[];
  image: string;
  rating: number;
  reviews: number;
  altitude: string;
  process: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  grind: string;
}

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}
