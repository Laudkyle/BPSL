import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Hero from "../components/About/Hero";
import { motion } from "framer-motion";
import UndoButton from "../components/UndoButton";
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom'
import { getProducts } from "../Api";

const heroBg = "https://res.cloudinary.com/dvadtratp/image/upload/v1747327037/bestpointgh/eunqurz5ywlilv9qris7.png";

function Products() {
  const { category, title } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        // Ensure we're working with an array
        const productsData = Array.isArray(response) 
          ? response 
          : response.data || response.products || [];
        setProducts(productsData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-gray-600">
          Error loading products: {error}
        </h2>
      </div>
    );
  }

  // Safely find the product
  const product = Array.isArray(products) 
    ? products.find(
        (prod) => prod.title.toLowerCase() === title?.toLowerCase()
      )
    : null;

  return (
    <div>
      <Helmet>
        <title>
          Our Products – Loans, Mobile Banking, Savings | Best Point Ghana
        </title>
        <meta
          name="description"
          content="Explore Best Point's financial services: flexible loans, mobile banking via *277#, savings and remittances tailored for Ghanaians."
        />
      </Helmet>
      <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-100 min-h-screen">
        <Hero image={heroBg} text1={product?.title || "Product"} />
        <div className="px-6 pt-2">
          <UndoButton />
        </div>
        {product ? (
          <div className="max-w-6xl mx-auto px-4 py-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid lg:grid-cols-2 gap-10 items-start backdrop-blur-md rounded-3xl p-4"
            >
              {/* Image Section */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="rounded-3xl overflow-hidden shadow-xl w-full h-[300px] sm:h-[400px] lg:h-[500px] relative"
              >
                <img
                  src={product.image || "https://res.cloudinary.com/dvadtratp/image/upload/v1747331399/om9zpjrtrgfvw0wtbueo.png"}
                  alt={product.title}
                  className="w-full h-full object-fit md:object-cover absolute inset-0 transition-transform duration-500"
                />
              </motion.div>

              {/* Text Section */}
              <div className="space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                  {product.title}
                </h2>
                <p className="uppercase text-xs sm:text-sm tracking-widest text-gray-800">
                  {product.category || product.cat}
                </p>

                {product.features && Array.isArray(product.features) && (
                  <ul className="space-y-2 text-sm sm:text-base text-gray-700 font-medium list-disc list-inside">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                )}

                <motion.p
                  className="text-sm text-justify sm:text-base text-gray-600 leading-relaxed mt-4 border-t pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {product.description}
                </motion.p>
                <div className="flex items-center justify-center w-full">
                  <Link to={'/contact'} className="bg-gradient-to-br from-purple mt-6 to-purple-200 p-2 rounded-3xl hover:bg-gradient-to-tr text-center text-white w-[80%] md:w-[200px]">
                    Apply
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl text-gray-600">
              {products.length === 0 
                ? "No products available" 
                : "Sorry, we couldn't find that product."}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;