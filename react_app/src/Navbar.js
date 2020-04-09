import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import './App.css';

function MainNavbar() {
  return (
      <Navbar variant="dark" bg="dark" expand="lg">
        <Navbar.Brand href="#home">Pivot</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Dashboard</Nav.Link>
            <Nav.Link href="#teams">Teams</Nav.Link>
            <NavDropdown title="Projects" id="basic-nav-dropdown">
              <NavDropdown.Item href="#sprints">Current Sprints</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#backlog">Backlog</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#settings">Settings</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Button href="#login">Login</Button>
        </Navbar.Collapse>
      </Navbar>
  );
}

export default MainNavbar;
