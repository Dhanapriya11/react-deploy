import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subtotal, discount, total } = location.state || {};

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveInfo: false
  });

  const [activeStep, setActiveStep] = useState('shipping');
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Required fields validation
    ['firstName', 'lastName', 'address', 'city', 'state', 'zipCode'].forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    // Card number validation (simple 16-digit check)
    if (!formData.cardNumber.match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    // Expiry date validation (MM/YY format)
    if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }

    // CVV validation (3 or 4 digits)
    if (!formData.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Here you would typically make an API call to process the payment
      // For demo purposes, we'll just simulate a successful payment
      setTimeout(() => {
        navigate('/order-confirmation', {
          state: {
            orderId: Math.random().toString(36).substr(2, 9).toUpperCase(),
            total
          }
        });
      }, 1500);
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Checkout</h2>

      <div style={styles.content}>
        <div style={styles.formSection}>
          <div style={styles.steps}>
            <div 
              style={{
                ...styles.step,
                ...(activeStep === 'shipping' ? styles.activeStep : {})
              }}
              onClick={() => setActiveStep('shipping')}
            >
              1. Shipping
            </div>
            <div 
              style={{
                ...styles.step,
                ...(activeStep === 'payment' ? styles.activeStep : {})
              }}
              onClick={() => setActiveStep('payment')}
            >
              2. Payment
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {activeStep === 'shipping' && (
              <div style={styles.formGroup}>
                <h3 style={styles.sectionTitle}>Shipping Information</h3>
                
                <div style={styles.inputGroup}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      ...styles.input,
                      ...(errors.email ? styles.inputError : {})
                    }}
                  />
                  {errors.email && <span style={styles.error}>{errors.email}</span>}
                </div>

                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      style={{
                        ...styles.input,
                        ...(errors.firstName ? styles.inputError : {})
                      }}
                    />
                    {errors.firstName && <span style={styles.error}>{errors.firstName}</span>}
                  </div>
                  <div style={styles.inputGroup}>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      style={{
                        ...styles.input,
                        ...(errors.lastName ? styles.inputError : {})
                      }}
                    />
                    {errors.lastName && <span style={styles.error}>{errors.lastName}</span>}
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    style={{
                      ...styles.input,
                      ...(errors.address ? styles.inputError : {})
                    }}
                  />
                  {errors.address && <span style={styles.error}>{errors.address}</span>}
                </div>

                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      style={{
                        ...styles.input,
                        ...(errors.city ? styles.inputError : {})
                      }}
                    />
                    {errors.city && <span style={styles.error}>{errors.city}</span>}
                  </div>
                  <div style={styles.inputGroup}>
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      style={{
                        ...styles.input,
                        ...(errors.state ? styles.inputError : {})
                      }}
                    />
                    {errors.state && <span style={styles.error}>{errors.state}</span>}
                  </div>
                  <div style={styles.inputGroup}>
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      style={{
                        ...styles.input,
                        ...(errors.zipCode ? styles.inputError : {})
                      }}
                    />
                    {errors.zipCode && <span style={styles.error}>{errors.zipCode}</span>}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveStep('payment')}
                  style={styles.continueButton}
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {activeStep === 'payment' && (
              <div style={styles.formGroup}>
                <h3 style={styles.sectionTitle}>Payment Information</h3>
                
                <div style={styles.inputGroup}>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength="16"
                    style={{
                      ...styles.input,
                      ...(errors.cardNumber ? styles.inputError : {})
                    }}
                  />
                  {errors.cardNumber && <span style={styles.error}>{errors.cardNumber}</span>}
                </div>

                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      maxLength="5"
                      style={{
                        ...styles.input,
                        ...(errors.expiryDate ? styles.inputError : {})
                      }}
                    />
                    {errors.expiryDate && <span style={styles.error}>{errors.expiryDate}</span>}
                  </div>
                  <div style={styles.inputGroup}>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      maxLength="4"
                      style={{
                        ...styles.input,
                        ...(errors.cvv ? styles.inputError : {})
                      }}
                    />
                    {errors.cvv && <span style={styles.error}>{errors.cvv}</span>}
                  </div>
                </div>

                <div style={styles.checkbox}>
                  <input
                    type="checkbox"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                    id="saveInfo"
                  />
                  <label htmlFor="saveInfo">Save payment information for future purchases</label>
                </div>

                <button type="submit" style={styles.payButton}>
                  Pay Rs{total?.toFixed(2)}
                </button>
              </div>
            )}
          </form>
        </div>

        <div style={styles.orderSummary}>
          <h3 style={styles.summaryTitle}>Order Summary</h3>
          <div style={styles.summaryContent}>
            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <span>Rs{subtotal?.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div style={styles.summaryRow}>
                <span>Discount</span>
                <span>-Rs{discount?.toFixed(2)}</span>
              </div>
            )}
            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div style={styles.totalRow}>
              <span>Total</span>
              <span>Rs{total?.toFixed(2)}</span>
            </div>
          </div>
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
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 350px',
    gap: '2rem',
  },
  formSection: {
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    borderRadius: '10px',
  },
  steps: {
    display: 'flex',
    marginBottom: '2rem',
    borderBottom: '2px solid #ddd',
  },
  step: {
    padding: '1rem 2rem',
    cursor: 'pointer',
    color: '#666',
    borderBottom: '2px solid transparent',
    marginBottom: '-2px',
  },
  activeStep: {
    color: '#2196F3',
    borderBottomColor: '#2196F3',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: '1.3rem',
    color: '#333',
    marginBottom: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  input: {
    padding: '0.8rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    transition: 'border-color 0.2s ease',
    '&:focus': {
      outline: 'none',
      borderColor: '#2196F3',
    }
  },
  inputError: {
    borderColor: '#ff5252',
  },
  error: {
    color: '#ff5252',
    fontSize: '0.8rem',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  continueButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '1rem',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    marginTop: '1rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#1976D2',
      transform: 'translateY(-2px)',
    }
  },
  payButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '1rem',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    marginTop: '1rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#45a049',
      transform: 'translateY(-2px)',
    }
  },
  orderSummary: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '10px',
    position: 'sticky',
    top: '2rem',
    height: 'fit-content',
  },
  summaryTitle: {
    fontSize: '1.3rem',
    color: '#333',
    marginBottom: '1.5rem',
  },
  summaryContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#666',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#333',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    borderTop: '1px solid #ddd',
    paddingTop: '1rem',
    marginTop: '0.5rem',
  },
};

export default Checkout;
