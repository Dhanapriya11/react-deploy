import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  background: linear-gradient(to right, #ff758c, #ff7eb3);
  min-height: 100vh;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #ff4081;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
`;

const NavLink = styled.li`
  display: inline;
  
  a {
    text-decoration: none;
    color: black;
    font-weight: bold;
    transition: 0.3s;
    
    &:hover {
      color: #ff4081;
    }
  }
`;

const HeroSection = styled.header`
  text-align: center;
  padding: 80px 20px;
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 50px;
  font-weight: bold;
`;

const HeroText = styled.p`
  font-size: 18px;
  margin-top: 10px;
`;

const ShopButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background: white;
  color: #ff4081;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  
  a {
    text-decoration: none;
    color: #ff4081;
  }

  &:hover {
    background: #f0f0f0;
  }
`;

const CategoriesSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  padding: 50px;
`;

const CategoryCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const CategoryImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 10px;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 15px;
  background-color: white;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
`;

const HomePage = () => {
  return (
    <PageContainer>
      {/* Navbar */}
      <Navbar>
        <Logo>Dress Store</Logo>
        <NavLinks>
          <NavLink><Link to="/">Home</Link></NavLink>
          <NavLink><Link to="/categories">Categories</Link></NavLink>
          <NavLink><Link to="/cart">Cart</Link></NavLink>
          <NavLink><Link to="/contact">Contact</Link></NavLink>
        </NavLinks>
      </Navbar>

      {/* Hero Section */}
      <HeroSection>
        <HeroTitle>Find Your Perfect Style</HeroTitle>
        <HeroText>Trendy & Elegant Dresses for Every Occasion</HeroText>
        <ShopButton>
          <Link to="/categories">Shop Now</Link>
        </ShopButton>
      </HeroSection>

      {/* Categories Section */}
      <CategoriesSection>
        {["Casual", "Party", "Formal", "Traditional"].map((category, index) => (
          <CategoryCard key={index}>
            <CategoryImage
              src={`https://source.unsplash.com/200x200/?fashion,${category}`}
              alt={category}
            />
            <h3>{category} Wear</h3>
          </CategoryCard>
        ))}
      </CategoriesSection>

      {/* Footer */}
      <Footer>
        <p>&copy; 2025 Dress Store. All rights reserved.</p>
      </Footer>
    </PageContainer>
  );
};

export default HomePage;
