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
import Home from './components/Home';

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
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
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
              path="/try-on/:id"
              element={
                <PrivateRoute>
                  <VisualTryOn />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route
              path="/order-confirmation"
              element={
                <PrivateRoute>
                  <OrderConfirmation />
                </PrivateRoute>
              }
            />
            <Route
              path="/dress/:id"
              element={
                <PrivateRoute>
                  <DressDetails />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
