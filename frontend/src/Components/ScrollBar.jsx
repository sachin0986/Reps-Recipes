import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { AllData } from '../Utils/DummeyData';


export default function HorizontalScrollbar() {
  const products = AllData.menu.data.scrollBar;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  // Extract unique categories for filter
  const categories = ['All', ...new Set(products.map(item => item.category))];
  
  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(item => item.category === selectedCategory);

  // Scroll handlers
  const scrollLeft = () => {
    const newPosition = Math.max(0, scrollPosition - 200);
    setScrollPosition(newPosition);
  };

  const scrollRight = () => {
    const maxScroll = filteredProducts.length * 220 - 800; // Approximate max scroll width
    const newPosition = Math.min(maxScroll, scrollPosition + 200);
    setScrollPosition(newPosition);
  };

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(parseFloat(rating));
    const hasHalfStar = parseFloat(rating) - fullStars >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={16} className="fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half-star" className="relative">
          <Star size={16} className="text-gray-300" />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }
    
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3 text-gray-800">Refreshing Drinks</h2>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setScrollPosition(0);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                ${selectedCategory === category 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Scrollbar */}
      <div className="relative">
        {/* Left scroll button */}
        {scrollPosition > 0 && (
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
        )}
        
        {/* Products container */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {filteredProducts.map(item => (
              <div 
                key={item.id}
                onClick={() => setSelectedItem(item.id === selectedItem ? null : item.id)}
                className={`flex-shrink-0 w-52 mr-4 rounded-xl overflow-hidden bg-white shadow-md 
                  transition-transform duration-200 hover:shadow-lg cursor-pointer
                  ${item.id === selectedItem ? 'ring-2 ring-emerald-500 scale-105' : ''}`}
              >
                {/* Product Image */}
                <div className="h-40 w-full overflow-hidden">
                  <img 
                    src={item.imageURL} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Product Details */}
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                    <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-lg font-medium">{item.category}</span>
                  </div>
                  
                  {/* Ratings */}
                  <div className="flex items-center mb-2">
                    <div className="flex mr-1">
                      {renderStars(item.starsRatings)}
                    </div>
                    <span className="text-xs text-gray-500">{item.starsRatings}</span>
                  </div>
                  
                  {/* Nutrition info */}
                  <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 mb-2">
                    <div>Calories: {item.calories}</div>
                    <div>Protein: {item.protein}</div>
                    <div>Carbs: {item.carbs}</div>
                    <div>Fats: {item.fats}</div>
                  </div>
                  
                  {/* Price and Add button */}
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-gray-800">₹{item.price}</span>
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-3 py-1 rounded-lg">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right scroll button */}
        {filteredProducts.length > 3 && scrollPosition < (filteredProducts.length - 3) * 220 && (
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          >
            <ChevronRight size={24} className="text-gray-700" />
          </button>
        )}
      </div>
    </div>
  );
}