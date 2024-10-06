import React, { useEffect } from "react";
import Card from "./Card";
import { useState } from "react";
import { API_URL } from "../Utils/Constants";

const Body = () => {
    const [ListofData, setListData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(API_URL);
        const json = await data.json();
        console.log(json[0].menu?.data?.cards?.healthySmoothies); // Check the structure of the response
        setListData(json[0]?.menu?.data?.cards?.healthyBreakfasts || []); // Adjust this path as necessary
    };

    return (
        <div className="body">
            <div className="Search">Search</div>
            <div className="res-container">
                {
                    ListofData.length > 0 ? (
                        ListofData.map((allmix) => (
                            <Card key={allmix.id} cardData={allmix} />
                        ))
                    ) : (
                        <p>No data available</p>
                    )
                }
            </div>
        </div>
    );
};

export default Body;