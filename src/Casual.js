import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Casual.css";


const Casual = () => {
    const [casuals, setCasuals] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const navigate = useNavigate();

    // Fetch casual wear from the backend
    useEffect(() => {
        axios.get("http://localhost:4000/casuals")
            .then(response => setCasuals(response.data))
            .catch(error => console.error("Error fetching data:", error));
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
    const filteredCasuals = casuals.filter(item => (maxPrice ? item.price <= maxPrice : true));

    return (
        <div style={{backgroundColor:"lightpink"}}>
            <h2>Casual Wear Collection</h2>

            {/* Search Bar & Price Filter */}
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

            {/* Display Casual Wear */}
            <div className="casuals-container">
                {filteredCasuals.map((item) => (
                    <div 
                        key={item._id} 
                        className="casual-item" 
                        onClick={() => navigate(`/dress/${item._id}`)} // Navigate to details page
                    >
                        <img src={item.image} alt={item.name} className="casual-image" />
                        <div className="casual-info">
                            <h3>{item.name}</h3>
                            <p className="price">₹{item.price}</p>
                            <div className="rating">
                                <span>{'⭐'.repeat(item.rating)}</span>
                            </div>
                            <p className="description">{item.description}</p>
                            {item.offers && <p className="offers">Offers: {item.offers}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Casual;
