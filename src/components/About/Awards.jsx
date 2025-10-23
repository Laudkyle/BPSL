import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import { getAwards } from "../../Api";
import AwardsGallery from "./AwardsGallery";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const heroBg =
  "https://res.cloudinary.com/dvadtratp/image/upload/v1747327037/bestpointgh/eunqurz5ywlilv9qris7.png";

function Awards() {
  const [awards, setAwards] = useState([]);
  const { id } = useParams();

  const fetchAwards = async () => {
    try {
      const res = await getAwards();
      setAwards(res.data || []); // Store fetched awards
    } catch (err) {
      toast.error("Failed to fetch awards");
      console.error("Failed to fetch awards", err);
    }
  };

  useEffect(() => {
    fetchAwards();
  }, []);

  return (
    <div>
      <Hero image={heroBg} text1="Awards" />
      {/* ✅ Pass fetched awards to the gallery */}
      <AwardsGallery awards={awards} />
    </div>
  );
}

export default Awards;
