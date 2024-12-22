"use client";
import CustomButton from "@/app/components/CustomButton/CustomButton";
import React, { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const AllProductSideBar: React.FC = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [availabilityOpen, setAvailabilityOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [priceRange, setPriceRange] = useState<number[]>([0, 4500]);

  const toggleCategories = () => setCategoriesOpen(!categoriesOpen);
  const toggleAvailability = () => setAvailabilityOpen(!availabilityOpen);
  const togglePrice = () => setPriceOpen(!priceOpen);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(e.target.value, 10);
    setPriceRange(newRange);
  };

  return (
    <aside className="w-72 p-6 pt-20 bg-white shadow-md rounded-lg border border-gray-300 hidden lg:block">
      {/* Categories Section */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer text-gray-700 hover:text-black"
          onClick={toggleCategories}
        >
          <h2 className="text-lg font-bold">CATEGORIES</h2>
          {categoriesOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {categoriesOpen && (
          <ul className="mt-3 space-y-2 text-gray-600">
            {[
              "Glutathione",
              "Gummies",
              "Hair Care",
              "Heart Health",
              "Herbal Support",
              "Immune Support",
              "Memory & Brain Support",
              "Men's Health",
              "Multivitamins",
            ].map((category, index) => (
              <li
                key={index}
                className="hover:text-black cursor-pointer transition-colors"
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Availability Section */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer text-gray-700 hover:text-black"
          onClick={toggleAvailability}
        >
          <h2 className="text-lg font-bold">AVAILABILITY</h2>
          {availabilityOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {availabilityOpen && (
          <div className="mt-3 text-gray-600 space-y-3">
            {[
              { label: "In Stock (81)", checked: false },
              { label: "Out Of Stock (8)", checked: false },
            ].map((item, index) => (
              <label
                key={index}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="form-checkbox accent-black"
                  defaultChecked={item.checked}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Section */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer text-gray-700 hover:text-black"
          onClick={togglePrice}
        >
          <h2 className="text-lg font-bold">PRICE</h2>
          {priceOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {priceOpen && (
          <div className="mt-4">
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="4500"
                value={priceRange[0]}
                onChange={(e) => handleRangeChange(e, 0)}
                className="w-full accent-black"
              />
              <input
                type="range"
                min="0"
                max="4500"
                value={priceRange[1]}
                onChange={(e) => handleRangeChange(e, 1)}
                className="w-full accent-black"
              />
            </div>
            <div className="flex justify-between text-sm mt-2">
              <input
                type="number"
                min="0"
                max="4500"
                value={priceRange[0]}
                onChange={(e) => handleRangeChange(e, 0)}
                className="w-20 border border-gray-300 rounded px-2 py-1"
              />
              <span>to</span>
              <input
                type="number"
                min="0"
                max="4500"
                value={priceRange[1]}
                onChange={(e) => handleRangeChange(e, 1)}
                className="w-20 border border-gray-300 rounded px-2 py-1"
              />
            </div>
          </div>
        )}
      </div>

      {/* Apply Button */}
      <div className="py-2 flex items-center justify-center">
        <CustomButton text={"Apply"} />
      </div>
    </aside>
  );
};

export default AllProductSideBar;
