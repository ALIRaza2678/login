import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Navbarr = () => {
  const navigate = useNavigate();
  
  // State to track if the user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token in localStorage or sessionStorage (or wherever you store it)
    const token = localStorage.getItem('token');
    
    // Check if token exists and is not expired (assuming JWT token here)
    if (token) {
      // You might decode the token and check expiration if necessary
      // For simplicity, let's assume the token is valid if it exists
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);
  
  const handleLogout = () => {
    // Remove the token from localStorage or sessionStorage
    localStorage.removeItem('token');
    
    // Update the state
    setIsAuthenticated(false);
    
    // Redirect to the home page or login page
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link to="/">Home</Link></Nav.Link>

            {/* Conditionally render Register/Login or Logout based on authentication */}
            {!isAuthenticated ? (
              <>
                <Nav.Link><Link to="/register">Register</Link></Nav.Link>
                <Nav.Link><Link to="/login">Login</Link></Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarr;
