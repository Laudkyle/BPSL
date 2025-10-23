import { Link } from "react-router-dom";
import Hero from "../components/About/Hero";
import React, { useState, useEffect } from "react";
import { getNotices } from "../Api";
import { toast } from "react-toastify";

const categories = ["All", "BOG Notices", "Security", "Finance"];

function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 2;

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const response = await getNotices();
        setNotices(response.data || []);
        console.log(response.data);
      } catch (error) {
        toast.error("Failed to fetch notices");
        setNotices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const filteredNotices = notices
    .filter((n) =>
      selectedCategory === "All" ? true : n.category === selectedCategory
    )
    .filter(
      (n) =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);
  const paginatedNotices = filteredNotices.slice(
    (currentPage - 1) * noticesPerPage,
    currentPage * noticesPerPage
  );

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prev) =>
      direction === "next"
        ? Math.min(prev + 1, totalPages)
        : Math.max(prev - 1, 1)
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple"></div>
      </div>
    );
  }

  return (
    <div>
      <Hero text1={"Notices"} />
      <div className="flex gap-x-4 lg:gap-x-12 items-center justify-start mt-12 ">
        <div className="bg-purple h-8 w-12 mb-2" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight w-1/2">
          All Notices
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 gap-4 mb-6 border rounded-3xl px-1 py-1">
          {/* Filter Dropdown with Display */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-gradient-to-b from-purple to-purple-100 text-white font-light px-4 py-2 rounded-3xl text-sm outline-none appearance-none pr-8"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="text-black">
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search notices..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-3xl text-sm outline-none border border-gray-300"
          />

          {/* Selected Label */}
          <span className="hidden md:block ml-2 mr-4 font-semibold text-sm text-purple-100">
            {selectedCategory === "All" ? "Public Notices" : selectedCategory}
          </span>
        </div>
      </div>

      {/* Notices Grid */}
      <div className="grid w-2/3 mx-auto mt-24 grid-cols-1 sm:grid-cols-2 gap-36 mb-8">
        {paginatedNotices.length ? (
          paginatedNotices.map((notice) => (
            <Link
              to={`/notices/${notice.id}`}
              key={notice.id}
              className="rounded-xl overflow-hidden hover:shadow-md transition"
            >
              {notice.image && (
                <img
                  src={notice.image}
                  alt={notice.title}
                  className="w-full h-80 object-fit border border-purple rounded-xl border-opacity-20"
                />
              )}
              <div className="p-4">
                <h2 className="font-semibold text-purple-100 mb-2">
                  {notice.title || "Untitled Notice"}
                </h2>
                  <p className="text-gray-700 whitespace-pre-wrap mb-6">
                    {notice.description
                      ? notice.description
                          .replace(/\\n/g, "\n") // convert literal "\n" to real newlines
                          .split(" ") // split into words
                          .slice(0, 10) // take the first 10 words
                          .join(" ") + "..." // join back and add ellipsis
                      : "No description available"}
                  </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-gray-500 col-span-full text-center">
            {notices.length
              ? "No notices match your filters"
              : "No notices found"}
          </div>
        )}
      </div>

      {/* Pagination with Previous and Next buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 mb-6">
          <button
            onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
                : "bg-white text-purple-100 border-purple-300 hover:bg-purple-100"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                  currentPage === page
                    ? "bg-purple-100 text-white border-purple-100"
                    : "bg-white text-purple-100 border-purple-300 hover:bg-purple-100"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() =>
              currentPage < totalPages && handlePageClick(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
                : "bg-white text-purple-100 border-purple-300 hover:bg-purple-100"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Notices;
