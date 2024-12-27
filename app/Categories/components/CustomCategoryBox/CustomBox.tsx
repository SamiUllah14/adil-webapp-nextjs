'use client';

import React, { useEffect } from 'react';
import './CustomFeatureBox.css';
import CardFeature from '../../../components/Cards/CardCategory/CardFeature';
import { HiArrowRight } from 'react-icons/hi';
import LineComponent from '../../../components/LineComponent/LineComponent';
import { useRouter } from 'next/navigation';
import useCategoryStore from '@/app/Admin/AddCategories/store/Category';

const CustomFeatureBox = () => {
  const { categories, fetchCategories, isLoading, error } = useCategoryStore();
  const router = useRouter();

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, [fetchCategories]);

  // Limit the number of categories to display
  const displayedCategories = categories.slice(0, 8);

  // Handle card click to navigate to products page
  const handleCardClick = (categoryName: string) => {
    if (!categoryName) {
      console.error('Category name is required to navigate.');
      return;
    }
    router.push(`/Categories?categoryName=${encodeURIComponent(categoryName)}`);
  };

  return (
    <>
      <div className="mb-5">
        <LineComponent text="Explore Categories" />
      </div>

      <div className="feature-box">
        {isLoading && <p>Loading categories...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <div className="cardboxes bg-white">
          {displayedCategories.map((category) => (
            <CardFeature
              key={category.id}
              title={category.name}
              imageUrl={category.imageUrl}
              onClick={() => handleCardClick(category.name)} // Pass category name
            />
          ))}
        </div>
        {categories.length > 8 && (
          <div className="viewMoreCategoriesLink">
            <a href="/categories">Explore More Categories</a>
            <HiArrowRight style={{ marginLeft: '8px', fontSize: '1.2rem' }} />
          </div>
        )}
      </div>
    </>
  );
};

export default CustomFeatureBox;
