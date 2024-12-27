'use client'; // Ensures this component is treated as a Client Component

import React from 'react';
import './CardFeature.css';

// Define the interface for the component props
interface CardFeatureProps {
  title: string;
  imageUrl: string;
  onClick: () => void; // Add onClick handler prop
}

const CardFeature: React.FC<CardFeatureProps> = ({ title, imageUrl, onClick }) => {
  return (
    <div className='cardbox' onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="imagediv" style={{ backgroundImage: `url(${imageUrl})` }}>
        {/* Image background is set dynamically */}
      </div>
      <div className="titleTextDiv text-sm lg:text-lg ">
        <h3>{title}</h3>
      </div>
    </div>
  );
}

export default CardFeature;
