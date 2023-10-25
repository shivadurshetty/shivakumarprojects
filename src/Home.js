import React from 'react';
import './HomePage.css';
import Button from 'react-bootstrap/Button';
import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div className="container">
      <header>
        <h1>Home Page</h1>
      </header>
      <main>
        <section className="feature">
          <h2>Feature Section</h2>
          <p>Welcome to our website, where innovation meets elegance. Discover a world of possibilities for your home.</p>
        </section>
        <section className="cta">
          <h2>Call to Action</h2>
          {isAuthenticated ? (
           
            <p>Welcome! You are signed in.</p>
          ) : (
            
            <p>Please sign in to continue</p>
          )}
          {isAuthenticated ? null : (
            <Button variant="outline-success" onClick={() => loginWithRedirect({ returnTo: window.location.origin })}>
              Sign Up
            </Button>
          )}
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Home Page</p>
      </footer>
    </div>
  );
};

export default HomePage;
