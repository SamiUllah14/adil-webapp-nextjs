import React from 'react';
import './HomeBlogComp.css';
import BlogCard from '../Cards/BlogCard/BlogCard';
import CustomButton from '../CustomButton/CustomButton';
import CustomBoldText from '../CustomTexts/CustomBoldText/CustomBoldText';
import CustomGrayText from '../CustomTexts/CustomGrayText/CustomGrayText';

const HomeBlogComp: React.FC = () => {
  return (
    <div className="Home-Blog-Comp">
<div className='textHeaderHomeBlog'>
    <div className='inner-textHeaderHomeBlog'>
    <CustomBoldText text={'Read top articles of the day'}/>
        </div>
        <CustomGrayText text="Health articles that keep you informed about good health practices and achieve your goals." />

</div>

      <div className="inner-home-box">
      <BlogCard
        title="Breeky Tablet Uses, Side Effects, And Price In Pakistan In 2023!"
        imageSrc="https://placehold.co/600x400"
        category="Drugs & Medications"
      />   <BlogCard
      title="Breeky Tablet Uses, Side Effects, And Price In Pakistan In 2023!"
      imageSrc="https://placehold.co/600x400"
      category="Drugs & Medications"
    />   <BlogCard
    title="Breeky Tablet Uses, Side Effects, And Price In Pakistan In 2023!"
    imageSrc="https://placehold.co/600x400"
    category="Drugs & Medications"
  />   

       </div>
       <CustomButton text={'VIEW ALL BLOGS'}/>

    </div>
  );
};

export default HomeBlogComp;
