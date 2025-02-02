import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const DressDisplay = ({ category }) => {
  const [dresses, setDresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const response = await axios.get(`${config.BACKEND_URL}/api/${category.toLowerCase()}`);
        setDresses(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dresses:', err);
        setError('Failed to load dresses. Please try again later.');
        setLoading(false);
      }
    };

    fetchDresses();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dresses-container">
      <h2>{category}</h2>
      <div className="dresses-grid">
        {dresses.map((dress) => (
          <div key={dress._id} className="dress-card">
            <img src={dress.image} alt={dress.name} className="dress-image" />
            <div className="dress-details">
              <h3>{dress.name}</h3>
              <p className="price">₹{dress.price}</p>
              <p className="rating">Rating: {dress.rating}/5</p>
              {dress.offers && <p className="offers">{dress.offers}</p>}
              <button className="try-on-btn">Try On</button>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .dresses-container {
          padding: 20px;
        }
        .dresses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          padding: 20px;
        }
        .dress-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.2s;
          background: white;
        }
        .dress-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .dress-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .dress-details {
          padding: 15px;
        }
        .price {
          font-size: 1.2em;
          color: #e44d26;
          font-weight: bold;
        }
        .rating {
          color: #f4c430;
        }
        .offers {
          color: #4CAF50;
        }
        .try-on-btn {
          width: 100%;
          padding: 10px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .try-on-btn:hover {
          background: #45a049;
        }
        .error {
          color: red;
          text-align: center;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default DressDisplay;
