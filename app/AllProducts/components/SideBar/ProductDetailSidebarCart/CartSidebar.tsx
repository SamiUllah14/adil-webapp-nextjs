'use client';

import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { CartItem } from "@/app/ShoppingCart/ZustandStore/store";
import { CartItemComponent } from '@/app/ShoppingCart/components/CartItem';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, cartItems }) => {
  return (
    <div 
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <button 
          className="text-gray-600 hover:text-gray-800"
          aria-label="Close cart"
        >
          <FaTimes />
        </button>
      </div>
      
      <div className="overflow-y-auto h-[calc(100%-64px)] p-4">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItemComponent key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;