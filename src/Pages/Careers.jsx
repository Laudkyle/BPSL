import Hero from "../components/About/Hero";
import Describe from "../components/careers/Describe";
import TeamCarousel from "../components/careers/Carousel";
import OpenRoles from "../components/careers/Jobs";
import { Helmet } from "react-helmet-async";

const heroBg =
  "https://res.cloudinary.com/dvadtratp/image/upload/v1747327037/bestpointgh/eunqurz5ywlilv9qris7.png";

function Careers() {
  return (
    <div>
      <Helmet>
        <title>Careers at Best Point – Join Our Financial Team in Ghana</title>
        <meta
          name="description"
          content=" Discover job openings and career opportunities at Best Point Savings & Loans. Grow with us as we serve Ghana’s financial future."
        />
      </Helmet>
      <Hero image={heroBg} text1={"Careers"} />
      <Describe />
      <TeamCarousel />
      <OpenRoles />
    </div>
  );
}

export default Careers;
