// src/components/Banner/Banner.tsx
import React, { FC } from 'react';
import Image, { StaticImageData } from 'next/image'; // Import StaticImageData for typing
import './Banner.css';

interface BannerProps {
  imageSrc: string | StaticImageData; // Accept both string and StaticImageData
  altText: string; // Alt text for accessibility
  additionalClasses?: string; // Optional additional classes for styling
}

const Banner: FC<BannerProps> = ({ imageSrc, altText, additionalClasses = '' }) => {
  return (
    <div className={`banner lg:mt-10 mt-5 ${additionalClasses}`}>
      <Image
        src={imageSrc} // Works with StaticImageData
        alt={altText}
        className="banner-image"
        layout="responsive"
      />
    </div>
  );
};

export default Banner;
