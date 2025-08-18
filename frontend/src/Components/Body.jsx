import React, { useState, useEffect, useRef, useCallback } from "react";
import Card from "./Card";
import { Allmix } from "../Utils/DummeyData";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ITEMS_PER_PAGE = 8;

const Body = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [displayedItems, setDisplayedItems] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const loader = useRef(null);

    // Filtered data based on category
    const getFilteredData = useCallback(() => {
        if (selectedCategory === "All") {
            return Allmix.data || [];
        }
        return (Allmix.data || []).filter(item => item.category === selectedCategory);
    }, [selectedCategory]);

    // Load items for current page
    useEffect(() => {
        const filteredData = getFilteredData();
        const newItems = filteredData.slice(0, page * ITEMS_PER_PAGE);
        setDisplayedItems(newItems);
        setHasMore(newItems.length < filteredData.length);
    }, [selectedCategory, page, getFilteredData]);

    // Reset page when category changes
    useEffect(() => {
        setPage(1);
    }, [selectedCategory]);

    // Intersection Observer for lazy loading
    useEffect(() => {
        if (!hasMore) return;
        const observer = new window.IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prev => prev + 1);
            }
        }, { threshold: 1 });
        if (loader.current) observer.observe(loader.current);
        return () => {
            if (loader.current) observer.unobserve(loader.current);
        };
    }, [hasMore]);

    const filterCategories = ["All", "Pre-Workout", "Post-Workout", "High in Protein", "High in Calories", "Veg"];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const addToCart = (item) => {
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItemIndex = existingCartItems.findIndex(cartItem => cartItem.id === item.id);
        let updatedCartItems;
        if (existingItemIndex !== -1) {
            updatedCartItems = existingCartItems.map((cartItem, index) => {
                if (index === existingItemIndex) {
                    return { ...cartItem, quantity: (cartItem.quantity || 1) + 1 };
                }
                return cartItem;
            });
        } else {
            updatedCartItems = [...existingCartItems, { ...item, quantity: 1 }];
        }
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        window.dispatchEvent(new Event('cartUpdated'));
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
        <div className="bg-white font-sans">
            <div className="flex flex-wrap justify-center mx-12">
                {/* Filter Section */}
                <div className="w-full mt-4 mb-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {filterCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
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
                
                {/* Display the breakfast items */}
                <div className="w-full mt-8">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">
                        {selectedCategory === "All" ? "All Items" : `${selectedCategory} Items`}
                    </h2>
                    <div className="flex flex-wrap">
                        {displayedItems.length > 0 ? (
                            displayedItems.map((item) => (
                                <Card 
                                    key={item.id} 
                                    cardData={item} 
                                    onAddToCart={() => addToCart(item)}
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 w-full">No items available in this category</p>
                        )}
                    </div>
                    {/* Loader div for Intersection Observer */}
                    {hasMore && (
                        <div ref={loader} style={{ height: "40px" }} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Body;