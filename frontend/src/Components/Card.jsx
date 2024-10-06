import React from "react";

const Card = (props) => {
    const { cardData } = props;
    console.log("Card Data:", cardData); // Check what data is coming

    const {
        name,
        starsRatings,
        price,
        imageURL,
        category
    } = cardData;

    return (
       <div className="res-card">
            <img className="cart_image" src={imageURL} alt="imageLogo" />
            <h3>{name}</h3>
            <p>{price}</p>
            <p>{starsRatings}</p>
            <p>{category}</p>
       </div>
    );
};


export default Card;


