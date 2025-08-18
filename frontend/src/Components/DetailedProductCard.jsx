import React from "react";

const DetailedProductCard = (props) => {
    const { itemData } = props;

    // Add a check to ensure itemData exists before destructuring
    if (!itemData) {
        return <p>Loading...</p>; // Display a loading or fallback message
    }

    const { name, category, starsRatings, ingredients, priceforFull, priceforHalf } = itemData;

    return (
        <div className="menu">
            <h1>{name}</h1>
            <h2>{category} : {starsRatings}</h2>
            <h3>{"Price for full - " + priceforFull} & {"Price for half - " + priceforHalf}</h3>
            <h4>{"Per 250 grams calories: "}</h4>
            <h4>{"Per 500 grams calories: "}</h4>
            <h4>{ingredients.join(", ")}</h4>
            <p>Description</p>
        </div>
    );
};

export default DetailedProductCard;