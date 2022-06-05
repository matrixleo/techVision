import React from 'react'
import {Navbar , Container, Nav} from 'react-bootstrap'

function Header() {
  return (
    <div>
        <Navbar bg="primary" expand="lg">
            <Container>
                <Navbar.Brand href="#home">techVision</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Nav className="me-auto">
                    <Nav.Link href="/cart"><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                    <Nav.Link href="/login"><i className="fas fa-user"></i> Login</Nav.Link>
                </Nav>
                
            </Container>
        </Navbar>
    </div>
  )
}

export default Header