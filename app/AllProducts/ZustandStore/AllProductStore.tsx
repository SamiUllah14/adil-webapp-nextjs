import { create } from 'zustand';
import { Product } from './type';

interface ProductStore {
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  fetchProducts: (params?: { [key: string]: string | number }) => Promise<void>;
  searchProducts: (params: { name?: string; manufacturer?: string; genericName?: string }) => Promise<void>;
  setSelectedProduct: (product: Product | null) => void;
  fetchProductById: (id: number) => Promise<void>;
  createProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

const useProductStore = create<ProductStore>((set) => ({
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,

  fetchProducts: async (params: { page?: number; pageSize?: number } = {}) => {
    set({ isLoading: true, error: null });
    try {
      const defaultParams = { page: 1, pageSize: 12 }; // Default to first page and 40 products per page
      const mergedParams = { ...defaultParams, ...params };
      const queryString = `?${Object.entries(mergedParams)
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join('&')}`;
      const response = await fetch(`http://localhost:5151/api/products${queryString}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products.');
      }
      const data: Product[] = await response.json();
      set((state) => ({
        products:
          mergedParams.page && mergedParams.page > 1
            ? [...state.products, ...data] // Append products for subsequent pages
            : data, // Replace products for the first page
        isLoading: false,
      }));
      
    } catch (error: unknown) {
      console.error('Error fetching products:', error);
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage, isLoading: false });
    }
  },
  

  searchProducts: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const queryString = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value || '')}`)
        .join('&');
      const response = await fetch(`http://localhost:5151/api/products/search?${queryString}`);
      if (!response.ok) {
        throw new Error('No products found or search failed.');
      }
      const data: Product[] = await response.json();
      set({ products: data, isLoading: false });
    } catch (error: unknown) {
      console.error('Error searching products:', error);
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage, isLoading: false });
    }
  },
  

  setSelectedProduct: (product) => set({ selectedProduct: product }),

  fetchProductById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`http://localhost:5151/api/products/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          set({ selectedProduct: null, isLoading: false });
          return;
        }
        throw new Error('Failed to fetch the product.');
      }
      const data: Product = await response.json();
      set({ selectedProduct: data, isLoading: false });
    } catch (error: unknown) {
      console.error('Error fetching product:', error);
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage, isLoading: false });
    }
  },

  createProduct: async (product) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('http://localhost:5151/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Failed to create product.');
      }
      const data: Product = await response.json();
      set((state) => ({ products: [...state.products, data], isLoading: false }));
    } catch (error: unknown) {
      console.error('Error creating product:', error);
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage, isLoading: false });
    }
  },

  deleteProduct: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`http://localhost:5151/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product.');
      }
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
        isLoading: false,
      }));
    } catch (error: unknown) {
      console.error('Error deleting product:', error);
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage, isLoading: false });
    }

    
  },
}));

export default useProductStore;
export type { Product };
