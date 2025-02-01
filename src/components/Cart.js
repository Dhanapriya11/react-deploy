import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, setCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  };

  const subtotal = calculateSubtotal();

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map(item =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save20') {
      setDiscount(subtotal * 0.2);
    } else {
      alert('Invalid promo code');
    }
  };

  const proceedToCheckout = () => {
    navigate('/checkout', { 
      state: { 
        subtotal, 
        discount, 
        total: subtotal - discount 
      } 
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div style={styles.emptyCart}>
          <img 
            src="/empty-cart.png" 
            alt="Empty Cart" 
            style={styles.emptyCartImage}
          />
          <p>Your cart is empty</p>
          <button 
            onClick={() => navigate('/Home3')}
            style={styles.continueShoppingButton}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div style={styles.cartContent}>
          <div style={styles.itemsList}>
            {cart.map(item => (
              <div key={item._id} style={styles.cartItem}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={styles.itemImage}
                />
                <div style={styles.itemDetails}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={styles.itemPrice}>Rs.{item.price}</p>
                  <div style={styles.quantityControls}>
                    <button 
                      onClick={() => updateQuantity(item._id, (item.quantity || 1) - 1)}
                      style={styles.quantityButton}
                    >
                      -
                    </button>
                    <span style={styles.quantity}>{item.quantity || 1}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)}
                      style={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  style={styles.removeButton}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div style={styles.cartSummary}>
            <h3 style={styles.summaryTitle}>Order Summary</h3>
            <div style={styles.promoCode}>
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={styles.promoInput}
              />
              <button 
                onClick={applyPromoCode}
                style={styles.promoButton}
              >
                Apply
              </button>
            </div>
            <div style={styles.summaryDetails}>
              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span>Rs{subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div style={styles.summaryRow}>
                  <span>Discount</span>
                  <span>Rs{discount.toFixed(2)}</span>
                </div>
              )}
              <div style={styles.summaryRow}>
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div style={styles.totalRow}>
                <span>Total</span>
                <span>Rs.{(subtotal - discount).toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={proceedToCheckout}
              style={styles.checkoutButton}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: "url('https://img.freepik.com/free-vector/pink-gradient-abstract-background-design_343694-3765.jpg')", // Replace with your image URL
    backgroundSize: "cover",  // Ensures the image covers the entire screen
    backgroundPosition: "center", 
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '2rem',
    fontSize: '2rem',
  },
  emptyCart: {
    textAlign: 'center',
    padding: '3rem',
    color: '#666',
  },
  emptyCartImage: {
    width: '200px',
    marginBottom: '1rem',
  },
  continueShoppingButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#45a049',
      transform: 'translateY(-2px)',
    }
  },
  cartContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 350px',
    gap: '2rem',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    position: 'relative',
  },
  itemImage: {
    width: '100px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '5px',
    marginRight: '1rem',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: '1.1rem',
    color: '#333',
    marginBottom: '0.5rem',
  },
  itemPrice: {
    fontSize: '1.2rem',
    color: '#2196F3',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  quantityButton: {
    width: '30px',
    height: '30px',
    border: 'none',
    borderRadius: '50%',
    backgroundColor: '#e0e0e0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#bdbdbd',
    }
  },
  quantity: {
    fontSize: '1.1rem',
    padding: '0 0.5rem',
  },
  removeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    width: '30px',
    height: '30px',
    border: 'none',
    borderRadius: '50%',
    backgroundColor: '#ff5252',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#ff1744',
    }
  },
  cartSummary: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '10px',
    position: 'sticky',
    top: '2rem',
  },
  summaryTitle: {
    fontSize: '1.3rem',
    color: '#333',
    marginBottom: '1.5rem',
  },
  promoCode: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  promoInput: {
    flex: 1,
    padding: '0.8rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  promoButton: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#9c27b0',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#7b1fa2',
    }
  },
  summaryDetails: {
    borderTop: '1px solid #ddd',
    borderBottom: '1px solid #ddd',
    padding: '1rem 0',
    marginBottom: '1rem',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.8rem',
    color: '#666',
    fontSize: '1rem',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#333',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
  checkoutButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#1976D2',
      transform: 'translateY(-2px)',
    }
  },
};

export default Cart;
