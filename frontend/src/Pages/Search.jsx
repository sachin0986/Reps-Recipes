import React, { useState, useEffect } from "react";
import { Allmix } from "../Utils/DummeyData";
import { Search as SearchIcon, SlidersHorizontal, X } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(1000);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  // Get unique categories from the data
  const categories = ["All", ...new Set(Allmix.data.map(item => item.category))];

  useEffect(() => {
    // Get all items from dummy data
    const allItems = Allmix.data || [];
    
    // Apply filters
    let filtered = allItems.filter(item => {
      // Search by name
      const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
      
      // Filter by category
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      
      // Filter by price
      const price = parseInt(item.priceforHalf) || parseInt(item.price);
      const matchesPrice = price <= priceRange;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
    
    setFilteredItems(filtered);
  }, [searchText, selectedCategory, priceRange]);

  const addToCart = (item) => {
    // Get existing cart items from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex >= 0) {
      // Item exists, update quantity
      existingCart[existingItemIndex].quantity = (existingCart[existingItemIndex].quantity || 1) + 1;
    } else {
      // Item doesn't exist, add new item
      existingCart.push({
        ...item,
        quantity: 1
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    
    // Dispatch custom event for cart update
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show success toast
    toast.success(`${item.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search for food items..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchText && (
                <button
                  onClick={() => setSearchText("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <SlidersHorizontal size={20} />
              Filters
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Filter */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                        ${selectedCategory === category 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹0</span>
                    <span>₹{priceRange}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {filteredItems.length} {filteredItems.length === 1 ? 'Result' : 'Results'} Found
          </h2>
          
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No items found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={item.imageURL} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-lg">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(parseFloat(item.starsRatings)) ? 'text-yellow-400' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-1">{item.starsRatings}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      {item.calories && <div>Calories: {item.calories}</div>}
                      {item.protein && <div>Protein: {item.protein}</div>}
                      {item.carbs && <div>Carbs: {item.carbs}</div>}
                      {item.fats && <div>Fats: {item.fats}</div>}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg text-gray-800">
                        ₹{item.priceforHalf || item.price}
                      </span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;