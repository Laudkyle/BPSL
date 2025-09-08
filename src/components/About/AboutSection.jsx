import marks from "../../images/general icons/marks.png";
import TeamSection from "./TeamTabs";

const bg="https://res.cloudinary.com/dvadtratp/image/upload/v1747327023/bestpointgh/u5eb6cxpatpki8txxvwh.png"
const AboutSection = () => {
  return (
    <div className="py-12 text-gray-800">
      <section className="mb-16 w-[90vw]">
        <div className=" flex gap-x-16 items-center mb-6">
          <div className="bg-purple h-8 w-12" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 ">
            Who We Are
          </h2>
        </div>
        <p className="mb-6 md:ml-28 ml-4 font-open-sans font-extralight text-justify ">
          Best Point Savings and Loans Ltd (Best Point) is a wholly owned
          Ghanaian Company incorporated under the Companies Act 1963 (Act 179)
          on September 4th 2012. It was originally incorporated as Lucky Savings
          and Loans Limited but had the name changed on January 29th, 2013. It
          was issued with a Certificate to Commence Business on October 8th
          2013.
        </p>
        <p className="mb-6 md:ml-28 ml-4 font-open-sans font-extralight text-justify ">
          Best Point Savings and Loans is licensed by Bank of Ghana to provide
          savings and loans services in accordance with the Non-Bank Financial
          Institutions Act, 2008 (Act 774). The license was issued on December
          2nd, 2013.
        </p>
      </section>

      <section className="mb-16 w-[90vw]">
        <div className=" flex gap-x-16 items-center mb-6">
          <div className="bg-purple h-8 w-12" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 ">
            Corporate Identity
          </h2>
        </div>
        <div className="grid md:grid-cols-10 gap-6 mx-4 ml-8 md:ml-28">
          <div className="bg-purple-100 text-white p-6 rounded-xl relative min-h-[180px]  col-span-3">
            <div
              className="absolute inset-0 w-full h-full bg-contain bg-no-repeat bg-right"
              style={{ backgroundImage: `url(${bg})` }}
            />
            <p className="text-sm md:text-lg text-justify font-extralight">
              <img
                src={marks}
                alt="quotation marks"
                className="w-4 h-4 overflow-hidden object-contain"
              />{" "}
              To provide financial solutions to enterprises and households while
              maximizing stakeholder value.
            </p> 
            <span className="absolute bottom-2 right-2  md:bottom-4 md:right-4 bg-gradient-to-b  from-purple to-purple-200 text-white px-3 py-1 rounded-full text-sm">
              Our Mission
            </span>
          </div>
          <div className="bg-purple-100 text-white p-6 rounded-xl relative min-h-[220px] col-span-3">
            <div
              className="absolute inset-0 w-full h-full bg-contain bg-no-repeat bg-right"
              style={{ backgroundImage: `url(${bg})` }}
            />
            <p className="text-sm md:text-lg text-justify font-extralight">
            <img
                src={marks}
                alt="quotation marks"
                className="w-4 h-4 overflow-hidden object-contain"
              />{" "}
              To be the most cost-effective, efficient and unique savings and
              loans company, providing cutting edge financial solutions to
              MSME(s) and Households.
            </p>
            <span className="absolute bottom-2 right-2  md:bottom-4 md:right-4 bg-gradient-to-b from-purple to-purple-200 text-white px-3 py-1 rounded-full text-sm">
              Our Vision
            </span>
          </div>
          <div className="bg-purple-100 text-white p-6 rounded-xl relative min-h-[180px] col-span-3">
            <div
              className="absolute inset-0 w-full h-full bg-contain bg-no-repeat bg-right"
              style={{ backgroundImage: `url(${bg})` }}
            />
            <p className="text-sm md:text-lg text-justify font-extralight">
            <img
                src={marks}
                alt="quotation marks"
                className="w-4 h-4 overflow-hidden object-contain"
              />{" "}
              Our pledge is that whatever you dream of, we will endeavor to work
              with you to realize it within our available products and services.
            </p>
            <span className="absolute bottom-2 right-2  md:bottom-4 md:right-4 bg-gradient-to-b from-purple to-purple-200 text-white px-3 py-1 rounded-full text-sm">
              Our Pledge
            </span>
          </div>
        </div>
      </section>
      <section className="mb-16 w-[90vw]">
      <div className="flex flex-col md:flex-row gap-y-6 md:gap-y-0">
        {/* First row with title and first two items */}
        <div className="flex">
          <div className="flex gap-x-16 mb-6">
            <div className="bg-purple h-8 w-12" />
            <div className="w-[300px] mr-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                What we
              </h2>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Stand For
              </h2>
            </div>
          </div>
        </div>
        
        <div className="md:w-3/5 ml-8 md:ml-0 flex flex-wrap gap-6">
          {/* First item */}
          <div className="w-[300px] bg-white border border-b-0 border-gray-200 p-6 rounded-2xl relative shadow-sm hover:border-b-8 hover:border-b-purple-200 transition-all">
            <div
              className="absolute inset-0 w-full h-full bg-contain bg-no-repeat bg-right"
              style={{ backgroundImage: `url(${bg})` }}
            />
            <h3 className="text-purple-100 font-bold mb-2">Integrity</h3>
            <p className="text-sm text-gray-700 font-open-sans font-extralight">
              Our word is our bond; we are guided by the highest ethical
              principles in our dealings with our stakeholders.
            </p>
            <span className="absolute bottom-4 right-4 bg-gradient-to-b from-purple to-purple-200 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold">
              1
            </span>
          </div>
          
          {/* Second item */}
          <div className="w-[300px] bg-white border border-b-0 border-gray-200 p-6 rounded-2xl relative shadow-sm hover:border-b-8 hover:border-b-purple-200 transition-all">
            <div
              className="absolute inset-0 w-full h-full bg-contain bg-no-repeat bg-right"
              style={{ backgroundImage: `url(${bg})` }}
            />
            <h3 className="text-purple-100 font-bold mb-2">Customer Focus</h3>
            <p className="text-sm text-gray-700 font-open-sans font-extralight">
              We show respect to our customers. We prioritize their needs, and
              provide convenient solutions that exceed their expectations.
            </p>
            <span className="absolute bottom-4 right-4 bg-gradient-to-b from-purple to-purple-200 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold">
              2
            </span>
          </div>
        </div>
      </div>
      
      {/* Second row with remaining three items */}
      <div className="mt-6 flex flex-wrap md:flex-nowrap gap-6 md:ml-28 ml-8  ">
        {/* Third item */}
        <div className="w-[300px] bg-white border border-b-0 border-gray-200 p-6 rounded-2xl relative shadow-sm hover:border-b-8 hover:border-b-purple-200 transition-all">
          <div
            className="absolute inset-0 w-full h-full bg-contain bg-no-repeat bg-right"
            style={{ backgroundImage: `url(${bg})` }}
          />
          <h3 className="text-purple-100 font-bold mb-2">Creativity</h3>
          <p className="text-sm text-gray-700 font-open-sans font-extralight">
            We strive to provide tailored solutions to our customers through technology.
          </p>
          <span className="absolute bottom-4 right-4 bg-gradient-to-b from-purple to-purple-200 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold">
            3
          </span>
        </div>
        
        {/* Fourth item */}
        <div className="w-[300px] bg-white border border-b-0 border-gray-200 p-6 rounded-2xl relative shadow-sm hover:border-b-8 hover:border-b-purple-200 transition-all">
          <div
            className="absolute inset-0 w-full h-full bg-contain bg-no-repeat bg-right"
            style={{ backgroundImage: `url(${bg})` }}
          />
          <h3 className="text-purple-100 font-bold mb-2">Teamwork</h3>
          <p className="text-sm text-gray-700 font-open-sans font-extralight">
            We work together and support one another to provide seamless
            solutions to our customers.
          </p>
          <span className="absolute bottom-4 right-4 bg-gradient-to-b from-purple to-purple-200 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold">
            4
          </span>
        </div>
        
        {/* Fifth item */}
        <div className="w-[300px] bg-white border border-b-0 border-gray-200 p-6 rounded-2xl relative shadow-sm hover:border-b-8 hover:border-b-purple-200 transition-all">
          <div
            className="absolute inset-0 w-full h-full bg-contain bg-no-repeat bg-right"
            style={{ backgroundImage: `url(${bg})` }}
          />
          <h3 className="text-purple-100 font-bold mb-2">Excellence</h3>
          <p className="text-sm text-gray-700 font-open-sans font-extralight">
            At the core of all our service is a passion to be the best in the
            provision of retail financial services.
          </p>
          <span className="absolute bottom-4 right-4 bg-gradient-to-b from-purple to-purple-200 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold">
            5
          </span>
        </div>
      </div>
    </section>
   
      <TeamSection />
    </div>
  );
};

export default AboutSection;
