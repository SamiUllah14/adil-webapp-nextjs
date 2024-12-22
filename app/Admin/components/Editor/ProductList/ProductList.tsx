"use client";

import useProductStore from '@/app/Admin/EditorProductManagement/ZustandStore/api';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  manufacturer: string;
  genericName: string;
  sizeStrip: number;
  detailsStrip: number;
  description: string;
  ingredients: string;
  drugClass: string;
  dosageForm: string;
  uses: string;
  dosage: string;
  overdoseGuidance: string;
  missedDoseGuidance: string;
  howToUse: string;
  whenNotToUse: string;
  sideEffects: string;
  precautionsAndWarnings: string;
  drugInteractions: string;
  storageOrDisposal: string;
}

const ProductList = () => {
  const { products, isLoading, error, fetchProducts, deleteProduct } = useProductStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const params = { category: 'healthcare', limit: 10 }; // example params
    fetchProducts(params);
  }, [fetchProducts]);

  // Sort products in descending order by 'Id' (latest product first)
  const sortedProducts = products.slice().sort((a, b) => b.id - a.id);

  const handleDelete = async (productId: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);  // Call deleteProduct from Zustand
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return <p className="text-center text-blue-500">Loading products...</p>;
  }

  if (error) {
    console.error('Error fetching products:', error);
    return (
      <div className="text-center text-red-500">
        <p>Oops! There was a problem fetching products.</p>
        <button
          onClick={() => fetchProducts({})}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product: Product) => (
            <div
              key={product.id}  // Ensuring that each product has a unique key
              className="relative bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <button
                  onClick={() => handleDelete(product.id)}  // Trigger delete on click
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>

              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />

              <p className="text-gray-700 text-sm mb-2">
                <strong>Price:</strong> ${product.price}
              </p>
            
              

              <p className="text-sm text-green-600 mb-2">
                <strong>Discount:</strong> {product.discount}%
              </p>
              <p className="text-sm text-yellow-500 mb-2">
                <strong>Rating:</strong> {product.rating}
                <span className="text-gray-500"> ({product.reviewsCount} reviews)</span>
              </p>

              <hr className="my-4" />
              <button
                onClick={() => alert(`Viewing details for ${product.name}`)}
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-l hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">{currentPage} / {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-r hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
