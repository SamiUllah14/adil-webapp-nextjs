'use client';

import React from 'react';
import { FaMinus, FaPlus, FaStar, FaTimes } from 'react-icons/fa';
import { CartItem, useCartStore } from '../ZustandStore/store';

interface CartItemProps {
  item: CartItem;
}

export const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const { incrementQuantity, decrementQuantity, removeItem, addToFavorites } = useCartStore();

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-6">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            className="h-24 w-24 rounded-md object-cover"
            src={item.imageUrl}
            alt={`${item.name} image`}
          />
        </div>

        {/* Product Details */}
        <div className="mt-4 flex-1 md:mt-0">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
            {item.name}
          </h3>

          {/* Quantity Controls and Price */}
          <div className="mt-4 flex items-center justify-between">
            {/* Quantity Controls */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => decrementQuantity(item.id)}
                className="flex items-center justify-center h-8 w-8 bg-gray-100 text-gray-700 rounded-l hover:bg-gray-200 transition-colors duration-200"
                aria-label="Decrease quantity"
              >
                <FaMinus />
              </button>
              <input
                type="text"
                value={item.quantity}
                readOnly
                className="w-12 text-center border-t border-b border-gray-200 bg-white text-gray-700"
                aria-label="Quantity"
              />
              <button
                type="button"
                onClick={() => incrementQuantity(item.id)}
                className="flex items-center justify-center h-8 w-8 bg-gray-100 text-gray-700 rounded-r hover:bg-gray-200 transition-colors duration-200"
                aria-label="Increase quantity"
              >
                <FaPlus />
              </button>
            </div>

            {/* Price */}
            <div>
              <p className="text-lg font-bold text-gray-900">
                Rs.{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex items-center space-x-4">
            <button
              type="button"
              onClick={() => addToFavorites(item.id)}
              className="flex items-center text-sm font-medium text-gray-600 hover:text-yellow-500 transition-colors duration-200"
              aria-label="Add to Favorites"
            >
              <FaStar className="mr-1 text-yellow-400" />
              Add to Favorites
            </button>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors duration-200"
              aria-label="Remove Item"
            >
              <FaTimes className="mr-1" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
