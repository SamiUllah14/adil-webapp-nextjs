"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import useCategoryStore from "./store/Category";

const CategoryManager: React.FC = () => {
  const { categories, fetchCategories, createCategory, deleteCategory, isLoading, error } = useCategoryStore();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImageUrl, setNewCategoryImageUrl] = useState("");

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim() || !newCategoryImageUrl.trim()) {
      alert("Category name and image URL cannot be empty.");
      return;
    }
    await createCategory({ name: newCategoryName, imageUrl: newCategoryImageUrl });
    setNewCategoryName("");
    setNewCategoryImageUrl("");
  };

  const handleDeleteCategory = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
      await deleteCategory(id);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Category Manager</h2>

      {isLoading && (
        <div className="flex items-center text-blue-500 mb-4">
          <AiOutlineLoading3Quarters className="animate-spin mr-2" size={20} />
          <span>Loading...</span>
        </div>
      )}

      {error && (
        <div className="flex items-center text-red-500 mb-4">
          <MdErrorOutline className="mr-2" size={20} />
          <span>{error}</span>
        </div>
      )}

      <ul className="space-y-2 mb-4">
        {categories.map((category) => (
          <li
            key={category.id}
            className="p-2 bg-white rounded shadow-sm border border-gray-200 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span>{category.name}</span>
            </div>
            <button
              onClick={() => handleDeleteCategory(category.id)}
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="space-y-4">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Enter new category name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={newCategoryImageUrl}
          onChange={(e) => setNewCategoryImageUrl(e.target.value)}
          placeholder="Enter new category image URL"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddCategory}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
        >
          Add Category
        </button>
      </div>
    </div>
  );
};

export default CategoryManager;