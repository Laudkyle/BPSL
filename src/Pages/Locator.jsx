import React, { useEffect, useState } from "react";
import Hero from "../components/About/Hero";
import wire from "../images/footer vectors/wire.png";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import bgMap from "../images/footer vectors/map-bg.png";
import BranchDirectory from "../components/BranchesDirectory";
import { getBranches } from "../Api";
import { toast } from "react-toastify";

const locatorImage = "https://res.cloudinary.com/dvadtratp/image/upload/v1747327047/bestpointgh/iblul8yo03tibszef3mk.png";

function Locator() {
  const [branches, setBranches] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);
        const response = await getBranches();
        
        // Transform the API response into the expected format
        const transformedBranches = {};
        
        // Iterate through each region in the response
        for (const region in response.data.regions) {
          const regionBranches = response.data.regions[region];
          
          // Only add regions that have branches
          if (regionBranches.length > 0) {
            transformedBranches[region] = regionBranches.map(branch => ({
              location: branch.location,
              gps: branch.gps? { 
                lat: branch.gps.lat,
                lng: branch.gps.lng
              } : null,
              area: branch.area,
              id: branch.id,
              name: branch.location // Using location as name if name isn't provided
            }));
          }
        }

        setBranches(transformedBranches);
      } catch (error) {
        toast.error('Failed to fetch branches');
        setBranches({});
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple"></div>
      </div>
    );
  }

  return (
    <div>
      <Hero image={locatorImage} text1={"Branch Locator"} />
      <div className="flex gap-x-4 lg:gap-x-12 items-center justify-start mt-12 ">
        <div className="bg-purple h-8 w-12 mb-2" />
        <div className="text-center w-full capitalize">
          <h1 className="text-3xl md:text-3xl font-bold text-gray-800 leading-tight">
            Locate the closest Branch near you
          </h1>
        </div>
      </div>
      
      <div className="relative z-0 h-screen mt-12">
        {/* Background - prevent pointer events with pointer-events-none */}
        <div
          className="absolute z-0 inset-0 w-full opacity-45 h-full bg-cover bg-no-repeat bg-right pointer-events-none"
          style={{ backgroundImage: `url(${bgMap})` }}
        />

        {/* Content - ensure higher z-index and proper positioning */}
        <div className="relative z-10 h-full">
          <BranchDirectory branches={branches} />
        </div>
      </div>
      <div className="bg-gradient-to-r from-purple-200 to-purple-300 h-[420px] md:h-48 w-80 md:w-3/4 mx-auto mt-32 md:mt-2 rounded-3xl relative p-6">
        <div
          className="absolute top-0 right-2 w-full md:w-1/3 h-screen object-fit md:object-cover md:bg-contain opacity-60 bg-no-repeat"
          style={{ backgroundImage: `url(${wire})` }}
        />
        <div className="z-10 text-white">
          <h3 className="text-3xl text-center font-bold mb-4 text-wrap">
            Get in touch with us
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 px-4 md:px-16 mt-12 gap-6">
            <div className="flex space-x-4 items-start">
              <div className="bg-gradient-to-b from-purple to-purple-200 p-2 rounded-full">
                <FaPhoneAlt className="text-white" />
              </div>
              <div>
                <p className="font-extralight text-xs">Give us a call</p>
                <p className="font-bold text-xs">0303932990-4</p>
                <p className="font-bold text-xs">TOLL FREE: 0800505050</p>
              </div>
            </div>

            <div className="flex space-x-4 items-start">
              <div className="bg-gradient-to-b from-purple to-purple-200 p-2 rounded-full">
                <FaMapMarkerAlt className="text-white" />
              </div>
              <div>
                <p className="font-extralight text-xs">Visit</p>
                <p className="font-bold text-xs">Mile 7 – Achimota</p>
                <p className="font-bold text-xs">Old Peace FM Building</p>
              </div>
            </div>

            <div className="flex space-x-4 items-start md:col-span-1">
              <div className="bg-gradient-to-b from-purple to-purple-200 p-2 rounded-full">
                <FaEnvelope className="text-white" />
              </div>
              <div>
                <p className="font-extralight text-xs">Send us a mail</p>
                <p className="font-bold text-xs">
                  P. O. Box CT 10191, Cantonments
                </p>
                <p className="font-bold text-xs">info@bestpointgh.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Locator;