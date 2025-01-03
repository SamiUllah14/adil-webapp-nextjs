"use client";
import React from "react";
import { useCartStore } from "./ZustandStore/store";
import { CartItemComponent } from "./components/CartItem";
import { OrderSummaryComponent } from "./components/Order Summary";

const ShoppingCartPage: React.FC = () => {
  const { cartItems } = useCartStore();

  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {/* Shopping Cart Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Shopping Cart
          </h2>
        </div>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          {/* Cart Items */}
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <CartItemComponent key={item.id} item={item} />
                ))
              ) : (
                <p className="text-center text-gray-500">Your cart is empty.</p>
              )}
            </div>

    
          </div>

          {/* Order Summary */}
          <div className="lg:max-w-xs lg:w-full lg:ml-auto mt-8 sm:mt-12 lg:mt-0">
            <OrderSummaryComponent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCartPage;
