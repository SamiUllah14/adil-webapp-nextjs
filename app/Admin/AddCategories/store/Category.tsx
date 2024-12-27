import { Category } from '@/app/AllProducts/ZustandStore/type';
import { create } from 'zustand';

interface CategoryStore {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  createCategory: (category: { name: string; imageUrl: string }) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('http://localhost:5151/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories.');
      }
      const data: Category[] = await response.json();
      set({ categories: data, isLoading: false });
    } catch (error: unknown) {
      console.error('Error fetching categories:', error);
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage, isLoading: false });
    }
  },

  createCategory: async ({ name, imageUrl }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('http://localhost:5151/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 0, name, imageUrl }),
      });
      if (!response.ok) {
        throw new Error('Failed to create category.');
      }
      const data: Category = await response.json();
      set((state) => ({ categories: [...state.categories, data], isLoading: false }));
    } catch (error: unknown) {
      console.error('Error creating category:', error);
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage, isLoading: false });
    }
  },

  deleteCategory: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`http://localhost:5151/api/categories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete category.');
      }
      set((state) => ({
        categories: state.categories.filter((category) => category.id !== id),
        isLoading: false,
      }));
    } catch (error: unknown) {
      console.error('Error deleting category:', error);
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage, isLoading: false });
    }
  },
}));

export default useCategoryStore;