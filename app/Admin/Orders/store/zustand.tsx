import { create } from 'zustand';

interface Order {
  id: number;
  deliveryId: number;
  totalAmount: number;
  tax: number;
  finalAmount: number;
}

interface StoreState {
  orders: Order[];
  fetchOrders: (page: number) => Promise<Order[]>;
}

export const useAppStore = create<StoreState>((set, get) => ({
  orders: [],
  fetchOrders: async (page: number) => {
    try {
      // pageSize is still here, but it won't matter since we won't be paginating
      const response = await fetch(`http://localhost:5151/api/checkout?page=${page}&pageSize=20`);
      if (response.ok) {
        const data: Order[] = await response.json();
        const existingOrders = get().orders;

        const newOrders = data.filter(
          (order) => !existingOrders.some((existing) => existing.id === order.id)
        );
        set({ orders: [...existingOrders, ...newOrders] });
        return newOrders;
      } else {
        console.error('Failed to fetch orders:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },
}));
