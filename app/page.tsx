import AllProducts from "./components/ExploreAllMedicines/AllProducts";
import Banner from "./components/Banner/Banner";
import CustomFeatureBox from "./Categories/components/CustomCategoryBox/CustomBox";
import HomeBlogComp from "./components/MainHomeLocation/HomeBlogComp";
import Testimonials from "./components/Testimonials/Testimonials";
import TopSellingProducts from "./components/TopSellingProducts/TopSellingProducts";
import bannerImage from "@/app/images/bannerImage.png";
import AdilPharmacyMobile from "@/app/images/AdilPharmacyMobile.png";


export default function Home() {

  return (


    <><div className="flex flex-col min-h-screen lg:max-w-[70%] max-w-[85%] mx-auto">


<Banner
      desktopImageSrc={bannerImage} 
      mobileImageSrc={AdilPharmacyMobile}  
      altText="Welcome Banner"
      additionalClasses="custom-banner"
    />
      <div className="mt-20 lg:mt-40 md:mt-40">
        <CustomFeatureBox />

      </div>
      <div className="mt-20 lg:mt-20 md:mt-20">    
        <TopSellingProducts />

      </div>
    </div>
   

<div className="mt-20 lg:mt-40 md:mt-40">
<HomeBlogComp/>
</div>

<AllProducts/>

<div className="mt-20 lg:mt-40 md:mt-40">
<Testimonials/>

</div>



      </>

  );
}