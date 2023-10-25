import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Routes, Route, Link, Navigate } from "react-router-dom"; 

import Home from './Home';
import Tododata from './Tododata'; 
import GallarySnap from './GallarySnap';
import { useAuth0 } from "@auth0/auth0-react";

function NavScrollExample() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  const PrivateRoute = ({ element, ...props }) => {
    if (isAuthenticated) {
      return element;
    } else {
      return <Navigate to="/login" state={{ from: props.location }} />;
    }
  };

  const [showProjectsDropdown, setShowProjectsDropdown] = useState(false);

  const handleProjectsDropdownEnter = () => {
    setShowProjectsDropdown(true);
  };

  const handleProjectsDropdownLeave = () => {
    setShowProjectsDropdown(false);
  };

  return (
    <div>
      <Navbar expand="lg" bg='dark' className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>{isAuthenticated ? 'Dashboard' : <lord-icon
    src="https://cdn.lordicon.com/onercatl.json"
    trigger="hover" 
    name="Home"
  />
}</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <NavDropdown
                title="Projects"
                id="navbarScrollingDropdown"
                show={showProjectsDropdown}
                onMouseEnter={handleProjectsDropdownEnter}
                onMouseLeave={handleProjectsDropdownLeave}
              >
                <NavDropdown.Item as={Link} to="/">
                  
                  Home
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/Tododata">Todo App</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/GallarySnap">GallarySnap</NavDropdown.Item>
                <NavDropdown.Item href="https://portfolio-76ccb.web.app" target="_blank" rel="noopener noreferrer">Portfolio</NavDropdown.Item>
              </NavDropdown>
             
            </Nav>
            <Form className="d-flex">
              <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
              
              <small className='text-center mt-3' style={{ whiteSpace: 'nowrap' }}><p>
{isAuthenticated ? user.name : ""}&nbsp;</p></small>
             
              {isAuthenticated ? (
                <Button variant="outline-success" onClick={() => logout({ returnTo: window.location.origin })}>
                  LogOut
                </Button>
              ) : (
                <Button variant="outline-success" onClick={() => loginWithRedirect({ returnTo: window.location.origin })}>
                  LogIn
                </Button>
              )}
            
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/Tododata' element={<PrivateRoute element={<Tododata />} />} />
          <Route path='/GallarySnap' element={<PrivateRoute element={<GallarySnap />} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}
export default NavScrollExample;

function Login() {


}
