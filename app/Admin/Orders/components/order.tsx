import React from 'react';

interface OrderProps {
  id: number;
  deliveryId: number;
  totalAmount: number;
  tax: number;
  finalAmount: number;
}

export const OrderComponent: React.FC<OrderProps> = ({ id, deliveryId, totalAmount, tax, finalAmount }) => (
  <div className="border-b border-gray-200 p-4 flex justify-between items-center">
    <div>
      <h3 className="text-lg font-bold">Order #{id}</h3>
      <p>Delivery ID: {deliveryId}</p>
    </div>
    <div className="text-right">
      <p>Total: Rs.{totalAmount}</p>
      <p>Tax: Rs.{tax}</p>
      <p>Final Amount: Rs.{finalAmount}</p>
    </div>
  </div>
);

interface DeliveryProps {
  id: number;
  address: string;
  city: string;
  altPhone: string;
}

export const DeliveryComponent: React.FC<DeliveryProps> = ({ id, address, city, altPhone }) => (
  <div className="border-b border-gray-200 p-4 flex justify-between items-center">
    <div>
      <h3 className="text-lg font-bold">Delivery #{id}</h3>
      <p>Address: {address}</p>
      <p>City: {city}</p>
      <p>Phone: {altPhone}</p>
    </div>
  </div>
);
