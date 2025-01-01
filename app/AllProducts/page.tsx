// pages/AllProducts/index.tsx
"use client";

import React, { useEffect } from "react";
import Banner from "../components/Banner/Banner";
import bannerImage from "@/app/images/allProducts.png";
import useProductStore from "./ZustandStore/AllProductStore";
import AllProductsMobile from "@/app/images/AllProductsMobile.png";
import ProductGrid from "./components/Products/Products";

const Page: React.FC = () => {
  const { fetchProducts, isLoading, error } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="flex flex-col min-h-screen lg:max-w-[70%] max-w-[85%] mx-auto">
<Banner
      desktopImageSrc={bannerImage} // Image for desktop
      mobileImageSrc={AllProductsMobile}   // Image for mobile
      altText="Welcome Banner"
      additionalClasses="custom-banner"
    />      <ProductGrid />
      {/* Optionally, handle loading and error states here if not handled within ProductGrid */}
      {isLoading && <p>Loading more products...</p>}
      {error && <p>Error loading products: {error}</p>}
    </div>
  );
};

export default Page;

