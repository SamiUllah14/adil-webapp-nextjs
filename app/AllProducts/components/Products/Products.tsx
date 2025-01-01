import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import useProductStore from "../../ZustandStore/AllProductStore";
import CustomButton from "@/app/components/CustomButton/CustomButton";

const ProductGrid = () => {
  const [sortOption, setSortOption] = useState<string>("Alphabetical-A-Z");
  const [currentPage, setCurrentPage] = useState(1);
  const { products, fetchProducts, isLoading, error } = useProductStore();

  useEffect(() => {
    if (!products.length) fetchProducts({ page: 1, pageSize: 12 });
  }, [fetchProducts, products.length]);

  const handleSort = (option: string) => {
    setSortOption(option);
    setCurrentPage(1);
    fetchProducts({ page: 1, pageSize: 12 });
  };

  const handleLoadMore = () => {
    fetchProducts({ page: currentPage + 1, pageSize: 12 });
    setCurrentPage((prev) => prev + 1);
  };

  const sortedProducts = [...products].sort((a, b) => {
    const sortMap: Record<string, () => number> = {
      "Alphabetical-A-Z": () => a.name.localeCompare(b.name),
      "Alphabetical-Z-A": () => b.name.localeCompare(a.name),
      "Price-low-high": () => a.price - b.price,
      "Price-high-low": () => b.price - a.price,
    };
    return (sortMap[sortOption] || (() => 0))();
  });

  if (isLoading && !products.length) return <p className="text-center mt-10">Loading products...</p>;
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
      </div>

      {sortedProducts.length ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {sortedProducts.length % 12 === 0 && !isLoading && (
            <div className="flex justify-center mt-6">
              <CustomButton text="Load More" onClick={handleLoadMore} />
            </div>
          )}
        </>
      ) : (
        <p className="text-center mt-10">No products available.</p>
      )}
    </div>
  );
};

export default ProductGrid;
