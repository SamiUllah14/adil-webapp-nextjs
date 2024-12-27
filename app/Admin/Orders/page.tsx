'use client';

import React, { useEffect } from 'react';
import { OrderComponent, DeliveryComponent } from './components/order';
import { useAppStore } from './store/zustand';

const OrdersPage: React.FC = () => {
  const { orders, deliveries, fetchOrders, fetchDeliveries } = useAppStore();

  useEffect(() => {
    fetchOrders();
    fetchDeliveries();
  }, [fetchOrders, fetchDeliveries]);

  useEffect(() => {
    console.log('Orders:', orders);
    console.log('Deliveries:', deliveries);
  }, [orders, deliveries]);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Orders and Deliveries</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-500">No orders found.</p>
          ) : (
            orders.map((order) => (
              <OrderComponent
                key={order.id}
                id={order.id}
                deliveryId={order.deliveryId}
                totalAmount={order.totalAmount}
                tax={order.tax}
                finalAmount={order.finalAmount}
              />
            ))
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Deliveries</h2>
          {deliveries.length === 0 ? (
            <p className="text-gray-500">No deliveries found.</p>
          ) : (
            deliveries.map((delivery) => (
              <DeliveryComponent
                key={delivery.id}
                id={delivery.id}
                address={delivery.address}
                city={delivery.city}
                altPhone={delivery.altPhone}
              />
            ))
          )}
        </section>
      </div>
    </main>
  );
};

export default OrdersPage;
