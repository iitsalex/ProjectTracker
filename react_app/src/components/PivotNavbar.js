import React, { Component } from 'react';
import { FormControl, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ModalTemplate from "./ModalTemplate";
import Login from "./accounts/Login";

class PivotNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      showLogin: false,
    }
  }

  render() {
    if (this.props.data.is_auth) {
      return (
        <div className="PivotNavbar">
          <Navbar variant="dark" bg="dark" expand="sm">
            <Navbar.Brand as={Link} to="/">Pivot</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/teams">Teams</Nav.Link>
                <NavDropdown title="Projects" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/sprints">Current Sprints</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/backlog">Backlog</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/createproject">Create Project</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
              </Nav>
              <FormControl
                as="select"
                name="team_id"
                value={this.props.data.team_id}
                onChange={this.props.handleDataChange}
              >
                {
                  this.props.data.teams.map(team => {
                    return <option key={team.id} value={team.id}>{team.name}</option>
                  })
                }
              </FormControl>
              <FormControl
                as="select"
                name="project_id"
                value={this.props.data.project_id}
                onChange={this.props.handleDataChange}
              >
                {
                  this.props.data.projects.map(project => {
                    return <option key={project.id} value={project.id}>{project.name}</option>
                  })
                }
              </FormControl>
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
