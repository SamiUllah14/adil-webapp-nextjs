'use client';

import React, { useEffect, useState } from 'react';
import { OrderComponent } from './components/order';
import { useAppStore } from './store/zustand';

interface Delivery {
  id: number;
  address: string;
  city: string;
  altPhone: string;
}

const OrdersPage: React.FC = () => {
  const { orders, fetchOrders } = useAppStore();
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  useEffect(() => {
    // Fetch orders from the store
    (async () => {
      try {
        await fetchOrders(1);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    })();
  }, [fetchOrders]);

  useEffect(() => {
    // Fetch deliveries and ensure unique records
    (async () => {
      try {
        const response = await fetch(`http://localhost:5151/api/delivery`);
        if (response.ok) {
          const data: Delivery[] = await response.json();
          // Filter out duplicate deliveries
          const uniqueDeliveries = Array.from(new Set(data.map((d) => d.id)))
            .map((id) => data.find((d) => d.id === id)!); // Ensure uniqueness
          setDeliveries(uniqueDeliveries);
        } else {
          console.error('Failed to fetch deliveries:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      }
    })();
  }, []);

  const handleDelete = async (orderId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5151/api/checkout/order-with-delivery/${orderId}`,
        {
          method: 'DELETE',
        }
      );
      if (response.ok) {
        // Remove the deleted order and associated delivery from the state
        const updatedOrders = orders.filter((o) => o.id !== orderId);
        const deliveryIdToRemove = orders.find((o) => o.id === orderId)?.deliveryId;

        useAppStore.setState({ orders: updatedOrders });

        setDeliveries((prev) =>
          deliveryIdToRemove ? prev.filter((d) => d.id !== deliveryIdToRemove) : prev
        );
      } else {
        console.error('Failed to delete order and delivery.');
      }
    } catch (error) {
      console.error('Error deleting order and delivery:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Orders and Deliveries</h1>

        <div className="flex flex-wrap gap-6">
          <section className="flex-1 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-500">No orders found.</p>
            ) : (
              orders.map((order) => {
                const delivery = deliveries.find((d) => d.id === order.deliveryId);

                return (
                  <OrderComponent
                    key={order.id}
                    id={order.id}
                    delivery={delivery}
                    totalAmount={order.totalAmount}
                    tax={order.tax}
                    finalAmount={order.finalAmount}
                    onDelete={handleDelete} // Pass the delete handler
                  />
                );
              })
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default OrdersPage;
