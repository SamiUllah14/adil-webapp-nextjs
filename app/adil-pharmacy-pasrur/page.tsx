"use client";
import React, { useState } from "react";
import GoogleMapsComponent from "./components/GoogleMapsComponent";
import CustomBoldText from "../components/CustomTexts/CustomBoldText/CustomBoldText";

type ImageProps = {
  src: string;
  alt: string;
};

const sampleImages: ImageProps[] = [
  { src: "https://via.placeholder.com/800x600?text=Sample+Image+1", alt: "Gallery Image 1" },
  { src: "https://via.placeholder.com/800x600?text=Sample+Image+2", alt: "Gallery Image 2" },
  { src: "https://via.placeholder.com/800x600?text=Sample+Image+3", alt: "Gallery Image 3" },
  { src: "https://via.placeholder.com/800x600?text=Sample+Image+4", alt: "Gallery Image 4" },
];

const MapPage = () => {
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null); // Explicit type definition

  return (
    <main className="flex flex-col min-h-screen w-full items-center py-8 px-4 md:px-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Visit Our Local Pharmacy
      </h1>

      <section className="w-full lg:max-w-[70%] md:max-w-[85%] mx-auto mb-8">
        <h2 className="text-2xl font-semibold mb-4">Shop Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleImages.map((image, index) => (
            <div
              key={index}
              className="rounded overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img src={image.src} alt={image.alt} className="object-cover w-full h-48" />
            </div>
          ))}
        </div>
      </section>

      <section className="w-full lg:max-w-[70%] md:max-w-[85%] mx-auto">
        <CustomBoldText text="Shop Location" />
        <div className="w-full h-[500px] rounded-md overflow-hidden border border-gray-200 shadow-sm">
          <GoogleMapsComponent />
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white text-3xl font-bold"
            aria-label="Close Modal"
          >
            &times;
          </button>
          <div className="max-w-4xl max-h-[80vh] overflow-auto">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="object-contain w-full h-auto rounded"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default MapPage;
