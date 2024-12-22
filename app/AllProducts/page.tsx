// pages/AllProducts/index.tsx
"use client";

import React, { useEffect } from "react";
import Banner from "../components/Banner/Banner";
import bannerImage from "@/app/images/allProducts.png";
import ProductGrid from "./components/Products/Products";
import useProductStore from "./ZustandStore/AllProductStore";

const Page: React.FC = () => {
  const { fetchProducts, isLoading, error } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="flex flex-col min-h-screen lg:max-w-[70%] max-w-[85%] mx-auto">
      <Banner imageSrc={bannerImage} altText="All Products Banner" />
      <ProductGrid />
      {/* Optionally, handle loading and error states here if not handled within ProductGrid */}
      {isLoading && <p>Loading more products...</p>}
      {error && <p>Error loading products: {error}</p>}
    </div>
  );
};

export default Page;
