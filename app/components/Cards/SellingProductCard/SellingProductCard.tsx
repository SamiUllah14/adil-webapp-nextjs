"use client";
import React from "react";
import "./SellingProductCard.css";
import { TopSellingProduct } from "@/app/AllProducts/ZustandStore/type";
import ProductCard from "@/app/AllProducts/components/Products/ProductCard";

interface SellingProductCardProps {
  products: TopSellingProduct[];
}

const SellingProductCard: React.FC<SellingProductCardProps> = ({ products }) => {
  return (
    <div className="sellingproductcard-container">
      <div className="sellingproductcard grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => {
          const remainingPrice = product.price * (1 - product.discount / 100);

          return (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                imageUrl: product.imageUrl,
                price: product.price,
                discount: product.discount,
                remainingPrice, // Add the calculated remainingPrice
                manufacturer: "", // Provide default or placeholder values for missing fields
                genericName: "",
                sizeStrip: 0,
                detailsStrip: 0,
                description: "",
                ingredients: "",
                drugClass: "",
                dosageForm: "",
                uses: "",
                dosage: "",
                overdoseGuidance: "",
                missedDoseGuidance: "",
                howToUse: "",
                whenNotToUse: "",
                sideEffects: "",
                precautionsAndWarnings: "",
                drugInteractions: "",
                storageOrDisposal: "",
                categoryName: "",
                rating: 0,
                reviews: 0, // Default value for reviews
                reviewsCount: 0,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SellingProductCard;
