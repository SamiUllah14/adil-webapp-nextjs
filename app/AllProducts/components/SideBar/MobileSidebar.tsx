import React, { FC, useState } from 'react';
import { FaChevronUp, FaChevronDown, FaTimes } from 'react-icons/fa';
import CustomButton from '@/app/components/CustomButton/CustomButton';

const CATEGORIES = [
  'Glutathione',
  'Gummies',
  'Hair Care',
  'Heart Health',
  'Herbal Support',
  'Immune Support',
  'Memory & Brain Support',
  'Men\'s Health',
  'Multivitamins',
] as const;

const AVAILABILITY_OPTIONS = [
  { label: 'In Stock (81)', checked: false },
  { label: 'Out Of Stock (8)', checked: false },
] as const;

interface MobileSidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileSidebar: FC<MobileSidebarProps> = ({ isOpen, setIsOpen }) => {
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [availabilityOpen, setAvailabilityOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4500]);

  const toggleSidebar = () => setIsOpen(prev => !prev);
  const toggleCategories = () => setCategoriesOpen(prev => !prev);
  const toggleAvailability = () => setAvailabilityOpen(prev => !prev);
  const togglePrice = () => setPriceOpen(prev => !prev);

  const handleRangeChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setPriceRange(prev => {
      const newRange = [...prev] as [number, number];
      newRange[index] = newValue;
      return newRange;
    });
  };

  return (
    <>
      {/* Filter Button */}
      <button
        className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
        onClick={toggleSidebar}
      >
        Filter
      </button>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        >
          <div 
            className="fixed top-0 right-0 w-72 h-full bg-white shadow-lg p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 left-4 text-gray-700 hover:text-black"
              onClick={toggleSidebar}
            >
              <FaTimes size={18} />
            </button>

            <div className="mt-12">
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
                    {CATEGORIES.map((category, index) => (
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
                    {AVAILABILITY_OPTIONS.map((item, index) => (
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
                        onChange={handleRangeChange(0)}
                        className="w-full accent-black"
                      />
                      <input
                        type="range"
                        min="0"
                        max="4500"
                        value={priceRange[1]}
                        onChange={handleRangeChange(1)}
                        className="w-full accent-black"
                      />
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <input
                        type="number"
                        min="0"
                        max="4500"
                        value={priceRange[0]}
                        onChange={handleRangeChange(0)}
                        className="w-20 border border-gray-300 rounded px-2 py-1"
                      />
                      <span>to</span>
                      <input
                        type="number"
                        min="0"
                        max="4500"
                        value={priceRange[1]}
                        onChange={handleRangeChange(1)}
                        className="w-20 border border-gray-300 rounded px-2 py-1"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Apply Button */}
              <div className="py-2 flex items-center justify-center">
                <CustomButton text="Apply" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSidebar;
