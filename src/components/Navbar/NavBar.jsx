import { useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CartWidget from '../CartWidget';
import styles from './NavBar.module.css';

function NavBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products/category-list')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <Navbar expand="lg" className={styles.navbar} variant="dark" fixed="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img 
            src="https://i.ibb.co/r2pQ5CN5/logonuevo.png" 
            alt="Logo" 
            className={styles.brandLogo}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown 
              title="Categorías" 
              id="basic-nav-dropdown" 
              menuVariant="dark"
              className={styles.dropdownMenu}
            >
              {categories.map(cat => (
                <NavDropdown.Item 
                  key={cat}
                  as={NavLink}
                  to={`/category/${cat}`}
                  className={styles.dropdownItem}
                >
                  {cat.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </NavDropdown.Item>
              ))}
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