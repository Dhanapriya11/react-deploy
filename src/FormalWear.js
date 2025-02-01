import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Formals.css'; // Optional: Add styling for formals wear
import { useNavigate } from "react-router-dom";
const FormalWear = () => {
    const [formals, setFormals] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const navigate = useNavigate();
    // Fetch formal wear from the backend
    useEffect(() => {
        axios.get("http://localhost:4000/formalwears") // Updated URL
            .then((response) => {
                console.log("Formal Wear Data:", response.data); // Log the data to check it
                setFormals(response.data);
            })
            .catch(error => console.error("Error fetching formal wear data:", error));
    }, []);
// Handle Search & Price Input Changes
const handleSearchChange = (e) => setSearchTerm(e.target.value);
const handlePriceChange = (e) => setMaxPrice(e.target.value);

// Navigate to a specific category if searched
const handleSearchSubmit = (e) => {
    e.preventDefault();
    const category = searchTerm.toLowerCase();
    if (category === "casual") navigate("/Casual");
    else if (category === "party") navigate("/PartyWear");
    else if (category === "formal") navigate("/FormalWear");
    else if (category === "traditional") navigate("/TraditionalWear");
    else alert("Category not found! Try Casual, Party, Formal, or Traditional.");
};

// Filter casuals by price
const filteredformals = formals.filter(item => (maxPrice ? item.price <= maxPrice : true));

    return (
        <div style={{backgroundColor:" rgb(243, 182, 217)"}}>
            <h2>Formal Wear Collection</h2>
            <div className="search-filter">
                <form onSubmit={handleSearchSubmit}>
                    <input 
                        type="text" 
                        placeholder="Search category (e.g., Traditional)" 
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button type="submit">Search</button>
                </form>
                <input 
                    type="number" 
                    placeholder="Max Price (₹)" 
                    value={maxPrice}
                    onChange={handlePriceChange}
                />
            </div>
            {/* Display Formal Wear */}
            <div className="formal-container">
                
                    {filteredformals.map((item) => (
                        <div 
                        key={item._id} 
                        className="formal-item" 
                        onClick={() => navigate(`/dress/${item._id}`)} // Navigate to details page
                    >
                            <img src={item.image} alt={item.name} className="formal-image" />
                            <div className="formal-info">
                                <h3>{item.name}</h3>
                                <p className="price">₹{item.price}</p>
                                <div className="rating">
                                    <span>{'⭐'.repeat(item.rating || 0)}</span> {/* Handling default rating */}
                                </div>
                                <p className="description">{item.description}</p>
                                {item.offers && <p className="offers">Offers: {item.offers}</p>}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default FormalWear;
