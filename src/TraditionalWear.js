import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TraditionalWear.css'; // Optional: Add styling
import { useNavigate } from "react-router-dom";
const TraditionalWear = () => {
  const [traditionalWear, setTraditionalWear] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const navigate = useNavigate();
  useEffect(() => {
    // Fetch Traditional Wear data from the backend
    axios.get('http://localhost:4000/traditionalwears')
      .then(response => {
        console.log('Traditional Wear Data:', response.data);
        setTraditionalWear(response.data);
      })
      .catch(error => console.error('Error fetching traditional wear data:', error));
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
 const filteredTraditional = traditionalWear.filter(item => (maxPrice ? item.price <= maxPrice : true));

  return (
    <div style={{backgroundColor:"lightpink"}}>
      <h2>Traditional Wear Collection</h2>

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

      <div className="traditional-container">
        
          {filteredTraditional.map((item) => (
<div 
                        key={item._id} 
                        className="traditional-item" 
                        onClick={() => navigate(`/dress/${item._id}`)} // Navigate to details page
                    >
              <img src={item.image} alt={item.name} className="traditional-image" />
              <div className="traditional-info">
                <h3>{item.name}</h3>
                <p className="price">₹{item.price}</p>
                <div className="rating">
                  <span>{'⭐'.repeat(item.rating)}</span>
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

export default TraditionalWear;
