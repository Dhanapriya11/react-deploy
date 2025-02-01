import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Casual from "./Casual";
import PartyWear from "./PartyWear";
import DressDetails from "./DressDetails";
import FormalWear from "./FormalWear";
import TraditionalWear from "./TraditionalWear";
import { CartProvider } from "./CartContext";
import Navbar from "./Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PasswordReset from "./components/PasswordReset";
import PrivateRoute from "./components/PrivateRoute";
import VisualTryOn from "./components/VisualTryOn";
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';

const Home3 = () => (
  <div style={styles.container}>
    <h1 style={styles.title}>Find Your Perfect Style</h1>
    <p style={styles.subtitle}><strong>Trendy & Elegant Dresses for Every Occasion</strong></p>
    <div style={styles.linksContainer}>
      <Link to="/Casual" style={{ ...styles.link, backgroundColor: "#ffcccc" }}>
        Casual Wear
      </Link>
      <Link to="/PartyWear" style={{ ...styles.link, backgroundColor: "#ffe6cc" }}>
        Party Wear
      </Link>
      <Link to="/FormalWear" style={{ ...styles.link, backgroundColor: "#f5ccff" }}>
        Formal Wear
      </Link>
      <Link to="/TraditionalWear" style={{ ...styles.link, backgroundColor: "#ccf5e1" }}>
        Traditional Wear
      </Link>
    </div>
  </div>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route
              path="/Home3"
              element={
                <PrivateRoute>
                  <Home3 />
                </PrivateRoute>
              }
            />
            <Route
              path="/Casual"
              element={
                <PrivateRoute>
                  <Casual />
                </PrivateRoute>
              }
            />
            <Route
              path="/PartyWear"
              element={
                <PrivateRoute>
                  <PartyWear />
                </PrivateRoute>
              }
            />
            <Route
              path="/FormalWear"
              element={
                <PrivateRoute>
                  <FormalWear />
                </PrivateRoute>
              }
            />
            <Route
              path="/TraditionalWear"
              element={
                <PrivateRoute>
                  <TraditionalWear />
                </PrivateRoute>
              }
            />
            <Route
              path="/Cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/Checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={<Cart />} />
            <Route
              path="/checkout"
              element={<Checkout />} />
            <Route
              path="/order-confirmation"
              element={<OrderConfirmation />} />
            <Route
              path="/dress/:id"
              element={
                <PrivateRoute>
                  <DressDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/try-on/:id"
              element={
                <PrivateRoute>
                  <VisualTryOn />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

const styles = {
  
  container: {
   
    backgroundImage: "url('https://cdn.shopify.com/s/files/1/0070/7032/articles/how_20to_20start_20a_20clothing_20brand_26e960f5-9ca7-445b-99fb-ac30dd860dd5.png')", // Replace with your image URL
    backgroundSize: "cover",  // Ensures the image covers the entire screen
    backgroundPosition: "center",  // Centers the image
    minHeight: "100vh",  // Ensures the background cove
    textAlign: "center",
    padding: "20px",
  },
  title: {
    fontSize: "2.5rem",
    color: "#222",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.4rem",
    color: "#333",
    marginBottom: "2rem",
  },
  linksContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
  },
  link: {
    padding: "20px 40px",
    textDecoration: "none",
    color: "#333",
    borderRadius: "10px",
    fontSize: "1.1rem",
    transition: "transform 0.3s ease",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
};

// To apply hover effect, you need to manage it separately or use a CSS-in-JS library:


export default App;
