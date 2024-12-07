"use client";
import React from 'react'
import Banner from '../components/Banner/Banner'
import bannerImage from "@/app/images/allProducts.png";
import Products from './components/Products';



const page = () => {
  return (

    <><div className="flex flex-col min-h-screen lg:max-w-[90%] max-w-[85%] mx-auto">

<Banner
          imageSrc={bannerImage} // Pass the imported image
          altText="Homepage Banner"
        />

        <Products/>

        </div>

        </>


  )
}

export default page

