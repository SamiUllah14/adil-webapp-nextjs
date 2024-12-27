'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useProductStore from './store/zustand';
import ProductCard from '../AllProducts/components/Products/ProductCard';
import CustomButton from '@/app/components/CustomButton/CustomButton'; // Ensure correct path

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const categoryName = searchParams.get('categoryName'); // Get categoryName from query params

  const { products, fetchProductsByCategory, isLoading, error } = useProductStore(); // Ensure 'products' is fetched
  
  const [visibleCount, setVisibleCount] = useState(8); // Number of initially visible products

  useEffect(() => {
    if (categoryName) {
      fetchProductsByCategory(categoryName); // Fetch products when categoryName changes
    }
  }, [categoryName, fetchProductsByCategory]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8); // Increase the visible products count
  };

  const visibleProducts = products.slice(0, visibleCount); // Products to display
  const hasMore = visibleCount < products.length; // Check if there are more products to load

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!products.length) return <p>No products available in this category.</p>;

  return (
    <div className="flex flex-col min-h-screen lg:max-w-[70%] max-w-[85%] mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Products in Category: {categoryName}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={(selectedProduct) =>
              console.log('Category product clicked:', selectedProduct)
            }
            showDiscountBadge={true} // Show discount badge
          />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-6">
          <CustomButton text="Load More" onClick={handleLoadMore} />
        </div>
      )}
      {!hasMore && (
        <p className="text-center mt-6 text-gray-500">
          You have reached the end of the product list.
        </p>
      )}
    </div>
  );
};

export default ProductsPage;
