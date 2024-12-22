"use client";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import CustomButton from "@/app/components/CustomButton/CustomButton"; // Adjust path if needed
import { useCartStore } from "../ZustandStore/store";
import { useRouter } from "next/navigation";

export const OrderSummaryComponent: React.FC = () => {
  const router = useRouter();
  const { calculateTotal } = useCartStore();
  const [errorMessage, setErrorMessage] = useState("");

  const total = calculateTotal();
  const tax = 10;
  const finalTotal = total + tax;

  const handleConfirmClick = () => {
    if (finalTotal < 100) {
      setErrorMessage("Your total must be at least Rs.100. Please add more items.");
    } else {
      setErrorMessage(""); // Clear error message
      router.push("/ConfirmOrder");
    }
  };

  return (
    <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
      {/* Header */}
      <h2 className="text-3xl font-semibold text-gray-800">Order Summary</h2>

      {/* Summary Details */}
      <div className="space-y-4">
        {/* Original Price */}
        <div className="flex justify-between items-center">
          <dt className="text-base font-medium text-gray-600">Discounted Price</dt>
          <dd className="text-base font-semibold text-gray-900">
            Rs.{total.toLocaleString()}
          </dd>
        </div>

        {/* Tax */}
        <div className="flex justify-between items-center">
          <dt className="text-base font-medium text-gray-600">Delivery Charges</dt>
          <dd className="text-base font-semibold text-gray-900">
            Rs.{tax.toLocaleString()}
          </dd>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
          <dt className="text-lg font-semibold text-gray-900">Total</dt>
          <dd className="text-lg font-semibold text-gray-900">
            Rs.{finalTotal.toLocaleString()}
          </dd>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-600 text-sm font-medium mt-2">{errorMessage}</div>
      )}

      {/* Buttons / Links */}
      <div className="flex items-center justify-center gap-2">
        <CustomButton onClick={handleConfirmClick} text={"Confirm"} />
        <span className="text-sm font-normal text-gray-500">or</span>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline transition-colors duration-200"
        >
          Continue Shopping <FaArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>

      {/* Additional Information */}
      <div className="flex justify-between items-center">
        <dt className="text-base font-medium text-gray-600">
          Non-Pasrur cities have different delivery charges.
        </dt>
      </div>
    </div>
  );
};
