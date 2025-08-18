import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAppleAlt, FaMugHot, FaUtensils, FaCarrot, FaWineBottle, FaCookieBite, FaDrumstickBite } from "react-icons/fa";
import { GrDeploy } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";

const style = {
  filterButton: `px-3 sm:px-5 py-2 rounded-3xl shadow-lg text-black font-semibold transition-all duration-300 backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/20`,
  buttons: `bg-blue-300 text-black font-semibold py-2 px-4 rounded-3xl shadow-md hover:bg-blue-400 transition-all duration-300`,
  iconButton: `flex items-center justify-center w-10 h-10 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105`,
};

const shimmerEffect = {
  initial: { opacity: 0.3 },
  animate: {
    opacity: [0.3, 0.6, 0.9, 1],
    transition: { duration: 1, repeat: Infinity },
  },
};

const FilterSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("High in Protein");
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700); // Simulates a loading delay
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCategoryData = () => {
    if (selectedCategory === "High in Protein") return Highprotein;
    if (selectedCategory === "Energetic BreakFast") return EnergticBreakfast;
    if (selectedCategory === "High in Carbs") return HighCarbs;
    if (selectedCategory === "Low in Fats") return LowFats;
    if (selectedCategory === "Healthy Drinkables") return HealthyDrinks;
    if (selectedCategory === "Healthy Snacks") return HealthySnacks;
    if (selectedCategory === "Dinner Meal") return DinnerMeal;
    return [];
  };

  // Food category icons mapping
  const categoryIcons = {
    "High in Protein": <FaDrumstickBite className="text-lg" />,
    "Energetic BreakFast": <FaAppleAlt className="text-lg" />,
    "High in Carbs": <FaUtensils className="text-lg" />,
    "Low in Fats": <FaCarrot className="text-lg" />,
    "Healthy Drinkables": <FaWineBottle className="text-lg" />,
    "Healthy Snacks": <FaCookieBite className="text-lg" />,
    "Dinner Meal": <FaMugHot className="text-lg" />,
  };

  // List of all food categories
  const foodCategories = [
    "High in Protein",
    "Energetic BreakFast",
    "High in Carbs", 
    "Low in Fats", 
    "Healthy Drinkables", 
    "Healthy Snacks", 
    "Dinner Meal"
  ];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Filter Buttons - With Text on larger screens, Icons only on mobile */}
      <div className="w-full flex flex-wrap justify-center gap-2 py-4 sm:py-6 px-2 sm:px-0">
        {foodCategories.map((category) => (
          <button
            key={category}
            className={`${style.filterButton} ${
              selectedCategory === category ? "bg-amber-600" : "bg-amber-500"
            } flex items-center justify-center mb-2`}
            onClick={() => setSelectedCategory(category)}
            aria-label={category}
          >
            {/* Show icon on all screens */}
            <span className="mr-0 sm:mr-2">{categoryIcons[category]}</span>

            {/* Hide text on small screens, show on sm and up */}
            <span className="hidden sm:inline">{category}</span>
          </button>
        ))}
      </div>

      {/* Cards Section with Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10 mt-4 px-4 sm:px-6 w-full">
        <AnimatePresence mode="wait">
          {loading
            ? Array(6)
                .fill(0)
                .map((_, id) => (
                  <motion.div
                    key={id}
                    className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg w-full flex flex-col items-center"
                    {...shimmerEffect}
                  >
                    <div className="w-full h-32 sm:h-40 bg-gray-700 rounded-lg animate-pulse"></div>
                    <div className="w-3/4 h-6 bg-gray-600 rounded-md mt-4 animate-pulse"></div>
                    <div className="w-2/3 h-4 bg-gray-600 rounded-md mt-2 animate-pulse"></div>
                    <div className="w-full h-8 bg-gray-700 rounded-md mt-4 animate-pulse"></div>
                  </motion.div>
                ))
            : getCategoryData().map((item, id) => (
                <motion.div
                  key={id}
                  className="bg-black p-4 sm:p-6 rounded-xl shadow-lg w-full flex flex-col items-center transform transition-all duration-300 hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-gray-300 text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-center">
                    {item.title}
                  </h3>
                  <img
                    src={item.image}
                    alt="image_preview"
                    className="w-full h-32 sm:h-40 object-cover rounded-lg"
                  />
                  <p className="text-gray-300 text-sm sm:text-base text-center m-2 sm:m-4">
                    {windowWidth < 640
                      ? item.discription.length > 80
                        ? `${item.discription.substring(0, 80)}...`
                        : item.discription
                      : item.discription}
                  </p>

                  {/* Buttons Row */}
                  <div className="flex justify-evenly items-center w-full mt-3 sm:mt-4 space-x-2 sm:space-x-4 border border-gray-500 rounded-4xl p-2 sm:p-3 shadow-md">
                    {/* GitHub Link */}
                    <a
                      href={item.gitLinl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={style.iconButton}
                    >
                      <FaGithub className="text-xl sm:text-2xl text-white" />
                    </a>

                    {/* Live Link */}
                    <a
                      href={item.deployedlink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={style.iconButton}
                    >
                      <GrDeploy className="text-xl sm:text-2xl text-red-500" />
                    </a>
                  </div>
                </motion.div>
              ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FilterSection;