import React from 'react';
import Link from 'next/link';

interface CustomButtonProps {
  text: string;           // Text to display on the button
  href?: string;          // Optional route to navigate to
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, href }) => {
  const buttonContent = (
    <button className="bg-[#00bf63] p-3 hover:bg-[#00bf20] text-white font-bold h-[48px] border-b-4 border-black hover:border-gray-400 rounded">
      {text}
    </button>
  );

  // If href is provided, render the button inside a Link component for routing
  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  // If no href, return the button as usual
  return buttonContent;
};

export default CustomButton;
