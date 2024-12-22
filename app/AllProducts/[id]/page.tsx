'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Correct import for App Router
import CustomButton from "@/app/components/CustomButton/CustomButton";
import { FaIndustry, FaFlask, FaStar } from "react-icons/fa";
import useProductStore from "../ZustandStore/AllProductStore";
import { useCartStore } from "@/app/ShoppingCart/ZustandStore/store";
import ProductInfoItem from "../components/Products/ProductInfoItem";
import { useCounterStore } from "@/app/ShoppingCart/ZustandStore/AddCartCounterStore";
import { useRouter } from 'next/navigation'
import { BsCheckCircleFill } from 'react-icons/bs'; // Import the checkmark icon


const ProductDetail: React.FC = () => {

  const params = useParams(); // Access route parameters
  const idParam = params?.id;
  //counter for cart integrated in button
  const increment = useCounterStore((state) => state.increment);
  const [itemAdded, setItemAdded] = useState(false); // State for message visibility
  const router = useRouter()



  const addToCart = useCartStore((state) => state.addToCart); // Access the addToCart function
  const selectedProduct = useProductStore((state) => state.selectedProduct);
  const fetchProductById = useProductStore((state) => state.fetchProductById);
  const isLoading = useProductStore((state) => state.isLoading);
  const error = useProductStore((state) => state.error);
  

  // State for selected pack size and calculated prices
  const [selectedPackSize, setSelectedPackSize] = useState<'sizeStrip' | 'detailsStrip' | null>(null);
  const [basePrice, setBasePrice] = useState<number | null>(null);
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);

  // Fetch product details on component mount or when id changes
  useEffect(() => {
    if (idParam && typeof idParam === "string") {
      // Extract numeric ID from the param (e.g., "123-product-name" => 123)
      const productId = parseInt(idParam, 10);
      if (!isNaN(productId)) {
        fetchProductById(productId);
      }
    }

    
  }, [idParam, fetchProductById]);

  // Update basePrice based on selected pack size
  useEffect(() => {
    if (selectedProduct) {
      let newBasePrice = selectedProduct.price; // Default price from database

      if (selectedPackSize === 'sizeStrip' && selectedProduct.sizeStrip) {
        // Price remains the same for pack size
        newBasePrice = selectedProduct.price;
      }

      if (selectedPackSize === 'detailsStrip' && selectedProduct.detailsStrip) {
        // Adjust price for single strip
        newBasePrice = selectedProduct.price / selectedProduct.sizeStrip;
      }

      setBasePrice(newBasePrice);
    }
  }, [selectedPackSize, selectedProduct]);

  // Calculate discounted price whenever basePrice or discount changes
  useEffect(() => {
    if (basePrice !== null && selectedProduct?.discount) {
      const discountAmount = basePrice * (selectedProduct.discount / 100);
      const newDiscountedPrice = basePrice - discountAmount;
      setDiscountedPrice(newDiscountedPrice);
    } else if (basePrice !== null) {
      setDiscountedPrice(basePrice);
    }
  }, [basePrice, selectedProduct?.discount]);

  const handlePackSizeChange = (packSize: 'sizeStrip' | 'detailsStrip') => {
    setSelectedPackSize(packSize);
  };


  const handleAddToCart = () => {
    if (discountedPrice !== null && selectedProduct) {
      addToCart({
        id: productId, // Use productId instead of selectedProduct.id
        name: selectedProduct.name,
        price: discountedPrice,
        imageUrl: selectedProduct.imageUrl,
        quantity: 1,
      });
    increment();
    setItemAdded(true); // Set state to true when button is clicked
   
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10 text-lg text-gray-700">Loading product details...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500 text-lg">Error: {error}</p>;
  }

  if (!selectedProduct) {
    return <p className="text-center mt-10 text-gray-700 text-lg">Product not found!</p>;
  }

  const {
    id: productId, // Destructure and use productId
    name,
    reviews,
    imageUrl,
    discount,
    manufacturer,
    genericName,
    sizeStrip,
    detailsStrip,
    description,
    ingredients,
    drugClass,
    dosageForm,
    uses,
    dosage,
    overdoseGuidance,
    missedDoseGuidance,
    howToUse,
    whenNotToUse,
    sideEffects,
    precautionsAndWarnings,
    drugInteractions,
    storageOrDisposal,
  } = selectedProduct;

  // Define the information items for left and right columns
  const leftColumnInfo = [
    { title: 'Description', content: description, dotColor: 'bg-blue-500' },
    { title: 'Ingredients', content: ingredients, dotColor: 'bg-green-500' },
    { title: 'Drug Class', content: drugClass, dotColor: 'bg-purple-500' },
    { title: 'Uses', content: uses, dotColor: 'bg-yellow-500' },
    { title: 'Dosage Form', content: dosageForm, dotColor: 'bg-indigo-500' },
    { title: 'Dosage', content: dosage, dotColor: 'bg-red-500' },
  ];

  const rightColumnInfo = [
    { title: 'How To Use', content: howToUse, dotColor: 'bg-teal-500' },
    { title: 'Missed Dose Guidance', content: missedDoseGuidance, dotColor: 'bg-red-500' },
    { title: 'When Not To Use', content: whenNotToUse, dotColor: 'bg-teal-500' },
    { title: 'Side Effects', content: sideEffects, dotColor: 'bg-orange-500' },
    { title: 'Precautions & Warnings', content: precautionsAndWarnings, dotColor: 'bg-red-500' },
    { title: 'Drug Interactions', content: drugInteractions, dotColor: 'bg-pink-500' },
    { title: 'In Case of Overdose', content: overdoseGuidance, dotColor: 'bg-rose-500' },
    { title: 'Storage/Disposal', content: storageOrDisposal, dotColor: 'bg-cyan-500' },
  ];

  return (
    <>
      {/* Product Detail Section */}
      <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl drop-shadow-[0_0_2px_#00bf63] overflow-hidden flex flex-col lg:flex-row">
      {/* Image Section */}
          <div className="lg:w-1/2 w-full flex justify-center items-center bg-gray-100 p-4">
            <img src={imageUrl} alt={name} className="rounded-lg max-h-96 object-contain" />
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 w-full p-6 flex flex-col justify-between">
            <div>
              <h1 className="lg:text-3xl text-[18px]  font-bold text-gray-800">{name}</h1>

              {/* Badges */}
              <div className="flex items-center mt-3 space-x-3">
                <span className="bg-red-100  text-red-600 lg:text-sm text-[10px]  font-semibold px-3 py-1 rounded-full">
                  Running Out! Only 2 Strips Remaining
                </span>
                <span className="bg-green-100 text-green-600 lg:text-sm text-[10px] font-semibold px-3 py-1 rounded-full">
                  201 Successful Orders in Last 7 Days
                </span>
              </div>

              {/* Manufacturer Info */}
              <div className="mt-5 lg:text-md text-sm  space-y-2">
                <p className="text-gray-600 flex items-center">
                  <FaIndustry className="mr-2 text-lg text-gray-500" />
                  <span className="font-semibold ">Manufacturer:</span>
                  <span className="ml-1">{manufacturer}</span>
                </p>
                <p className="text-gray-600 flex items-center">
                  <FaFlask className="mr-2 text-lg text-gray-500" />
                  <span className="font-semibold">Generic Name:</span>
                  <span className="ml-1">{genericName}</span>
                </p>
              </div>

              {/* Ratings */}
              <div className="mt-5">
                <p className="text-pink-700 lg:text-lg text-[12px] font-semibold mb-2">
                  Adil Pharmacy Ratings & Reviews ({reviews}+)
                </p>
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">4.9/5</span>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="mt-5">
                <p className="lg:text-3xl text-[20px] font-bold text-gray-800 flex items-center">
                  Rs.{discountedPrice?.toFixed(2) || basePrice?.toFixed(2)}
                  {basePrice && basePrice !== discountedPrice && (
                    <span className="line-through text-gray-500 lg:text-xl text-[12px] ml-3">
                      Rs.{basePrice.toFixed(2)}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="ml-3 bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">
                      {discount}% OFF
                    </span>
                  )}
                </p>
                <p className="text-green-600 lg:text-lg text-[12px] mt-2">
                  Delivery by Today, 9:00 AM - 7:00 PM
                </p>
              </div>

              {/* Pack Size Selection */}
              {(sizeStrip > 0 || detailsStrip > 0) && (
                <div className="mt-6">
                  <p className="lg:text-lg text-[12px] font-semibold text-gray-800 mb-4">
                    Select Pack Size
                  </p>

                  <div className="flex space-x-6">
                    {/* Pack Size Option 1 */}
                    {sizeStrip > 0 && (
                      <label className="flex lg:text-lg text-[12px]  items-center cursor-pointer transition-transform transform hover:scale-105">
                        <input
                          type="radio"
                          name="packSize"
                          className="form-radio text-blue-600 rounded-full w-5 h-5"
                          checked={selectedPackSize === 'sizeStrip'}
                          onChange={() => handlePackSizeChange('sizeStrip')}
                        />
                        <span className="ml-3 text-gray-700 font-medium">
                          1 PACK = {sizeStrip} STRIP(S)
                        </span>
                      </label>
                    )}

                    {/* Pack Size Option 2 */}
                    {detailsStrip > 0 && (
                      <label className="flex lg:text-lg text-[12px] items-center cursor-pointer transition-transform transform hover:scale-105">
                        <input
                          type="radio"
                          name="packSize"
                          className="form-radio text-blue-600 rounded-full w-5 h-5"
                          checked={selectedPackSize === 'detailsStrip'}
                          onChange={() => handlePackSizeChange('detailsStrip')}
                        />
                        <span className="ml-3 text-gray-700 font-medium">
                          1 STRIP = {detailsStrip} TABLET(S)
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Information Note */}
                  <div className="mt-4 p-3 border border-gray-200 rounded-md bg-gray-50">
                    <p className="text-sm text-gray-600">
                      Choose the most suitable pack size for your needs. Pricing may vary
                      based on the selected option.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Add to Cart Button */}
            <div className="flex mt-6 justify-between items-center">
      {!itemAdded ? (
        <CustomButton onClick={handleAddToCart} text="Add to Cart" />
      ) : (
        <div className="flex items-center space-x-2 text-green-500 font-medium"> {/* Fancy message container */}
          <BsCheckCircleFill className="text-xl" /> {/* Checkmark Icon */}
          <span>Item has been added to cart!</span>
          <CustomButton onClick={() => router.push('/ShoppingCart')} text={"Checkout"}/>
        </div>
      )}
    </div>
          
          </div>

        </div>
      </div>

      {/* Product Information Section */}
      <div className="max-w-6xl mx-auto p-4 sm:p-8 bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-[#00bf63]">
          Product Information
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {leftColumnInfo.map((item, index) => (
              <ProductInfoItem
                key={index}
                title={item.title}
                content={item.content}
                dotColor={item.dotColor}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {rightColumnInfo.map((item, index) => (
              <ProductInfoItem
                key={index}
                title={item.title}
                content={item.content}
                dotColor={item.dotColor}
              />
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default ProductDetail;
