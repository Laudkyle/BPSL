import React from "react";
import Hero from "./Hero";

import AwardsGallery from "./AwardsGallery";
import { useParams } from "react-router-dom";
const heroBg="https://res.cloudinary.com/dvadtratp/image/upload/v1747327037/bestpointgh/eunqurz5ywlilv9qris7.png"


export const awards = [
  {
    id: 1,
    title: "MOST CUSTOMER CENTRIC INSTITUTION (2022)",
    excerpt:
      "Awarded by GHAMFIN for distinguished performance, quality of products and service, innovation, and transformation of lives.",
    image:  "https://res.cloudinary.com/dvadtratp/image/upload/v1747326348/bpsl/ysbvburmxgujmu4aq7qb.png" ,
  },
  {
    id: 2,
    title:
      "2021 PRODUCT OF THE YEAR - BEST MOBILE BANKING, SAVINGS AND LOAN CATEGORY",
    excerpt:
      "Recognized by Corporate Ghana Awards for great contribution to Ghana's development in the financial sector.",
    image:  "https://res.cloudinary.com/dvadtratp/image/upload/v1747326348/bpsl/wyzbwcrkovdc1legy5tz.png" ,
  },
  {
    id: 3,
    title: "2021 SAVINGS AND LOAN COMPANY OF THE YEAR",
    excerpt:
      "Awarded by Corporate Ghana Awards for making giant strides in contributing to Ghana's financial sector.",
    image:  "https://res.cloudinary.com/dvadtratp/image/upload/v1747326347/bpsl/inuemvf1rgpo6gzvcvdc.png" ,
  },
  {
    id: 4,
    title: "BRAND OF THE YEAR (SAVINGS & LOANS) - 2022",
    excerpt:
      "Won at Ghana Corporate Brand Awards for excellence in the savings and loans category.",
    image:  "https://res.cloudinary.com/dvadtratp/image/upload/v1747326346/bpsl/k3g1ctqzv2usp4hlf6yv.png"
  },
  {
    id: 5,
    title: "MOST CUSTOMER CENTRIC INSTITUTION (2022 - GHAMFIN)",
    excerpt:
      "Second recognition from GHAMFIN for customer-centric approach in financial services.",
    image:  "https://res.cloudinary.com/dvadtratp/image/upload/v1747326347/bpsl/jvlmygxktluj0lmvlw6o.png" ,
  },
  {
    id: 6,
    title: "MOST INNOVATIVE PRODUCT OF THE YEAR (2023)",
    excerpt:
      "Awarded by GHAMFIN for innovative financial products in the non-bank financial sector.",
    image: "https://res.cloudinary.com/dvadtratp/image/upload/v1747326346/bpsl/trsm4suu1iwwelvmtlx8.png" ,
  },
  {
    id: 7,
    title: "SAVINGS & LOANS COMPANY OF THE YEAR (2023)",
    excerpt:
      "Recognized by CIMG for outstanding performance in the savings and loans industry.",
    image: "https://res.cloudinary.com/dvadtratp/image/upload/v1747326346/bpsl/ynoxoqewnjvv5mmdup8a.png"
  },
  {
    id: 8,
    title: "BEST START-UP SUPPORT COMPANY (2024)",
    excerpt:
      "Awarded for excellence in supporting startups in the financial services sector.",
    image:  "https://res.cloudinary.com/dvadtratp/image/upload/v1747326346/bpsl/t2soopwzfvcwemsdvufd.png",
  },
];


function Awards() {
  const {id} = useParams();
  return (
    <div>
      <Hero image={heroBg} text1={"Awards"} />
      <AwardsGallery />
    </div>
  );
}

export default Awards;
