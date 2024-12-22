import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define CartItem interface
export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

// Define the structure of the cart state
interface CartState {
  cartItems: CartItem[];
  alsoBoughtItems: CartItem[];
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  addToFavorites: (id: number) => void;
  addToCart: (item: CartItem) => void;
  calculateTotal: () => number;
}

// Initial data examples (ensure unique ids)
const initialAlsoBoughtItems: CartItem[] = [
  { id: 2001, name: "Sample Item A", price: 1200, imageUrl: "/imageA.jpg", quantity: 1 },
  { id: 2002, name: "Sample Item B", price: 1500, imageUrl: "/imageB.jpg", quantity: 1 },
];

const initialCartItems: CartItem[] = [];

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: initialCartItems,
      alsoBoughtItems: initialAlsoBoughtItems,

      incrementQuantity: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decrementQuantity: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        })),

      removeItem: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

      addToFavorites: (id) => {
        console.log(`Add item ${id} to favorites (not yet implemented).`);
      },

      addToCart: (newItem) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.id === newItem.id
          );
          if (existingItem) {
            // If the item already exists, update the quantity
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === newItem.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            // Otherwise, add the new item to the cart
            return {
              cartItems: [...state.cartItems, { ...newItem, quantity: 1 }],
            };
          }
        }),

      calculateTotal: () => {
        return get().cartItems.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        cartItems: state.cartItems, // Only persist cart items
      }),
    }
  )
);
