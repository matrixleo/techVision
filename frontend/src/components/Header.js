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
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                   
                </Nav>
                
            </Container>
        </Navbar>
    </div>
  )
}

export default Header