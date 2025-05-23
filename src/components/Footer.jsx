import React from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import logo from "../images/logo/logo-p.png";
import bgMap from "../images/footer vectors/map-bg.png";
import wire from "../images/footer vectors/wire.png";
import { Link, NavLink } from "react-router-dom";

const phone = "https://res.cloudinary.com/dinb6qtto/image/upload/v1747327026/fuelme/p47umizhkt9u3xh60rwi.png"

const Footer = () => {
  return (
    <footer className="relative bg-purple-900 text-white text-sm px-6 py-12">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-no-repeat bg-right"
        style={{ backgroundImage: `url(${bgMap})` }}
      />
      <div
        className="absolute inset-0 -left-1/3 w-[60vw] h-full bg-cover opacity-20 bg-no-repeat bg-left"
        style={{ backgroundImage: `url(${wire})` }}
      />
      <div className="max-w-7xl z-10 mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Logo & Pledge */}
          <div className="col-span-1 md:col-span-1">
            <img src={logo} alt="BestPoint Logo" className="mb-4" />
            <p className="text-sm leading-relaxed">
              Our pledge is that whatever you dream of, we will endeavor to work
              with you to realize it within our available products and services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="z-10">
            <h4 className="font-bold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="font-thin text-xs">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="font-thin text-xs">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="font-thin text-xs">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/careers" className="font-thin text-xs">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/stories" className="font-thin text-xs">
                  Stories
                </Link>
              </li>
              <li>
                <NavLink to="/locator" className="font-thin text-xs">
                  Branch Locator
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Remittance */}
          <div className="z-10">
            <h4 className="font-bold mb-3">Remittance</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products/transfers/western union"
                  className="font-thin text-xs"
                >
                  Western Union
                </Link>
              </li>
              <li>
                <Link to="/products/transfers/moneygram" className="font-thin text-xs">
                  MoneyGram
                </Link>
              </li>
              <li>
                <Link to="/products/transfers/ria" className="font-thin text-xs">
                  Ria
                </Link>
              </li>
              <li>
                <Link to="/products/transfers/unitylink" className="font-thin text-xs">
                  UnityLink
                </Link>
              </li>
              <li>
                <Link
                  to="/products/transfers/mobile money services"
                  className="font-thin text-xs"
                >
                  Mobile Money
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="z-10">
            <h4 className="font-bold mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="font-thin text-xs">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link to="/reports" className="font-thin text-xs">
                  Annual Report
                </Link>
              </li>
              <li>
                <Link to="/notices" className="font-thin text-xs">
                  BoG Notices
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="z-10">
            <h4 className="font-bold mb-3">Socials</h4>
            <Link to={`/stories`}><p className="mb-2 font-thin text-xs">News Blog</p></Link>
            <Link to={`/award/1`}><p className="mb-2 font-thin text-xs">Awards</p>
</Link>            <div className="grid grid-cols-3 grid-rows-2 gap-y-2 text-lg w-3/5">
              <FaFacebookF className="bg-gradient-to-b from-purple to-purple-200 p-2 rounded-full w-6 h-6 md:w-8 md:h-8" />
              <FaInstagram className="bg-gradient-to-b from-purple to-purple-200 p-2 rounded-full w-6 h-6 md:w-8 md:h-8" />
              <FaTiktok className="bg-gradient-to-b from-purple to-purple-200 p-2 rounded-full w-6 h-6 md:w-8 md:h-8" />
              <FaYoutube className="bg-gradient-to-b from-purple to-purple-200 p-2 rounded-full w-6 h-6 md:w-8 md:h-8" />
              <FaTwitter className="bg-gradient-to-b from-purple to-purple-200 p-2 rounded-full w-6 h-6 md:w-8 md:h-8" />
              <FaLinkedin className="bg-gradient-to-b from-purple to-purple-200 p-2 rounded-full w-6 h-6 md:w-8 md:h-8" />
            </div>
          </div>

          {/* E-Banking */}
          <div className="z-10">
            <h4 className="font-bold mb-3">E-Banking</h4>
            <p className="mb-2">
              USSD App (<strong>*277#</strong>)
            </p>
            <img src={phone} alt="USSD App" className="w-24 opacity-90 mt-3" />
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6 text-white">
          {/* Contact Title */}
          <div>
            <h3 className="text-3xl font-bold mb-4 text-wrap">
              Get in touch with us
            </h3>
          </div>

          {/* Phone */}
          <div className="flex space-x-4 items-start">
            <div className="bg-gradient-to-b from-purple to-purple-200 p-2 rounded-full">
              <FaPhoneAlt className="text-white" />
            </div>
            <div>
              <p className="font-semibold">Give us a call</p>
              <p>0303932990-4</p>
              <p className="font-semibold">TOLL FREE: 0800505050</p>
            </div>
          </div>

          {/* Visit */}
          <div className="flex space-x-4 items-start">
            <div className="bg-gradient-to-b from-purple to-purple-200 p-2 rounded-full">
              <FaMapMarkerAlt className="text-white" />
            </div>
            <div>
              <p className="font-semibold">Visit</p>
              <p className="font-bold">Mile 7 – Achimota</p>
              <p className="font-bold">Old Peace FM Building</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex space-x-4 items-start md:col-span-1">
            <div className="bg-gradient-to-b from-purple to-purple-200 p-2 rounded-full">
              <FaEnvelope className="text-white" />
            </div>
            <div>
              <p className="font-semibold">Send us a mail</p>
              <p className="font-bold">P. O. Box CT 10191, Cantonments</p>
              <p className="font-bold">info@bestpointgh.com</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-white/10 my-4" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/70 gap-3">
          <p>Powered by IT</p>
          <p>
            Copyright © 2025 – All Rights Reserved Best Point Savings and Loans
            Limited
          </p>
          <div className="flex gap-4 z-10">
            <Link className="cursor-pointer" to="/faqs">
              FAQs
            </Link>
            <Link to="/terms-conditions">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
