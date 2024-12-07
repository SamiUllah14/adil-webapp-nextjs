"use client"; // Add this directive at the top of the file

import React, { useState } from "react";
import { useRouter } from "next/navigation";  // Import from next/navigation for App Router

import CustomButton from "@/app/components/CustomButton/CustomButton";
import MobileSidebar from "./MobileSidebar";

interface Product {
  name: string;
  reviews: number;
  price: number;
  originalPrice: number;
  image: string;
  discount: number;
}

const products: Product[] = [
  {
    name: "B-50 B-COMPLEX",
    reviews: 40,
    price: 1150,
    originalPrice: 1500,
    image: "https://via.placeholder.com/300x200?text=B-50+B-COMPLEX",
    discount: 23,
  },
  {
    name: "Bio Grow",
    reviews: 45,
    price: 490,
    originalPrice: 700,
    image: "https://via.placeholder.com/300x200?text=Bio+Grow",
    discount: 30,
  },
  {
    name: "Bio Grow Gummies",
    reviews: 98,
    price: 850,
    originalPrice: 1100,
    image: "https://via.placeholder.com/300x200?text=Bio+Grow+Gummies",
    discount: 23,
  },
  {
    name: "Biotin Plus",
    reviews: 278,
    price: 1150,
    originalPrice: 1300,
    image: "https://via.placeholder.com/300x200?text=Biotin+Plus",
    discount: 12,
  },
  {
    name: "Biotin Plus Gummies",
    reviews: 180,
    price: 950,
    originalPrice: 1200,
    image: "https://via.placeholder.com/300x200?text=Biotin+Plus+Gummies",
    discount: 21,
  },
  {
    name: "Biotin Plus Gummies",
    reviews: 180,
    price: 950,
    originalPrice: 1200,
    image: "https://via.placeholder.com/300x200?text=Biotin+Plus+Gummies",
    discount: 21,
  }, {
    name: "Biotin Plus Gummies",
    reviews: 180,
    price: 950,
    originalPrice: 1200,
    image: "https://via.placeholder.com/300x200?text=Biotin+Plus+Gummies",
    discount: 21,
  },
];

const ProductGrid: React.FC = () => {
  const router = useRouter(); // Initialize useRouter
  const [sortOption, setSortOption] = useState<string>("Alphabetical-A-Z");

  const handleSort = (option: string) => {
    setSortOption(option);
  };

  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "Alphabetical-A-Z") return a.name.localeCompare(b.name);
    if (sortOption === "Alphabetical-Z-A") return b.name.localeCompare(a.name);
    if (sortOption === "Price-low-high") return a.price - b.price;
    if (sortOption === "Price-high-low") return b.price - a.price;
    return 0;
  });

  // Navigate to the product details page
  const handleImageClick = (productName: string) => {
    // Navigate to a dynamic route, e.g., /products/[productName]
    router.push(`/products/${productName}`);
  };

  return (
    <div className="container lg:mt-10 mt-5 mx-auto px-4 py-6">
      {/* Sort Dropdown */}
      <div className="flex justify-between items-center mb-4">
  {/* Filter Button */}
  <MobileSidebar />



  {/* Sort Dropdown */}
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
</div>


    

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedProducts.map((product, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 shadow-md relative"
          >
            {/* Discount Tag */}
            {product.discount > 0 && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {product.discount}% OFF
              </div>
            )}

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4 cursor-pointer"
              onClick={() => handleImageClick(product.name)}  // Add onClick handler here
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-500">{product.reviews} reviews</p>

            {/* Price Section */}
            <p className="text-gray-500 line-through mt-2">
              Rs.{product.originalPrice}
            </p>
            <p className="text-primary font-bold mt-1">Rs.{product.price}</p>

            {/* Add to Cart Button */}
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <CustomButton text={"Load More Products"} />
      </div>
    </div>
  );
};

export default ProductGrid;
