import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import group from "../../images/logo/group.jpg"
import bus from "../../images/logo/bus.jpg"
const images = [bus, group];

export default function TeamCarousel() {
  const [current, setCurrent] = useState(0);

  // Autoplay logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 4 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative lg:px-20 p-2 lg:py-16 h-[40vh] lg:h-screen w-full overflow-hidden bg-white flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[current]}
          src={images[current]}
          alt={`Slide ${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="object-fill h-full w-[80vw] rounded-[2rem] mx-auto"
        />
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-lg hover:bg-white"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-lg hover:bg-white"
      >
        ▶
      </button>
      <div className="absolute bottom-24 flex justify-center w-full gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`transition-all duration-300 rounded-full bg-gray-200 ${
              i === current ? "w-8 h-2" : "w-4 h-2 opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
