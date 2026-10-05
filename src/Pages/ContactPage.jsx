import { useEffect, useState, useRef } from "react";
import {
  Mail,
  Phone,
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
import { NavLink, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Api from "../Api";
import { Loader2 } from "lucide-react";
import SocialBar from "../components/SocialBarHorizontal";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState("enquiry");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [branchesData, setBranchesData] = useState([]);

  // reCAPTCHA token
  const [recaptchaToken, setRecaptchaToken] = useState(null);

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
  const recaptchaRef = useRef(null);

  const [searchParams] = useSearchParams();

  // =========================
  // HANDLE FORM CHANGES
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // FETCH BRANCHES
  // =========================
  const fetchBranches = async () => {
    try {
      setLoading(true);

      const response = await Api.getBranches();

      // Flatten all branches from all regions into one array
      const branches = Object.values(response.data.regions || {}).flat();

      setBranchesData(branches);

      console.log("Accumulated branches:", branches);
    } catch (error) {
      console.error("Branch fetch error:", error);
      toast.error("Failed to fetch branches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  // =========================
  // HANDLE URL TAB
  // =========================
  useEffect(() => {
    const tabParam = searchParams.get("tab");

    const allowedTabs = ["enquiry", "loan", "account"];

    if (tabParam && allowedTabs.includes(tabParam)) {
      setActiveTab(tabParam);
    } else {
      setActiveTab("enquiry");
    }
  }, [searchParams]);

  // =========================
  // TAB CLICK
  // =========================
  const handleTabClick = (tab) => {
    setActiveTab(tab);

    // Clear old status whenever tab changes
    setSubmitStatus(null);

    if (window.innerWidth <= 768 && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
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

    setRecaptchaToken(null);

    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  // =========================
  // HANDLE RECAPTCHA
  // =========================
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);

    if (token) {
      setSubmitStatus(null);
    }
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);

    toast.info("reCAPTCHA expired. Please verify again.");
  };

  const handleRecaptchaError = () => {
    setRecaptchaToken(null);

    toast.error(
      "reCAPTCHA could not be loaded. Please refresh the page and try again."
    );
  };

  // =========================
  // SUBMIT FORM
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate requests
    if (isSubmitting) {
      return;
    }

    // reCAPTCHA must be completed
    if (!recaptchaToken) {
      toast.error("Please confirm that you are not a robot.");

      setSubmitStatus({
        type: "error",
        message: "Please complete the reCAPTCHA verification.",
      });

      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await Api.mail({
        formData,
        formType: activeTab,
        recaptchaToken,
      });

      if (!response?.data) {
        throw new Error("Invalid API response");
      }

      const result = response.data;

      if (result?.success) {
        setSubmitStatus({
          type: "success",
          message: result.message || "Message sent successfully!",
        });

        toast.success(result.message || "Message sent successfully!");

        resetForm();
      } else {
        setSubmitStatus({
          type: "error",
          message: result?.message || "Submission failed. Please try again.",
        });

        toast.error(
          result?.message || "Submission failed. Please try again."
        );

        // reCAPTCHA tokens should not be reused
        setRecaptchaToken(null);

        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      }
    } catch (error) {
      console.error("Submission error:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to submit the form. Please try again.";

      setSubmitStatus({
        type: "error",
        message: errorMessage,
      });

      toast.error(errorMessage);

      // Reset CAPTCHA after failed submission
      setRecaptchaToken(null);

      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      {/* =========================
          SEO
      ========================== */}
      <Helmet>
        <title>
          Contact Best Point – Branch Locations & Support Numbers
        </title>

        <meta
          name="description"
          content="Reach Best Point Savings & Loans via phone, email, or visit any of our branches in Accra, Kumasi, and other regions."
        />
      </Helmet>

      {/* =========================
          HERO
      ========================== */}
      <Hero text1={"Contact Us"} />

      <div className="w-full text-center mt-6 mb-2">
        <h2 className="text-3xl md:text-4xl font-bold text-center capitalize text-gray-800">
          Contact Best Point Savings and Loans
        </h2>
      </div>

      <SocialBar />

      {/* =========================
          TABS
      ========================== */}
      <div
        id="contact-form"
        ref={formRef}
        className="flex flex-wrap justify-center gap-4 mt-6 mb-10"
      >
        {/* ENQUIRY */}
        <button
          type="button"
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

        {/* LOAN */}
        <button
          type="button"
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

        {/* ACCOUNT */}
        <button
          type="button"
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

      {/* =========================
          MAIN CONTACT AREA
      ========================== */}
      <div className="flex flex-col-reverse w-[90vw] md:w-[70vw] rounded-3xl bg-purple-50 mx-auto items-center md:flex-row justify-center px-4 py-16 gap-10">
        {/* =========================
            LEFT CONTACT INFO
        ========================== */}
        <div className="text-gray-800 justify-center text-sm space-y-8 w-full md:w-1/3">
          {/* BRANCH LOCATOR */}
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

          {/* ADDRESS */}
          <div className="flex items-center gap-3 text-lg">
            <MapPin />

            <div>
              <p>Mile 7 – Achimota</p>
              <p>Old Peace Fm Building</p>
            </div>
          </div>

          {/* PHONE */}
          <div className="flex items-center gap-3 text-lg">
            <Phone />

            <div>
              <p className="font-medium">030 393 2990-4</p>
              <p className="font-semibold">
                Toll Free: 0800 505 050
              </p>
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex items-center gap-3 text-lg">
            <Mail />

            <div>
              <p>info@bestpointgh.com</p>
            </div>
          </div>

          <ChatIcon />
        </div>

        {/* =========================
            RIGHT FORM
        ========================== */}
        <div className="w-full md:w-2/3">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 text-sm"
          >
            {/* =========================
                NAME
            ========================== */}
            <div>
              <label
                htmlFor="name"
                className="text-gray-400"
              >
                Your name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-b bg-purple-50 border-gray-400 focus:outline-none focus:border-black text-black py-1"
                required
              />
            </div>

            {/* =========================
                PHONE & EMAIL
            ========================== */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* PHONE */}
              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="text-gray-400"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border-b bg-purple-50 border-gray-400 focus:outline-none focus:border-black text-black py-1"
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="text-gray-400"
                >
                  E-mail
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-purple-50 border-b border-gray-400 focus:outline-none focus:border-black text-black py-1"
                  required
                />
              </div>
            </div>

            {/* =========================
                DOB & BUSINESS LOCATION
            ========================== */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* DATE OF BIRTH */}
              <div className="w-full">
                <label
                  htmlFor="dob"
                  className="text-gray-400"
                >
                  Date of Birth
                </label>

                <input
                  id="dob"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full bg-purple-50 border-b border-gray-400 focus:outline-none focus:border-black text-black py-1"
                  required
                />
              </div>

              {/* BUSINESS LOCATION */}
              <div className="w-full">
                <label
                  htmlFor="address"
                  className="text-gray-400"
                >
                  Business Location
                </label>

                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-purple-50 border-b border-gray-400 focus:outline-none focus:border-black text-black py-1"
                  required
                />
              </div>
            </div>

            {/* =========================
                NEAREST BRANCH
            ========================== */}
            <div>
              <label
                htmlFor="location"
                className="text-gray-400"
              >
                Location (Nearest Branch)
              </label>

              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={loading}
                className="w-full bg-purple-50 border-b border-gray-400 focus:outline-none focus:border-black text-black py-1 disabled:opacity-60"
                required
              >
                <option value="">
                  {loading
                    ? "Loading branches..."
                    : "-- Select Nearest Branch --"}
                </option>

                {branchesData.map((branch, idx) => {
                  const branchName =
                    branch.location ||
                    branch.name ||
                    `Branch ${idx + 1}`;

                  return (
                    <option
                      key={branch.id || idx}
                      value={branchName}
                    >
                      {branchName}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* =========================
                ENQUIRY DESCRIPTION
            ========================== */}
            {activeTab === "enquiry" && (
              <div>
                <label
                  htmlFor="description"
                  className="text-gray-400"
                >
                  Description of Enquiry/Complaint
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border bg-purple-50 border-gray-300 focus:outline-none focus:border-gray-400 text-black p-2 resize-none"
                  required
                />
              </div>
            )}

            {/* =========================
                ACCOUNT TYPE
            ========================== */}
            {activeTab === "account" && (
              <div>
                <label
                  htmlFor="accountType"
                  className="text-gray-400"
                >
                  Account Type
                </label>

                <select
                  id="accountType"
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  className="w-full bg-purple-50 border-b border-gray-400 focus:outline-none focus:border-black text-black py-1"
                  required
                >
                  <option value="">
                    Select account type
                  </option>

                  <option value="susu">
                    Susu
                  </option>

                  <option value="nkosuo">
                    Nkosuo
                  </option>

                  <option value="savings">
                    Savings
                  </option>

                  <option value="current">
                    Current
                  </option>
                </select>
              </div>
            )}

            {/* =========================
                LOAN PURPOSE
            ========================== */}
            {activeTab === "loan" && (
              <div>
                <label
                  htmlFor="loanPurpose"
                  className="text-gray-400"
                >
                  Loan Purpose
                </label>

                <select
                  id="loanPurpose"
                  name="loanPurpose"
                  value={formData.loanPurpose}
                  onChange={handleChange}
                  className="w-full bg-purple-50 border-b border-gray-400 focus:outline-none focus:border-black text-black py-1"
                  required
                >
                  <option value="">
                    Select loan purpose
                  </option>

                  <option value="increase stock">
                    Increase my stock
                  </option>

                  <option value="working capital">
                    Working capital
                  </option>

                  <option value="purchase equipment">
                    Purchase new equipment
                  </option>
                </select>
              </div>
            )}

            {/* =========================
                SUBMIT STATUS
            ========================== */}
            {submitStatus && (
              <div
                className={`rounded-lg p-3 text-center md:text-left ${
                  submitStatus.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-600 border border-red-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            {/* =========================
                RECAPTCHA
            ========================== */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={handleRecaptchaChange}
                onExpired={handleRecaptchaExpired}
                onErrored={handleRecaptchaError}
              />

              {!recaptchaToken && (
                <p className="text-xs text-gray-500">
                  Please confirm that you are not a robot
                  before submitting.
                </p>
              )}
            </div>

            {/* =========================
                SUBMIT BUTTON
            ========================== */}
            <div className="pt-4 w-full flex justify-center md:justify-start">
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !recaptchaToken ||
                  loading
                }
                className={`bg-transparent text-gray-700 border border-gray-300 transition-all font-medium px-10 py-2 rounded-full flex items-center justify-center gap-2 ${
                  isSubmitting ||
                  !recaptchaToken ||
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-purple hover:text-white"
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