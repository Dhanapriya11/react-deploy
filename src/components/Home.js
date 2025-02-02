import React, { useState } from 'react';
import DressDisplay from './DressDisplay';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('casuals');
  const categories = ['casuals', 'partywears', 'formalwears'];

  return (
    <div className="home-container">
      <nav className="category-nav">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </nav>

      <DressDisplay category={activeCategory} />

      <style jsx>{`
        .home-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .category-nav {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 30px;
          padding: 20px 0;
          border-bottom: 1px solid #eee;
        }

        .category-btn {
          padding: 10px 20px;
          font-size: 16px;
          border: none;
          background: none;
          cursor: pointer;
          color: #666;
          position: relative;
          transition: color 0.3s;
        }

        .category-btn::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #4CAF50;
          transform: scaleX(0);
          transition: transform 0.3s;
        }

        .category-btn:hover {
          color: #4CAF50;
        }

        .category-btn.active {
          color: #4CAF50;
          font-weight: bold;
        }

        .category-btn.active::after {
          transform: scaleX(1);
        }
      `}</style>
    </div>
  );
};

export default Home;
