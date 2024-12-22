"use client";
import { useState } from "react";
import useProductStore from "@/app/Admin/EditorProductManagement/ZustandStore/api";

const ProductForm = () => {
  const { createProduct, isLoading, error } = useProductStore();
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    price: 0,
    discount: 0,
    imageUrl: "",
    rating: 0,
    reviewsCount: 0,
    manufacturer: "",
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "discount" || name === "rating" || name === "reviewsCount"
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct(formData);
      alert("Product added successfully!");
      setFormData({
        id: 0,
        name: "",
        price: 0,
        discount: 0,
        imageUrl: "",
        rating: 0,
        reviewsCount: 0,
        manufacturer: "",
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
      });
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Product</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Product Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Basic Information</h3>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                id="price"
                type="number"
                name="price"
                placeholder="Enter Price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
       
            <div>
              <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
              <input
                id="discount"
                type="number"
                name="discount"
                placeholder="Enter Discount Percentage"
                value={formData.discount}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Additional Product Details */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Additional Details</h3>
            <input
              type="text"
              name="manufacturer"
              placeholder="Manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="genericName"
              placeholder="Generic Name"
              value={formData.genericName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="sizeStrip"
              placeholder="Size/Strip (Optional)"
              value={formData.sizeStrip}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="detailsStrip"
              placeholder="Details Strip (Optional)"
              value={formData.detailsStrip}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Descriptive Fields */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Description</h3>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          ></textarea>
          <textarea
            name="ingredients"
            placeholder="Ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          ></textarea>
        </div>

        {/* Medical Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Medical Information</h3>
            <input
              type="text"
              name="drugClass"
              placeholder="Drug Class"
              value={formData.drugClass}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="dosageForm"
              placeholder="Dosage Form"
              value={formData.dosageForm}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="uses"
              placeholder="Uses"
              value={formData.uses}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            ></textarea>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Dosage Guidance</h3>
            <textarea
              name="dosage"
              placeholder="Dosage"
              value={formData.dosage}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            ></textarea>
            <textarea
              name="overdoseGuidance"
              placeholder="Overdose Guidance"
              value={formData.overdoseGuidance}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            ></textarea>
          </div>
        </div>

        {/* Medical Guidance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Usage Guidance</h3>
            <textarea
              name="missedDoseGuidance"
              placeholder="Missed Dose Guidance"
              value={formData.missedDoseGuidance}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            ></textarea>
            <textarea
              name="howToUse"
              placeholder="How to Use"
              value={formData.howToUse}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            ></textarea>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Precautions</h3>
            <textarea
              name="whenNotToUse"
              placeholder="When Not to Use"
              value={formData.whenNotToUse}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            ></textarea>
          </div>
        </div>

        {/* Medical Warnings and Interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Side Effects</h3>
            <textarea
              name="sideEffects"
              placeholder="Side Effects"
              value={formData.sideEffects}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            ></textarea>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Warnings</h3>
            <textarea
              name="precautionsAndWarnings"
              placeholder="Precautions and Warnings"
              value={formData.precautionsAndWarnings}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            ></textarea>
          </div>
        </div>

        {/* Interactions and Storage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Drug Interactions</h3>
            <textarea
              name="drugInteractions"
              placeholder="Drug Interactions"
              value={formData.drugInteractions}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            ></textarea>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Storage</h3>
            <textarea
              name="storageOrDisposal"
              placeholder="Storage and Disposal"
              value={formData.storageOrDisposal}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            ></textarea>
          </div>
        </div>
        
        {/* Optional Fields */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <input
              id="rating"
              type="number"
              name="rating"
              placeholder="Enter Rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="reviewsCount" className="block text-sm font-medium text-gray-700 mb-1">Reviews Count</label>
            <input
              id="reviewsCount"
              type="number"
              name="reviewsCount"
              placeholder="Enter Reviews Count"
              value={formData.reviewsCount}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="text-center">
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
