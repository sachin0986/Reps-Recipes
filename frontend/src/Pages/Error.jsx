import React from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaHome, FaUtensils, FaHeadset, FaArrowLeft } from "react-icons/fa";

const Error = ({ errorCode = 404, message = "We can't seem to find the page you're looking for" }) => {
  // Define error types
  const errorTypes = {
    404: {
      title: "Page Not Found",
      image: "/api/placeholder/300/300",
      suggestion: "The page you're looking for doesn't exist or has been moved."
    },
    500: {
      title: "Server Error",
      image: "/api/placeholder/300/300",
      suggestion: "Something went wrong on our end. Please try again later."
    },
    400: {
      title: "Bad Request",
      image: "/api/placeholder/300/300",
      suggestion: "The request could not be understood by the server."
    },
    401: {
      title: "Unauthorized",
      image: "/api/placeholder/300/300",
      suggestion: "You need to be logged in to access this page."
    },
    "network": {
      title: "Connection Error",
      image: "/api/placeholder/300/300",
      suggestion: "Please check your internet connection and try again."
    }
  };

  const errorInfo = errorTypes[errorCode] || errorTypes[404];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Error Icon */}
        <motion.div 
          className="mb-6"
          variants={itemVariants}
        >
          <div className="mx-auto w-24 h-24 rounded-full bg-red-800 bg-opacity-20 flex items-center justify-center">
            <FaExclamationTriangle className="text-amber-500 text-4xl" />
          </div>
        </motion.div>

        {/* Error Code */}
        <motion.div 
          className="text-6xl font-bold text-amber-500 mb-2"
          variants={itemVariants}
        >
          {errorCode}
        </motion.div>

        {/* Error Title */}
        <motion.h1 
          className="text-2xl font-bold mb-4"
          variants={itemVariants}
        >
          {errorInfo.title}
        </motion.h1>

        {/* Error Message */}
        <motion.p 
          className="text-gray-300 mb-6"
          variants={itemVariants}
        >
          {message}
        </motion.p>

        {/* Error Illustration */}
        <motion.div 
          className="mb-6 p-4"
          variants={itemVariants}
        >
          <img 
            src={errorInfo.image} 
            alt="Error Illustration" 
            className="mx-auto max-w-full h-auto rounded-lg"
          />
        </motion.div>

        {/* Suggestion */}
        <motion.p 
          className="text-gray-400 mb-8"
          variants={itemVariants}
        >
          {errorInfo.suggestion}
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          variants={itemVariants}
        >
          <button 
            onClick={handleGoBack}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-full text-white font-medium transition-colors"
          >
            <FaArrowLeft size={16} />
            Go Back
          </button>

          <button 
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 rounded-full text-white font-medium transition-all"
          >
            <FaHome size={16} />
            Return Home
          </button>
        </motion.div>

        {/* Help Options */}
        <motion.div 
          className="mt-12 pt-6 border-t border-gray-700 grid grid-cols-2 gap-4"
          variants={itemVariants}
        >
          <a href="/" className="flex flex-col items-center p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
            <FaUtensils className="text-amber-500 text-xl mb-2" />
            <span className="text-sm">Browse Menu</span>
          </a>

          <a href="/contact" className="flex flex-col items-center p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
            <FaHeadset className="text-amber-500 text-xl mb-2" />
            <span className="text-sm">Contact Support</span>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Error;