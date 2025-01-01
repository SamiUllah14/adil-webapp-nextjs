"use client";
import React from 'react';
import CustomButton from '../CustomButton/CustomButton';
import CustomBoldText from '../CustomTexts/CustomBoldText/CustomBoldText';
import { useRouter } from 'next/navigation';
import GoogleMapsComponent from '@/app/adil-pharmacy-pasrur/components/GoogleMapsComponent';

const HomeBlogComp: React.FC = () => {
  const router = useRouter();

  return (

    <div className="flex flex-col h-auto bg-[#EBFAF8] max-w-full justify-center items-center overflow-visible pt-8 pb-8">
      
 
      <div className="flex justify-center items-center h-fit w-[60%] flex-col">
        <div className="flex mb-10">
          <CustomBoldText text="Our Location" />
        </div>
      </div>

    
      <div className="
        grid gap-4 h-auto justify-items-center items-center 
        w-[70%] rounded-[20px] shadow-inner px-4 pb-8
        max-lg:w-[85%] 
        max-md:w-[90%] max-md:grid-cols-1
        max-sm:w-[95%]
      ">
        <GoogleMapsComponent />
      </div>

      <CustomButton
        onClick={() => router.push('/adil-pharmacy-pasrur')}
        text="More Detail"
      />
    </div>
  );
};

export default HomeBlogComp;
