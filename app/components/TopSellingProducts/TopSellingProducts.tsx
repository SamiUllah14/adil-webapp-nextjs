"use client";
import React, { useEffect, useState } from 'react';
import './TopSellingProducts.css';
import LineComponent from '../LineComponent/LineComponent';
import SellingProductCard from '../Cards/SellingProductCard/SellingProductCard';
import { TopSellingProduct } from '@/app/AllProducts/ZustandStore/type';

const TopSellingProducts: React.FC = () => {
  const [products, setProducts] = useState<TopSellingProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      try {
        const response = await fetch('http://localhost:5151/api/products/top-selling?count=8');
        if (!response.ok) throw new Error('Failed to fetch top-selling products.');
        const data: TopSellingProduct[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellingProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="mt-5 md:mt-20 lg:mt-20">
        <LineComponent text="Top Selling Products" />
      </div>
      <div className="mt-5">
        <SellingProductCard products={products} />
      </div>
    </>
  );
};

export default TopSellingProducts;
