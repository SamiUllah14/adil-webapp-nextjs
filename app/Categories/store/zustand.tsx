import { create } from 'zustand';
import { Product } from '@/app/AllProducts/ZustandStore/type';
import apiClient from '@/app/AllProducts/ZustandStore/api';

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProductsByCategory: (categoryName: string, page?: number, pageSize?: number) => Promise<void>;
}

const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProductsByCategory: async (categoryName, page = 1, pageSize = 40) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get(
        `/products?categoryName=${categoryName}&page=${page}&pageSize=${pageSize}`
      );
      set((state) => ({
        products: page > 1 ? [...state.products, ...response.data] : response.data,
        isLoading: false,
      }));
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage, isLoading: false });
    }
  },
}));

export default useProductStore;
