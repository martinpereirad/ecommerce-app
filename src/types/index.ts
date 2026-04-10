export interface Product {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  imagen: string;
  fav?: boolean;
  rating: number;
  categoria: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterState {
  search: string;
  category: string;
  maxPrice: number;
}

export interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export interface FavStore {
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}
