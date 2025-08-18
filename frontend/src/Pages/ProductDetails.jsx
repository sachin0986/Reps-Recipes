import React, { useState, useEffect } from "react";
import { API_URL } from "../Utils/Constants";
import DetailedProductCard from "../Components/DetailedProductCard";

const ProductDetails = () => {
    const [dish, setDish] = useState([]); // initialize as an empty array
    const [loading, setLoading] = useState(true); // track loading state

    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        try {
            const data = await fetch(API_URL);
            const json = await data.json();
            console.log("API response:", json); // Log the full JSON to inspect it

            // Adjust this based on the structure of your data
            const fetchedDishes = json[0]?.menu?.data?.cards?.allMix || [];
            console.log("Fetched dishes:", fetchedDishes); // Log the fetched dishes

            setDish(fetchedDishes); // Set the dishes
            setLoading(false); // stop loading once data is fetched
        } catch (error) {
            console.error("Error fetching the data:", error);
            setLoading(false); // stop loading even if error occurs
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    // Check if the dish array has any data
    return (
        <div className="menu">
            {
                dish.length > 0 ? (
                    dish.map((allmix) => (
                        <DetailedProductCard key={allmix.id} itemData={allmix} /> // Pass correct prop
                    ))
                ) : (
                    <p>No data available</p>
                )
            }
        </div>
    );
};

export default ProductDetails;