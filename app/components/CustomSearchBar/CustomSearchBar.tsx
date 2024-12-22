import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import useProductStore from "@/app/AllProducts/ZustandStore/AllProductStore";

interface CustomSearchBarProps {
  placeholder: string;
  onSearchComplete: () => void; // Callback function to handle sidebar close
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  placeholder = "Search the store",
  onSearchComplete,
}) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchProducts = useProductStore((state) => state.searchProducts);

  const handleSearch = async () => {
    if (query.trim()) {
      await searchProducts({ name: query });
      router.push("/SearchProducts");
      onSearchComplete(); // Close the sidebar after search
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full rounded-full border border-gray-300 bg-white py-3 px-4 pr-14 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-green-500"
        >
          <FaSearch className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default CustomSearchBar;
