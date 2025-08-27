import { useEffect, useState, useRef } from "react";
import {
  Mail,
  Phone,
  Home,
  User,
  Calendar,
  MapPin,
  MessageSquareText,
  Banknote,
  ClipboardList,
  LocateFixed,
} from "lucide-react";
import Hero from "../components/About/Hero";
import ChatIcon from "../components/ChatIcon";
import { NavLink } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Api from "../Api";
import { Loader2 } from "lucide-react";
import SocialBar from "../components/SocialBarHorizontal";
import { toast } from "react-toastify";

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState("enquiry");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [branchesData, setBranchesData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    dob: "",
    location: "",
    description: "",
    accountType: "",
    loanPurpose: "",
  });
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const response = await Api.getBranches();

      // flatten all branches from all regions into one array
      const branches = Object.values(response.data.regions).flat();

      setBranchesData(branches); 
      console.log("Accumulated branches:", branches);
    } catch (error) {
      toast.error("Failed to fetch branches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await Api.mail({
        formData,
        formType: activeTab,
      });
      console.log(response.data);
      // Check if response exists and has json() method
      if (!response.data) {
        throw new Error("Invalid API response");
      }

      const result = await response.data;

      // Check the success flag from backend
      if (result?.success) {
        setSubmitStatus({
          type: "success",
          message: result.message || "Message sent successfully!",
        });
        // Reset form
        setFormData({
          name: "",
          phone: "",
          address: "",
          email: "",
          dob: "",
          location: "",
          description: "",
          accountType: "",
          loanPurpose: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: result?.message || "Submission failed",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "Message was received but we encountered a response issue",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    setActiveTab(tabParam || "enquiry");
  }, [searchParams]);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (window.innerWidth <= 768 && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100); // slight delay to allow form rendering
    }
  };

  return (
    <div className="">
      <Helmet>
        <title> Contact Best Point – Branch Locations & Support Numbers</title>
        <meta
          name="description"
          content="Reach Best Point Savings & Loans via phone, email, or visit any of our branches in Accra, Kumasi, and other regions."
        />
      </Helmet>
      <Hero text1={"Contact Us"} />
      <div className="w-full text-center mt-6 mb-2">
        <h2 className="text-3xl md:text-4xl font-bold text-center capitalize text-gray-800 ">
          Contact Best Point Savings and Loans
        </h2>
      </div>
      <SocialBar />
      {/* Tabs */}
      <div
        id="contact-form"
        ref={formRef}
        className="flex flex-wrap justify-center gap-4 mt-6 mb-10"
      >
        <button
          onClick={() => handleTabClick("enquiry")}
          className={`px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-colors flex items-center gap-2 border ${
            activeTab === "enquiry"
              ? "bg-purple text-white"
              : "bg-transparent text-gray-700 border-gray-300"
          }`}
        >
          <MessageSquareText size={18} />
          Make Enquiry
        </button>
        <button
          onClick={() => handleTabClick("loan")}
          className={`px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-colors flex items-center gap-2 border ${
            activeTab === "loan"
              ? "bg-purple text-white"
              : "bg-transparent text-gray-700 border-gray-300"
          }`}
        >
          <Banknote size={18} />
          Request Loan
        </button>
        <button
          onClick={() => handleTabClick("account")}
          className={`px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-colors flex items-center gap-2 border ${
            activeTab === "account"
              ? "bg-purple text-white"
              : "bg-transparent text-gray-700 border-gray-300"
          }`}
        >
          <ClipboardList size={18} />
          Open Account
        </button>
      </div>

      <div className="flex flex-col-reverse w-[90vw] md:w-[70vw] rounded-3xl bg-purple-50 mx-auto items-center md:flex-row justify-center px-4 py-16 gap-10">
        {/* Left Contact Info */}
        <div className="text-gray-800 justify-center text-sm space-y-8 w-full md:w-1/3">
          <div className="flex items-center gap-3">
            <LocateFixed />
            <div>
              <NavLink
                to={"/locator"}
                className="hover:text-purple font-semibold text-lg"
              >
                Locate Our Branches
              </NavLink>
            </div>
          </div>
          <div className="flex items-center gap-3 text-lg">
            <MapPin />
            <div>
              <p>Mile 7 – Achimota</p>
              <p>Old Peace Fm Building</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-lg">
            <Phone />
            <div>
              <p className="font-medium">030 393 2990-4</p>
              <p className="font-semibold">Toll Free: 0800 505 050</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-lg">
            <Mail />
            <div>
              <p>info@bestpointgh.com</p>
            </div>
          </div>
          <ChatIcon />
        </div>

        {/* Right: Form & Tabs */}
        <div className="w-full md:w-2/3">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 text-sm">
            {/* Top Row: Name */}
            <div>
              <label className="text-gray-400">Your name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-b bg-purple-50 border-gray-400 focus:outline-none focus:border-black text-black py-1"
                required
              />
            </div>

            {/* Phone & Email */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full">
                <label className="text-gray-400">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border-b bg-purple-50 border-gray-400 focus:outline-none focus:border-black text-black py-1"
                  required
                />
              </div>
              <div className="w-full">
                <label className="text-gray-400">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-purple-50 border-b border-gray-400 focus:outline-none focus:border-black text-black py-1"
                  required
                />
              </div>
            </div>

            {/* DOB & Address */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full">
                <label className="text-gray-400">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full bg-purple-50 border-b border-gray-400 focus:outline-none focus:border-black text-black py-1"
                  required
                />
              </div>
              <div className="w-full">
                <label className="text-gray-400">Business Location</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-purple-50 border-b border-gray-400 focus:outline-none focus:border-black text-black py-1"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="text-gray-400">Location (Nearest Branch)</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-purple-50 border-b border-gray-400 focus:outline-none focus:border-black text-black py-1"
                required
              >
                <option value="">-- Select Nearest Branch --</option>
                {branchesData.map((branch, idx) => (
                  <option key={idx} value={branch.location || branch.name}>
                    {branch.location || branch.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Conditional Fields */}
            {activeTab === "enquiry" && (
              <div>
                <label className="text-gray-400">
                  Description of Enquiry/Complaint
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border bg-purple-50 border-gray-300 focus:outline-none focus:border-gray-400 text-black p-2 resize-none"
                />
              </div>
            )}

            {activeTab === "account" && (
              <div>
                <label className="text-gray-400">Account Type</label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  className="w-full bg-purple-50 border-b border-gray-400 focus:outline-none focus:border-black text-black py-1"
                >
                  <option value="">Select account type</option>
                  <option value="susu">Susu</option>
                  <option value="nkosuo">Nkosuo</option>
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                </select>
              </div>
            )}

            {activeTab === "loan" && (
              <div>
                <label className="text-gray-400">Loan Purpose</label>
                <select
                  name="loanPurpose"
                  value={formData.loanPurpose}
                  onChange={handleChange}
                  className="w-full bg-purple-50 border-b border-gray-400 focus:outline-none focus:border-black text-black py-1"
                >
                  <option value="">Select loan purpose</option>
                  <option value="increase stock">Increase my stock</option>
                  <option value="working capital">Working capital</option>
                  <option value="purchase equipment">
                    Purchase new equipment
                  </option>
                </select>
              </div>
            )}
            {submitStatus && (
              <div
                className={`mb-4 text-center md:text-left ${
                  submitStatus.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {submitStatus.message}
              </div>
            )}
            {/* Submit */}
            <div className="pt-4 w-full flex justify-center md:justify-start">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-transparent text-gray-700 border border-gray-300 transition-all hover:bg-purple hover:text-white font-medium px-10 py-2 rounded-full flex items-center justify-center gap-2 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Sending...
                  </>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
