// components/ProductGrid.tsx
"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard"; // Ensure correct path
import useProductStore from "../../ZustandStore/AllProductStore";
import MobileSidebar from "../SideBar/MobileSidebar";
import CustomButton from "@/app/components/CustomButton/CustomButton";

const ProductGrid: React.FC = () => {
  const [sortOption, setSortOption] = useState<string>("Alphabetical-A-Z");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number>(6); // Initial visible products
  const { products, fetchProducts, isLoading, error } = useProductStore();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  const handleSort = (option: string) => {
    setSortOption(option);
    setVisibleCount(6); // Reset visible count when sorting changes
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const sortedProducts = products.slice().sort((a, b) => {
    switch (sortOption) {
      case "Alphabetical-A-Z":
        return a.name.localeCompare(b.name);
      case "Alphabetical-Z-A":
        return b.name.localeCompare(a.name);
      case "Price-low-high":
        return a.price - b.price;
      case "Price-high-low":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const visibleProducts = sortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProducts.length;

  if (isLoading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="container lg:mt-10 mt-5 mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="Alphabetical-A-Z">Alphabetically, A-Z</option>
          <option value="Alphabetical-Z-A">Alphabetically, Z-A</option>
          <option value="Price-low-high">Price, low to high</option>
          <option value="Price-high-low">Price, high to low</option>
        </select>
        <MobileSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>

      {visibleProducts.length === 0 ? (
        <p className="text-center mt-10">No products available.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
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
        </>
      )}
    </div>
  );
};

export default ProductGrid;
