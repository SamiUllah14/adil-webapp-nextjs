'use client';

import React, { FC, useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import './Banner.css';

interface BannerProps {
  desktopImageSrc: string | StaticImageData; // Image for desktop
  mobileImageSrc: string | StaticImageData; // Image for mobile
  altText: string; // Alt text for accessibility
  additionalClasses?: string; // Optional additional classes for styling
}

const Banner: FC<BannerProps> = ({
  desktopImageSrc,
  mobileImageSrc,
  altText,
  additionalClasses = '',
}) => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile if width is 768px or less
    };

    updateScreenSize(); // Set initial state
    window.addEventListener('resize', updateScreenSize); // Add resize listener

    return () => {
      window.removeEventListener('resize', updateScreenSize); // Clean up listener
    };
  }, []);

  const imageSrc = isMobile ? mobileImageSrc : desktopImageSrc;

  return (
    <div className={`banner lg:mt-10 mt-5 ${additionalClasses}`}>
      <Image
        src={imageSrc} // Dynamically choose image based on screen size
        alt={altText}
        className="banner-image"
        layout="responsive"
      />
    </div>
  );
};

export default Banner;
