// MapPage.tsx
"use client";
import React, { useState } from "react";
import LeafletMap from "./components/MapComponent";



type ImageProps = {
  src: string;
  alt: string;
};

const sampleImages = [
  {
    src: "https://via.placeholder.com/800x600?text=Sample+Image+1",
    alt: "Gallery Image 1",
  },
  {
    src: "https://via.placeholder.com/800x600?text=Sample+Image+2",
    alt: "Gallery Image 2",
  },
  {
    src: "https://via.placeholder.com/800x600?text=Sample+Image+3",
    alt: "Gallery Image 3",
  },
  {
    src: "https://via.placeholder.com/800x600?text=Sample+Image+4",
    alt: "Gallery Image 4",
  },
];

const MapPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);

  const openModal = (image: ImageProps) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <main className="flex flex-col min-h-screen w-full items-center py-8 px-4 md:px-8">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6">Vist Our Local Pharmacy</h1>

      {/* Image Gallery */}
      <section className="w-full lg:max-w-[70%] md:max-w-[85%] mx-auto mb-8">
        <h2 className="text-2xl font-semibold mb-4">Shop Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleImages.map((image, index) => (
            <div
              key={index}
              className="rounded overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => openModal(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="object-cover w-full h-48"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full lg:max-w-[70%] md:max-w-[85%] mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Shop Location</h2>
        <div className="w-full h-[500px] rounded-md overflow-hidden border border-gray-200 shadow-sm">
        <LeafletMap />
        </div>
      </section>

      {/* Image Modal (Lightbox) */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-3xl font-bold"
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