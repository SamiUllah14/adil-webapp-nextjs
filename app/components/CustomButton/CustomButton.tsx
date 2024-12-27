"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface CustomButtonProps {
  text: string; // Text to display on the button
  onClick?: () => void; // Optional onClick handler for custom behavior
  route?: string; // Optional route to navigate to
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick, route }) => {
  const router = useRouter(); // Correctly place useRouter inside the functional component

  // Handle button click
  const handleClick = () => {
    if (onClick) {
      onClick(); // Trigger custom behavior if onClick handler is provided
    }
    if (route) {
      router.push(route); // Navigate to the specified route if provided
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[#00bf63] p-3 text-white font-bold rounded border-b-4 border-black hover:bg-[#00bf20] hover:border-gray-400  "
    >
      {text}
    </button>
  );
};

export default CustomButton;
