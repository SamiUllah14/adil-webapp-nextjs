import React from 'react';

interface Delivery {
  id: number;
  address: string;
  city: string;
  altPhone: string;
}

interface OrderProps {
  id: number;
  delivery?: Delivery;
  totalAmount: number;
  tax: number;
  finalAmount: number;
  onDelete: (orderId: number) => void; // Callback for deletion
}

export const OrderComponent: React.FC<OrderProps> = ({
  id,
  delivery,
  totalAmount,
  tax,
  finalAmount,
  onDelete,
}) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this order and its delivery?')) {
      await onDelete(id); // Call the parent-provided delete handler
    }
  };

  return (
    <div className="border-b border-gray-200 p-4">
      <div>
        <h3 className="text-lg font-bold">Order #{id}</h3>
        <p>Total: Rs.{totalAmount}</p>
        <p>Tax: Rs.{tax}</p>
        <p>Final Amount: Rs.{finalAmount}</p>
      </div>
      {delivery ? (
        <div className="mt-4">
          <h4 className="text-md font-semibold">Delivery Details</h4>
          <p>Address: {delivery.address}</p>
          <p>City: {delivery.city}</p>
          <p>Phone: {delivery.altPhone}</p>
        </div>
      ) : (
        <p className="text-gray-500">No delivery information available.</p>
      )}
      <button
        onClick={handleDelete}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Done
      </button>
    </div>
  );
};
