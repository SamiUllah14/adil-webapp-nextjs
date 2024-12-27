import { create } from 'zustand';

interface Order {
  id: number;
  deliveryId: number;
  totalAmount: number;
  tax: number;
  finalAmount: number;
}

interface Delivery {
  id: number;
  address: string;
  city: string;
  altPhone: string;
}

interface StoreState {
  orders: Order[];
  deliveries: Delivery[];
  fetchOrders: () => Promise<void>;
  fetchDeliveries: () => Promise<void>;
}

export const useAppStore = create<StoreState>((set) => ({
  orders: [],
  deliveries: [],
  fetchOrders: async () => {
    try {
      const response = await fetch('http://localhost:5151/api/checkout');
      if (response.ok) {
        const orders = await response.json();
        set({ orders });
        console.log('Orders fetched:', orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  },
  fetchDeliveries: async () => {
    try {
      const response = await fetch('http://localhost:5151/api/delivery');
      if (response.ok) {
        const deliveries = await response.json();
        set({ deliveries });
        console.log('Deliveries fetched:', deliveries);
      }
    } catch (error) {
      console.error('Failed to fetch deliveries:', error);
    }
  },
}));
