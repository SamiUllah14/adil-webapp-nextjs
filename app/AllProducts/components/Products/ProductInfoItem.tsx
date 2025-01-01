import React from "react";

interface ProductInfoItemProps {
  title: string;
  content: string;
  dotColor: string;
}

const ProductInfoItem: React.FC<ProductInfoItemProps> = ({ title, content, dotColor }) => (
  <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:drop-shadow-[0_0_4px_#00bf63] transition-shadow duration-300">
    <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3 flex items-center">
      <span className={`w-2 h-2 ${dotColor} rounded-full mr-2`} />
      {title}
    </h3>
    <p className="text-sm sm:text-base text-gray-600">{content}</p>
  </div>
);

export default ProductInfoItem;
