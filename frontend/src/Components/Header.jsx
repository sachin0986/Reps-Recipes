import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ShoppingCart, LogOut, User } from "lucide-react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
      setCartCount(totalItems);
    };

    // Initial load
    updateCartCount();

    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white shadow-md">
      <div className="flex items-center">
        <Link to="/">
          <img
            src="src/assets/logo.png"
            alt="Logo"
            className="h-12 w-auto"
          />
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        <Link to="/" className="text-gray-700 hover:text-orange-500 transition-colors">
          Home
        </Link>
        <Link to="/aipage" className="text-gray-700 hover:text-orange-500 transition-colors">
          Say Hi to "AI"
        </Link>
        <Link to="/search" className="text-gray-700 hover:text-orange-500 transition-colors">
          Search
        </Link>
        <Link to="/offers" className="text-gray-700 hover:text-orange-500 transition-colors">
          Offers
        </Link>
        <Link to="/contact" className="text-gray-700 hover:text-orange-500 transition-colors">
          Contact
        </Link>
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <User className="h-8 w-8 text-orange-500" />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                <div className="px-4 py-2 text-sm text-gray-700">
                  Signed in as: test@example.com
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Link 
            to="/signin" 
            className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
          >
            Sign In
          </Link>
        )}
        <Link to="/cart" className="relative">
          <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-orange-500 transition-colors" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;