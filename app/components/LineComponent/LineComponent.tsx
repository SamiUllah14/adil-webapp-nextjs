import React from 'react';

interface LineComponentProps {
  text?: string;
}

const LineComponent: React.FC<LineComponentProps> = ({ text = 'Explore By Categories' }) => {
  return (
    <div className="flex items-center justify-center w-full"> {/* Added w-full for full width */}
      <div className="flex items-center w-full max-w-7xl"> {/* Added max-w for responsiveness */}
        <div className="flex-grow border-t border-gray-300"></div> {/* Softer border color */}
        <span className="mx-4 md:mx-6 text-gray-800 font-medium text-lg md:text-xl"> {/* Improved spacing, text color, font weight and size */}
          {text}
        </span>
        <div className="flex-grow border-t border-gray-300"></div> {/* Softer border color */}
      </div>
    </div>
  );
};

export default LineComponent;