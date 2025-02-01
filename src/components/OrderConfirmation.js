import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, total } = location.state || {};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.checkmark}>✓</div>
        <h2 style={styles.title}>Order Confirmed!</h2>
        <p style={styles.orderNumber}>Order #{orderId}</p>
        <p style={styles.message}>
          Thank you for your purchase! We've received your order and will begin
          processing it right away.
        </p>
        <div style={styles.details}>
          <div style={styles.detailRow}>
            <span>Order Total:</span>
            <span>Rs{total?.toFixed(2)}</span>
          </div>
          <div style={styles.detailRow}>
            <span>Estimated Delivery:</span>
            <span>3-5 Business Days</span>
          </div>
        </div>
        <p style={styles.emailMessage}>
          We've sent a confirmation email with your order details.
        </p>
        <div style={styles.buttons}>
          <button 
            onClick={() => navigate('/orders')} 
            style={styles.trackButton}
          >
            Track Order
          </button>
          <button 
            onClick={() => navigate('/')} 
            style={styles.continueButton}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: "url('https://img.freepik.com/free-vector/pink-gradient-abstract-background-design_343694-3765.jpg')", // Replace with your image URL
    backgroundSize: "cover",  // Ensures the image covers the entire screen
    backgroundPosition: "center", 
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: '#f8f9fa',
  },
  card: {
    backgroundColor: '#fff',
    padding: '3rem',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '600px',
    width: '100%',
  },
  checkmark: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 2rem',
    boxShadow: '0 5px 15px rgba(76, 175, 80, 0.3)',
  },
  title: {
    color: '#333',
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  orderNumber: {
    color: '#666',
    fontSize: '1.2rem',
    marginBottom: '2rem',
  },
  message: {
    color: '#666',
    fontSize: '1.1rem',
    lineHeight: '1.6',
    marginBottom: '2rem',
  },
  details: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '10px',
    marginBottom: '2rem',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    fontSize: '1.1rem',
    color: '#333',
    '&:last-child': {
      marginBottom: 0,
    }
  },
  emailMessage: {
    color: '#666',
    fontSize: '1rem',
    marginBottom: '2rem',
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  trackButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#1976D2',
      transform: 'translateY(-2px)',
    }
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#45a049',
      transform: 'translateY(-2px)',
    }
  },
};

export default OrderConfirmation;
