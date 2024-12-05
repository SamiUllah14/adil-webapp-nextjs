import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface CustomSearchBarProps {
  placeholder: string; // Custom placeholder text
  onSearch: (query: string) => void; // Function to handle search logic
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({ placeholder = "Search the store", onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className=" items-center">
      <div className="relative lg:w-96">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded-full px-4 py-2 w-full shadow-md pr-12"
        />
        <button
          onClick={handleSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <FaSearch className="text-gray-500 text-lg" />
        </button>
      </div>
    </div>
  );
};

export default CustomSearchBar;
