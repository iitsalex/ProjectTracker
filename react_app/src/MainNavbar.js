import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './App.css';

function MainNavbar() {
  return (
    <div className="MainNavbar">
      <Navbar variant="dark" bg="dark" expand="lg">
        <Navbar.Brand href="/home">
          <Link to="/">Pivot</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/teams">Teams</Nav.Link>
            <NavDropdown title="Projects" id="basic-nav-dropdown">
              <NavDropdown.Item href="/sprints">Current Sprints</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/backlog">Backlog</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/settings">Settings</Nav.Link>
          </Nav>
          <Nav.Link href="/login">Login</Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default MainNavbar;
