'use client';

import { useCartStore } from '@/app/ShoppingCart/ZustandStore/store';
import React from 'react';

const OrderReportComponent: React.FC = () => {
  const { cartItems, calculateTotal } = useCartStore();
  const totalAmount = calculateTotal();
  const tax = 10; // Fixed tax amount
  const finalAmount = totalAmount + tax;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Order Report</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">No items in the order. Start adding items!</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-200 pb-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    Quantity: <span className="font-medium">{item.quantity}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Unit Price: Rs.{item.price.toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-lg font-bold text-gray-900">
                Rs.{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}

          <div className="mt-6 border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium text-gray-600">Subtotal</p>
              <p className="text-lg font-bold text-gray-900">Rs.{totalAmount.toLocaleString()}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium text-gray-600">Tax</p>
              <p className="text-lg font-bold text-gray-900">Rs.{tax.toLocaleString()}</p>
            </div>
            <div className="flex justify-between items-center border-t border-gray-300 pt-4">
              <p className="text-xl font-semibold text-gray-800">Total Amount</p>
              <p className="text-xl font-bold text-gray-900">Rs.{finalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderReportComponent;
