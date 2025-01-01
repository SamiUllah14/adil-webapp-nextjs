'use client';

import React from "react";
import Link from "next/link";
import useProductStore, { Product } from "../../ZustandStore/AllProductStore";

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void; 
  showDiscountBadge?: boolean; 
  showViewDetailsButton?: boolean; 
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  showDiscountBadge = true,
  showViewDetailsButton = true,
}) => {
  const setSelectedProduct = useProductStore((state) => state.setSelectedProduct);

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  const remainingPrice = product.price * (1 - product.discount / 100);

  const handleClick = () => {
    if (onClick) {
      onClick(product); // Trigger custom click handling
    } else {
      setSelectedProduct({ ...product, remainingPrice }); // Default Zustand handling
    }
  };

  const slug = generateSlug(product.name);
  const productUrl = `/AllProducts/${product.id}-${slug}`;

  return (
    <Link href={productUrl} passHref>
      <div
        className="border border-gray-200 rounded-lg p-4 shadow-md relative cursor-pointer transition-transform transform hover:scale-105"
        onClick={handleClick}
      >
        {/* Discount Badge */}
        {showDiscountBadge && product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {product.discount}% OFF
          </div>
        )}

        {/* Product Image */}
        <div className="w-full h-48 overflow-hidden rounded-md mb-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
          {product.name}
        </h3>

        {/* Original Price */}
        {product.price && (
          <p className="text-gray-500 line-through mt-2">Rs.{product.price}</p>
        )}

        {/* Discounted Price */}
        <p className="text-primary font-bold mt-1">Rs.{remainingPrice.toFixed(2)}</p>

        {showViewDetailsButton && (
          <div className="mt-3">
            <button className="w-full bg-[#00bf63] text-white py-2 px-4 rounded hover:bg-[#00bf20] transition-colors duration-300">
              View Details
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
