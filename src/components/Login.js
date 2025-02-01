import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!credentials.email || !credentials.password) {
      setError('Please fill in all fields');
      return;
    }

    // Check if user exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);

    if (user) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/Home3');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    
    <div style={styles.container }>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <div style={styles.links}>
          <Link to="/signup" style={styles.link}>Create an account</Link>
          <Link to="/reset-password" style={styles.link}>Forgot password?</Link>
        </div>
      </div>
    </div>
    
  );
};

const styles = {
  container: {
    backgroundImage: "url('https://img.freepik.com/free-vector/pink-gradient-abstract-background-design_343694-3765.jpg')", // Replace with your image URL
    backgroundSize: "cover",  // Ensures the image covers the entire screen
    backgroundPosition: "center",  // Centers the image
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  loginBox: {
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
  links: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  }
};

export default Login;
