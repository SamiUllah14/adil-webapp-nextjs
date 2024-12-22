"use client";
import React from "react";
import Image from "next/image";
import { CartItem } from "../ZustandStore/store";

interface AlsoBoughtItemProps {
  item: CartItem;
}

export const AlsoBoughtItemComponent: React.FC<AlsoBoughtItemProps> = ({
  item,
}) => {
  return (
    <div className="border p-4 rounded-lg">
      <Image
        src={item.imageUrl}
        alt={item.name}
        width={200}
        height={200}
        className="object-cover"
      />
      <h4 className="mt-2 font-semibold text-gray-700">{item.name}</h4>
      <p className="text-gray-600">Rs.{item.price.toLocaleString()}</p>
      {/* Add any additional UI or click handlers here */}
    </div>
  );
};
