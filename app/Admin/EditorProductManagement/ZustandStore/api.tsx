// useProductStore.js
import { Product } from '@/app/AllProducts/ZustandStore/type';
import { create } from 'zustand';


interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: (params: { [key: string]: string | number }) => Promise<void>;
  createProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: false,
  error: null,
  fetchProducts: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const queryString = Object.keys(params)
        .map((key) => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');
      const response = await fetch(`http://localhost:5151/api/products?${queryString}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      const data: Product[] = await response.json();
      set({ products: data, isLoading: false });
    } catch (error) {
      console.error('Error fetching products:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch products. Please try again later.',
        isLoading: false,
      });
    }
  },
  createProduct: async (product: Product) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('http://localhost:5151/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Product = await response.json();
      set((state) => ({ products: [...state.products, data], isLoading: false }));
    } catch (error) {
      console.error('Error creating product:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to create product. Please try again later.',
        isLoading: false,
      });
    }
  },
  deleteProduct: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`http://localhost:5151/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error deleting product:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to delete product. Please try again later.',
        isLoading: false,
      });
    }
  },
}));

export default useProductStore;