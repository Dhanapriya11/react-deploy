import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    // In a real app, you'd send this to a backend
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some(user => user.email === email);
    
    if (!userExists) {
      setError('No account found with this email');
      return;
    }

    // Simulate sending reset email
    setMessage('Password reset link has been sent to your email');
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.title}>Reset Password</h2>
        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.success}>{message}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Send Reset Link
          </button>
        </form>
        <p style={styles.link}>
          Remember your password? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  formBox: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  success: {
    color: 'green',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  link: {
    textAlign: 'center',
    marginTop: '1rem',
  }
};

export default PasswordReset;
