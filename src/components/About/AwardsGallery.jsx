import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import UndoButton from "../UndoButton";

export default function AwardsGallery({ awards = [] }) {
  const { id } = useParams();
  const [selectedId, setSelectedId] = useState(id || 0);
  const [selectedAward, setSelectedAward] = useState(awards[0] || null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(0);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  // ✅ Update selected award when awards or selectedId changes
  useEffect(() => {
    if (awards.length > 0) {
      const found =
        awards.find((award) => award.id === parseInt(selectedId)) || awards[0];
      setSelectedAward(found);
    }
  }, [selectedId, awards]);

  const handleSelect = (award) => {
    if (!award || isAnimating) return;

    // ✅ For mobile
    if (window.innerWidth < 768) {
      setMobileExpanded(mobileExpanded === award.id ? null : award.id);
      return;
    }

    // ✅ For desktop
    if (award.id === selectedAward?.id) return;
    setDirection(award.id > (selectedAward?.id || 0) ? 1 : -1);
    setIsAnimating(true);
    setSelectedId(award.id);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // ✅ Show loading state if data not ready
  if (awards.length === 0 || !selectedAward) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading awards...
      </div>
    );
  }

  return (
    <>
      {/* HEADER */}
      <div className="flex gap-x-4 lg:gap-x-12 items-center justify-start mt-12">
        <div className="bg-purple h-8 w-12 mb-2" />
        <UndoButton />
        <div className="hidden md:block">
          <h1 className="text-xl md:text-3xl font-bold text-gray-800 leading-tight">
            {selectedAward.title}
          </h1>
          <div className="mt-2">
            <span className="text-xs md:text-lg">{selectedAward.excerpt}</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-8 p-6">
        {/* MAIN IMAGE - Desktop */}
        <div className="relative w-full md:w-3/4 lg:w-4/5 h-96 md:h-[500px] bg-gray-100 rounded-xl overflow-hidden hidden md:block">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={selectedAward.id}
              custom={direction}
              initial={(direction) => ({
                x: direction * 300,
                opacity: 0,
              })}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={(direction) => ({
                x: direction * -300,
                opacity: 0,
              })}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute w-full h-full flex items-center justify-center"
            >
              <img
                src={selectedAward.image}
                alt={selectedAward.title}
                className="w-full h-full object-contain p-4"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* GRID LIST - Mobile + Sidebar */}
        <div className="w-full md:w-1/4 lg:w-1/5 max-h-full md:max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            {awards.map((award) => (
              <div key={award.id} className="relative">
                <motion.div
                  onClick={() => handleSelect(award)}
                  className={`w-full aspect-square rounded-md overflow-hidden cursor-pointer ${
                    selectedAward.id === award.id ? "md:opacity-70" : "opacity-100"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <img
                    src={award.image}
                    alt={award.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* MOBILE OVERLAY */}
                {mobileExpanded === award.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 md:hidden"
                  >
                    <h3 className="text-xs font-bold">{award.title}</h3>
                    {award.excerpt && (
                      <p className="text-xs mt-1">{award.excerpt}</p>
                    )}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
