import React from 'react'
import {Navbar , Container, Nav} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Header() {
  return (
    <div>
        <Navbar bg="primary" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>techVision</Navbar.Brand>
              </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />  
                <Nav className="me-auto">
                <LinkContainer to="/cart">
                    <Nav.Link ><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/login">
                    <Nav.Link ><i className="fas fa-user"></i> Login</Nav.Link>
                  </LinkContainer>
                </Nav>
                
            </Container>
        </Navbar>
    </div>
  )
}

export default Header