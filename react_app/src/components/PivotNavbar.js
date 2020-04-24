import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './App.css';

class PivotNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
    }
  }

  componentDidMount() {
    fetch('/api/user/auth').then(res => {
      if (res.status === 200) {
        this.setAuthenticated(true);
      } else if (res.status === 401) {
        this.setAuthenticated(false);
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).catch(err => {
      console.error(err);
      this.setAuthenticated(false);
    });
  }

  setAuthenticated = (val) => {
    this.setState({ isAuthenticated: val });
  }

  authNav = () => {
    if (this.state.isAuthenticated) {
      return (
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
          <Nav.Link style={{color: "white"}} href="/logout">Logout</Nav.Link>
        </Navbar.Collapse>
      )
    } else {
      return (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" />
          <Nav.Link style={{color: "white"}} href="/login">Login</Nav.Link>
        </Navbar.Collapse>
      )
    }
  }

  render() {
    return (
      <div className="MainNavbar">
        <Navbar variant="dark" bg="dark" expand="lg">
          <Navbar.Brand href="/">Pivot</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {this.authNav()}
        </Navbar>
      </div>
    );
  }
}

export default PivotNavbar;
