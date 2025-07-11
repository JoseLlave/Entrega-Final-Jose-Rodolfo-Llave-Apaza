import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CartWidget from '../CartWidget';
import styles from './Navbar.module.css';

function NavBar() {
  return (
    <Navbar expand="lg" className={styles.navbar} variant="dark" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img 
            src="https://i.ibb.co/r2pQ5CN5/logonuevo.png" 
            alt="Logo" 
            className={styles.brandLogo}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Categorías" id="basic-nav-dropdown" className="dropdown-menu-custom">
              <NavDropdown.Item as={Link} to="/category/camisetas" className="dropdown-item-custom">
                Camisetas
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/accesorios" className="dropdown-item-custom">
                Accesorios
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/posters" className="dropdown-item-custom">
                Posters
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className={styles.cartIcon}>
            <CartWidget />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;