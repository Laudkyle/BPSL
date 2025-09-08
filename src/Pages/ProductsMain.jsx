import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Hero from "../components/About/Hero";
import { Helmet } from "react-helmet-async";
import { getProducts } from "../Api";

const herobg =
  "https://res.cloudinary.com/dvadtratp/image/upload/v1747327037/bestpointgh/eunqurz5ywlilv9qris7.png";

const categoryMap = {
  loans: "Loans",
  savings: "Savings",
  digital: "Digital Channels",
  remittance: "Remittance",
};

function ProductsMain() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [cards, setCards] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setCards(res.data || []);
      
      if (res.data && res.data.length > 0) {
        // Use the actual category field from your data ('category' not 'cat')
        const uniqueCategories = [
          ...new Set(res.data.map((card) => 
            categoryMap[card.category?.toLowerCase()] || card.category
          )),
        ].filter(Boolean);
        
        if (uniqueCategories.length > 0) {
          setSelectedCategory(uniqueCategories[0]);
        }
      }
      console.log(res.data)
    } catch (error) {
      console.error("Error fetching products", error);
      setCards([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Get unique categories from cards
  const uniqueCategories = [
    ...new Set(cards.map((card) => 
      categoryMap[card.category?.toLowerCase()] || card.category
    )),
  ].filter(Boolean);

  // Filter cards by main category
  const filteredCards = selectedCategory 
    ? cards.filter((card) => {
        const cardCategory = categoryMap[card.category?.toLowerCase()] || card.category;
        return cardCategory === selectedCategory;
      })
    : [];

  // Extract unique subcategories (used for tabs)
  const uniqueSubcategories = [
    ...new Set(filteredCards.map((card) => card.subcategory).filter(Boolean)),
  ];

useEffect(() => {
  setActiveTab((prevTab) => {
    // If the current tab still exists in the new subcategories, keep it
    if (uniqueSubcategories.includes(prevTab)) {
      return prevTab;
    }
    // Otherwise, fall back to the first subcategory
    return uniqueSubcategories[0] || "";
  });
}, [selectedCategory]);

  // Filter displayed cards based on active tab (subcategory)
  const displayedCards = filteredCards.filter((card) => {
    if (!activeTab) return true;
    return card.subcategory?.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div>
      <Helmet>
        <title>Our Products – Loans, Mobile Banking, Savings | Best Point Ghana</title>
        <meta
          name="description"
          content="Explore Best Point's financial services: flexible loans, mobile banking via *277#, savings and remittances tailored for Ghanaians."
        />
      </Helmet>
      <Hero image={herobg} text1={"Products"} />
      <div className="flex gap-x-16 items-center mt-12 mb-6">
        <div className="bg-purple h-8 w-12" />
        <h2 className="text-3xl md:text-4xl font-bold capitalize text-gray-800">
          Trusted Financial Services Built Around Your Needs in Ghana
        </h2>
      </div>
      <div className="mt-2 pl-2 md:pl-28">
        <span className="text-base sm:text-2xl font-extralight">
          Our products include personal banking, business banking, e-banking,
          loans, Kiddie accounts, etc
        </span>
      </div>

      <div className="p-6 md:p-12">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
          Category:
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <ul className="space-y-3">
              {uniqueCategories.map((cat) => (
                <li
                  key={cat}
                  className={`cursor-pointer capitalize px-4 py-2 rounded-3xl ${
                    selectedCategory === cat
                      ? "bg-purple font-bold bg-opacity-10 text-gray-800"
                      : "hover:bg-purple-50"
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div className="w-full md:w-3/5">
            {/* Tabs */}
            {uniqueSubcategories.length > 0 && (
              <div className="flex bg-purple-200 p-2 text-white rounded-full w-full overflow-x-auto mb-6">
                {uniqueSubcategories.map((sub) => (
                  <button
                    key={sub}
                    className={`px-6 py-2 rounded-full whitespace-nowrap ${
                      activeTab === sub
                        ? "bg-gradient-to-b from-purple to-purple-100 text-gray-800"
                        : ""
                    }`}
                    onClick={() => setActiveTab(sub)}
                  >
                    <span className="text-white text-sm capitalize">{sub}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Card List */}
            <div className="grid md:grid-cols-2 gap-12 max-h-[450px] max-w-4xl mx-auto overflow-y-auto pr-2">
              {displayedCards.length > 0 ? (
                displayedCards.map((card, index) => (
                  <NavLink
                    to={`/products/${card.category}/${card.title}`}
                    key={index}
                    className="rounded-xl overflow-hidden shadow-md"
                  >
                    <div className="h-72 rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center text-gray-500">
                      {card.image ? (
                        <img
                          src={card.image}
                          className="w-full h-full object-fit md:object-cover"
                          alt={card.title}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 text-lg">
                        {card.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {card.features?.[0] || card.description}
                      </p>
                      <Link
                        to={`/products/${card.category}/${card.title}`}
                        className="text-purple text-xs font-light hover:underline"
                      >
                        Read more →
                      </Link>
                    </div>
                  </NavLink>
                ))
              ) : (
                <div className="col-span-2 text-center py-8">
                  {selectedCategory 
                    ? `No products found in ${selectedCategory} category`
                    : "Loading products..."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsMain;