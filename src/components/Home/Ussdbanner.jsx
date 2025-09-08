import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle } from "lucide-react";
import phone from "../../images/footer vectors/Group 11.png";
import { NavLink } from "react-router-dom";
const bgPhone =
  "https://res.cloudinary.com/dvadtratp/image/upload/v1747327026/bestpointgh/skwirty3fuvgggxncotn.png";
function UssdBannerMobile() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  React.useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const phoneVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="block md:hidden">
      <div className="flex items-center justify-center px-4 py-8">
        <div className="relative w-full max-w-6xl mx-auto text-white p-6 sm:p-8 rounded-3xl flex flex-col items-center justify-between space-y-6">
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-no-repeat rounded-3xl"
            style={{ backgroundImage: `url(${bgPhone})` }}
          ></div>

          {/* Text */}
          <div className="z-10 max-w-2xl text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-b from-purple to-purple-200 p-2 rounded-3xl text-white">
              Seamless Transactions Anytime, Anywhere
            </h2>
            <p className="text-sm sm:text-base mb-6">
              Welcome to the ultimate convenience with our USSD App! Designed to
              simplify your everyday banking, our reliable app is up and running
              24/7 to serve your needs. With just a few clicks you can:
            </p>
            <ul className="space-y-3 text-sm sm:text-base text-left">
              {[
                "Check your account balance",
                "Make transfers from wallet-to-account, account-to-wallet, and other banks",
                "Buy airtime and data bundles",
                "Pay utility bills and request for mini statements",
              ].map((text, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="min-w-[24px] mt-1">
                    <CheckCircle size={20} className="text-green-400" />
                  </div>
                  <div className="flex-1">{text}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div ref={ref} className="z-10">
            <motion.img
              src={phone}
              alt="USSD App on Phone"
              className=" object-fit md:object-cover"
              initial="hidden"
              animate={controls}
              variants={phoneVariants}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function UssdBannerDesktop() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  React.useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const phoneVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="hidden md:flex items-center mx-2 h-[85vh]">
      <div className="relative w-[100vw] min-w-[700px] mx-auto h-[50vh]  text-white p-8 rounded-3xl flex justify-between">
        <div
          className="absolute inset-0 w-[76vw] left-24 h-full bg-cover overflow-hidden bg-no-repeat rounded-3xl"
          style={{ backgroundImage: `url(${bgPhone})` }}
        ></div>

        {/* Text */}
        <div class="max-w-2xl mx-auto z-10 pr-80 flex flex-col items-center justify-center text-center">
          <h1 class="text-4xl text-white font-bold">DIAL</h1>
          <p class="text-[120px] text-white font-bold leading-none ">
            *277#
          </p>
          <p class="text-sm text-white font-light max-w-md mb-4">
            No internet? No problem! Our USSD banking solution provides access
            to essential financial services anywhere, anytime.
          </p>
          <button class="bg-white text-purple hover:bg-purple opacity-85 hover:text-white font-medium py-2 px-6 rounded-3xl transition-colors duration-200 shadow-sm">
            <NavLink to={"/products/digital/best mobile banking"}>

            Learn More
            </NavLink>
          </button>
        </div>

        {/* Image */}
        <div ref={ref} className="z-10 overflow-hidden ">
          <motion.img
            src={phone}
            alt="USSD App on Phone"
            className="w-auto absolute h-[90vh] object-fit md:object-cover right-0 bottom-0"
            initial="hidden"
            animate={controls}
            variants={phoneVariants}
          />
        </div>
      </div>
    </div>
  );
}

export default function UssdBanner() {
  return (
    <>
      <UssdBannerMobile />
      <UssdBannerDesktop />
    </>
  );
}
