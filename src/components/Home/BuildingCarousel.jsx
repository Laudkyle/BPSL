import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import image1 from "../../images/footer vectors/ph.png";
import image2 from "../../images/footer vectors/mg.png";

const building = "https://res.cloudinary.com/dinb6qtto/image/upload/v1747330904/ptjmdd2zra9hzwjybbw1.png"
const slides = [
  {
    title: "Open an Account Today",
    description: "Open account with Best Point at an amount as low as",
    amount: "GHS 30.00",
    buttonText: "Click to open",
    image: image1,
  },
  {
    title: "Open an Account Today",
    description: "Open account with Best Point at an amount as low as",
    amount: "GHS 40.00",
    buttonText: "Click to open",
    image: image2,
  },
];

export default function BuildingCarousel() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const { title, description, amount, buttonText, image } = slides[current];

  return (
    <div className="flex items-center py-12 justify-center bg-cover bg-center min-h-[250px] relative overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${building})` }}
      ></div>
      <div className="bg-white z-10 rounded-xl shadow-md flex items-center w-[90%] max-w-5xl p-4 md:p-6 space-x-4">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-4 bg-purple-800 text-white rounded-full p-2 hover:bg-purple-700 z-10"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex md:flex-row md:justify-between w-full flex-col gap-4">
          <div className="w-full md:w-1/3 h-40 min-w-[100px]">
            <img
              src={image}
              alt="carousel"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-right">
            <h2 className="text-2xl font-bold text-purple-800">{title}</h2>
            <p className="text-gray-700">{description}</p>
            <p className="font-bold text-purple-700">{amount}</p>
            <button className="mt-3 bg-purple-800 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
              {buttonText}
            </button>
          </div>
        </div>
        {/* Image */}

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-4 bg-purple-800 text-white rounded-full p-2 hover:bg-purple-700 z-10"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
