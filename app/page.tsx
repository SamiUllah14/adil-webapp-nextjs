import AllProducts from "./components/AllProducts/AllProducts";
import Banner from "./components/Banner/Banner";
import CustomFeatureBox from "./components/ExploreCategories/CustomBox";
import HomeBlogComp from "./components/HomeBlogComp/HomeBlogComp";
import LineComponent from "./components/LineComponent/LineComponent";
import Testimonials from "./components/Testimonials/Testimonials";
import TopSellingProducts from "./components/TopSellingProducts/TopSellingProducts";

export default function Home() {
  return (


    <><div className="flex flex-col min-h-screen lg:max-w-[70%] max-w-[85%] mx-auto">


      <Banner />

      <div className="mt-20 lg:mt-40 md:mt-40">
        <CustomFeatureBox />

      </div>
      <div className="mt-20 lg:mt-20 md:mt-20">      <TopSellingProducts />

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