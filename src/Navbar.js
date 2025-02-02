import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const Navbar = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <nav style={{
      backgroundColor: '#333',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <Link to="/Home3" style={{
          color: 'white',
          textDecoration: 'none',
          marginRight: '1rem',
        }}>Home</Link>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <Link to="/cart" style={{
          color: 'white',
          textDecoration: 'none',
          marginRight: '1rem',
        }}>
          Cart ({cart.length})
        </Link>
        {currentUser.name && (
          <span style={{
            color: 'white',
            marginRight: '1rem',
          }}>Welcome, {currentUser.name}</span>
        )}
        <button onClick={handleLogout} style={{
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
