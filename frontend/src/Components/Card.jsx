import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';

const Card = ({ cardData, onAddToCart, isLoading }) => {
  if (isLoading) {
    return <CardShimmer />;
  }

  const { id, name, starsRatings, priceforHalf, imageURL, protein, calories, fats, carbs, category } = cardData;

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

  const handleAddToCart = () => {
    onAddToCart({
      id,
      name,
      price: priceforHalf,
      imageURL,
      quantity: 1
    });
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Product Image */}
        <div className="h-48 w-full overflow-hidden">
          <img 
            src={imageURL}
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Product Details */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{name}</h3>
            <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-lg font-medium">{category}</span>
          </div>
          
          {/* Ratings */}
          <div className="flex items-center mb-3">
            <div className="flex mr-1">
              {renderStars(starsRatings)}
            </div>
            <span className="text-xs text-gray-500">{starsRatings}</span>
          </div>
          
          {/* Nutrition info */}
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
            <div>Calories: {calories}</div>
            <div>Protein: {protein}</div>
            <div>Carbs: {carbs}</div>
            <div>Fats: {fats}</div>
          </div>
          
          {/* Price and Add button */}
          <div className="flex justify-between items-center mt-3">
            <span className="font-bold text-lg text-gray-800">₹{priceforHalf}</span>
            <button 
              className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Shimmer loading effect component
const CardShimmer = () => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3">
      <div className="bg-white rounded-xl overflow-hidden shadow-md">
        {/* Image shimmer */}
        <div className="h-48 w-full bg-gray-200 animate-pulse"></div>
        
        <div className="p-4">
          {/* Title and category shimmer */}
          <div className="flex justify-between items-start mb-2">
            <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          </div>
          
          {/* Rating shimmer */}
          <div className="flex items-center mb-3">
            <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          </div>
          
          {/* Nutrition info shimmer */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>
          
          {/* Price and button shimmer */}
          <div className="flex justify-between items-center mt-3">
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;