import React from 'react';

interface CustomInputFieldProps {
  type: 'text' | 'password' | 'email' | 'number'; // Input type
  placeholder: string; // Placeholder text
  value: string | number; // Value of the input field
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change event handler
  className?: string; // Optional custom className to override default styles
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({ type, placeholder, value, onChange, className }) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1A202C] ${className || ''}`}
      />
    </div>
  );
};

export default CustomInputField;
