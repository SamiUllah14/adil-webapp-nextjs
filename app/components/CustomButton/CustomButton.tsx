"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

interface CustomButtonProps {
  text: string;           // Text to display on the button
  onClick?: () => void;   // Optional onClick handler for custom behavior
  route?: string;         // Optional route to navigate to
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick, route }) => {
  const router = useRouter();

  // Function to handle routing on button click if `route` is provided
  const handleClick = () => {
    if (onClick) {
      onClick(); // Call custom onClick handler if provided
    }
    if (route) {
      router.push(route); // Navigate to the route if provided
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[#00bf63] p-3 hover:bg-[#00bf20] text-white font-bold h-[48px] border-b-4 border-black hover:border-gray-400 rounded"
    >
      {text}
    </button>
  );
};

export default CustomButton;