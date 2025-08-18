import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPercent, FaGift, FaClock, FaCheck, FaShoppingBag, FaLeaf, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Offers = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update the timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Calculate time remaining until midnight
  const getTimeRemaining = () => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight - currentTime;
    
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    return {
      hours: hours < 10 ? `0${hours}` : hours,
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds
    };
  };
  
  const timeRemaining = getTimeRemaining();
  
  // Sample offers data - in production, this would come from API
  const offers = [
    {
      id: 1,
      title: "50% OFF First Order",
      code: "WELCOME50",
      description: "Get 50% off on your first order up to $20",
      validUntil: "May 10, 2025",
      minOrder: "$30",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60",
      icon: <FaGift className="text-4xl text-pink-500" />
    },
    {
      id: 2,
      title: "FREE Delivery Weekend",
      code: "FREEWEEKEND",
      description: "Free delivery on all orders this weekend",
      validUntil: "May 3, 2025",
      minOrder: "$15",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=60",
      icon: <FaShoppingBag className="text-4xl text-green-500" />
    },
    {
      id: 3,
      title: "Buy 1 Get 1 Free",
      code: "BOGO2025",
      description: "Order any main dish and get one free",
      validUntil: "May 15, 2025",
      minOrder: "$25",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60",
      icon: <FaLeaf className="text-4xl text-emerald-500" />
    }
  ];
  
  const specialOffers = [
    {
      id: 1,
      title: "Healthy Protein Pack",
      discount: "30% OFF",
      description: "Get our exclusive protein meal pack with premium ingredients",
      image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=800&auto=format&fit=crop&q=60",
      features: ["High Protein", "Low Carb", "Gluten Free"]
    },
    {
      id: 2,
      title: "Breakfast Bundle",
      discount: "25% OFF",
      description: "Start your day with our energetic breakfast combo",
      image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop&q=60",
      features: ["Energy Boost", "Fiber Rich", "Vitamins"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white p-4 sm:p-6">
      {/* Hero section with main offer */}
      <motion.div 
        className="w-full bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 rounded-2xl p-8 sm:p-10 mb-8 relative overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -ml-20 -mb-20"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-400">
            Today's Special Deal
          </h1>
          <p className="text-2xl sm:text-3xl font-semibold mb-6 text-white">Order Healthy, Save Big!</p>
          <p className="text-xl mb-8 max-w-2xl text-gray-200">
            Use code <span className="bg-gradient-to-r from-amber-500 to-pink-500 px-4 py-2 rounded-lg font-mono font-bold text-white">HEALTHY25</span> at checkout to get 25% off on all orders above $35
          </p>
          
          {/* Countdown timer */}
          <div className="mb-8">
            <p className="flex items-center text-amber-300 mb-4 text-xl">
              <FaClock className="mr-2" /> Offer ends in:
            </p>
            <div className="flex space-x-4">
              {Object.entries(timeRemaining).map(([unit, value]) => (
                <motion.div
                  key={unit}
                  className="bg-gray-900 bg-opacity-70 p-4 rounded-xl text-center min-w-20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-3xl sm:text-4xl font-bold text-amber-400">{value}</span>
                  <p className="text-sm uppercase text-gray-300 mt-1">{unit}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <Link to="/">
            <motion.button
              className="bg-gradient-to-r from-amber-500 to-pink-500 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-amber-900/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Order Now
            </motion.button>
          </Link>
        </div>
      </motion.div>
      
      {/* Special offers section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-400">
          Featured Deals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specialOffers.map((offer) => (
            <motion.div
              key={offer.id}
              variants={itemVariants}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-700 hover:border-amber-500 transition-colors"
            >
              <div className="relative">
                <img src={offer.image} alt={offer.title} className="w-full h-64 object-cover" />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold px-4 py-2 rounded-full shadow-lg">
                  {offer.discount}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-amber-400">{offer.title}</h3>
                <p className="text-gray-300 mb-6 text-lg">{offer.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {offer.features.map((feature, index) => (
                    <span key={index} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
                <motion.button
                  className="w-full bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white font-medium py-3 rounded-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Claim Offer
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Promo codes section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-400">
          Available Promo Codes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              variants={itemVariants}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-700 hover:border-amber-500 transition-colors"
            >
              <div className="relative h-48">
                <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  {offer.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-400 mb-3">{offer.title}</h3>
                <p className="text-gray-300 mb-4">{offer.description}</p>
                <div className="bg-gray-900 p-3 rounded-xl font-mono text-center text-white mb-4 text-lg">
                  {offer.code}
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <div className="flex items-center">
                    <FaClock className="mr-2" />
                    <span>Valid until: {offer.validUntil}</span>
                  </div>
                  <div className="flex items-center">
                    <FaHeart className="mr-2" />
                    <span>Min order: {offer.minOrder}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Terms section */}
      <motion.div
        variants={itemVariants}
        className="mt-12 p-8 bg-gray-800 bg-opacity-50 rounded-2xl backdrop-blur-sm"
      >
        <h3 className="text-2xl font-semibold mb-6 text-amber-400">Terms & Conditions</h3>
        <ul className="text-gray-300 space-y-4">
          <li className="flex items-start">
            <FaCheck className="mt-1 mr-3 text-green-500 flex-shrink-0" />
            <span>Offers cannot be combined with any other promotions or discounts</span>
          </li>
          <li className="flex items-start">
            <FaCheck className="mt-1 mr-3 text-green-500 flex-shrink-0" />
            <span>Valid for online orders only through our official app or website</span>
          </li>
          <li className="flex items-start">
            <FaCheck className="mt-1 mr-3 text-green-500 flex-shrink-0" />
            <span>Delivery charges may apply based on your location</span>
          </li>
          <li className="flex items-start">
            <FaCheck className="mt-1 mr-3 text-green-500 flex-shrink-0" />
            <span>We reserve the right to modify or cancel any promotion without prior notice</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Offers;