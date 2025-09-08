import React from "react";
import Carousel from "./ProductsCarousel";

const box ="https://res.cloudinary.com/dvadtratp/image/upload/v1747327025/bestpointgh/xu2eijamud3w80onsnry.png"


function ProductsSection() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Full-width background image */}
      <div
        className="absolute inset-0 w-full h-full bg-contain bg-no-repeat bg-right"
        style={{ backgroundImage: `url(${box})` }}
      ></div>

      {/* Content container with max-width */}
      <div className="relative z-10 h-full flex items-center">
        <div className=" absolute top-3 flex gap-x-4 md:gap-x-16 justify-between h-16 mb-24">
          <div className="bg-purple mt-2 h-8 w-12" />
          <h2 className="text-3xl md:text-4xl font-bold mb-24 text-center text-gray-800">Smart Financial Solutions, Just for You</h2>
        </div>

        {/* Your content */}
        <div className="w-full  lg:w-[40vw]">
            <Carousel />
        </div>
      </div>
    </div>
  );
}

export default ProductsSection;
