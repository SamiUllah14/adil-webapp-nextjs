"use client";

import React, { useEffect } from 'react';
import LineComponent from '../LineComponent/LineComponent';
import CustomButton from '../CustomButton/CustomButton';
import useProductStore from '@/app/AllProducts/ZustandStore/AllProductStore';
import ProductCard from '@/app/AllProducts/components/Products/ProductCard';

const AllProducts: React.FC = () => {
  // Extract each piece of state individually to prevent unnecessary re-renders
  const products = useProductStore((state) => state.products);
  const isLoading = useProductStore((state) => state.isLoading);
  const error = useProductStore((state) => state.error);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Determine the products to display (first 8)
  const visibleProducts = products.slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen lg:max-w-[70%] max-w-[85%] mx-auto">
      <div className="mt-20 lg:mt-40 md:mt-40">
        <LineComponent text="Explore All Medicines" />

        <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {/* Handle Loading State */}
          {isLoading && (
            <div className="text-center col-span-full">
              <p className="text-xl">Loading products...</p>
            </div>
          )}

          {/* Handle Error State */}
          {error && (
            <div className="text-center col-span-full text-red-500">
              <p className="text-xl">Error: {error}</p>
            </div>
          )}

          {/* Display Products */}
          {!isLoading && !error && visibleProducts.length > 0 ? (
            visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : !isLoading && !error && (
            <div className="text-center col-span-full">
              <p className="text-xl">No products found.</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center pt-5">
        <CustomButton text="EXPLORE ALL MEDICINES" route="/AllProducts" />
      </div>
    </div>
  );
};

export default AllProducts;
