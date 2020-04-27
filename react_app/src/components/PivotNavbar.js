import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import ModalTemplate from "./ModalTemplate";
import Login from "./accounts/Login";

class PivotNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      showLogin: false
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

  render() {
    if (this.state.isAuthenticated) {
      return (
        <div className="PivotNavbar">
          <Navbar variant="dark" bg="dark" expand="sm">
            <Navbar.Brand href="/">Pivot</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/teams">Teams</Nav.Link>
                <NavDropdown title="Projects" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/sprints">Current Sprints</NavDropdown.Item>
                  <NavDropdown.Item href="/backlog">Backlog</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/createproject">Create Project</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/settings">Settings</Nav.Link>
              </Nav>
              <Nav.Link style={{color: "white"}} href="/logout">Logout</Nav.Link>
            </Navbar.Collapse>
          </Navbar>
        </div>
      )
    } else {
      return (
        <div className="MainNavbar">
          <Navbar variant="dark" bg="dark" expand="sm">
            <Navbar.Brand href="/">Pivot</Navbar.Brand>
            <Nav className="mr-auto" />
            <ModalTemplate
              show={this.state.showLogin}
              onHide={() => this.setState({showLogin: false})}
              title="Sign In"
              component={Login}
            />
            <Nav.Link style={{color: "white"}} onClick={() => this.setState({showLogin: true})}>
              Login
            </Nav.Link>
          </Navbar>
        </div>
      )
    }
  }
}

export default PivotNavbar;
