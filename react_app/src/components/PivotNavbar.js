import React, { Component } from 'react';
import { FormControl, Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import FadeIn from 'react-fade-in';
import ModalTemplate from "./ModalTemplate";
import Login from "./accounts/Login";
import CreateProject from "./projects/CreateProject";
import "./PivotNavbar.css";

class PivotNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      showLogin: false,
      showCreateProject: false
    }
  }

  authNav = () =>
    <div className="PivotNavbar">
    <Navbar variant="dark" bg="dark" expand="sm">
      <FadeIn>
        <Navbar.Brand as={Link} to="/">Pivot</Navbar.Brand>
      </FadeIn>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {this.props.data.projects.length > 0 ?
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          : ''}
          <Nav.Link as={Link} to="/teams">Teams</Nav.Link>
          {this.props.data.teams.length > 0 ?
            <NavDropdown title="Projects" id="basic-nav-dropdown">
              {this.props.data.projects.length > 0 ?
                <>
                  <NavDropdown.Item as={Link} to="/sprints">Current Sprints</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/backlog">Backlog</NavDropdown.Item>
                  <NavDropdown.Divider />
                </>
              : ''}
            <ModalTemplate
              show={this.state.showCreateProject}
              onHide={() => this.setState({showCreateProject: false})}
              title="Create Project"
              component={CreateProject}
              teams={this.props.data.teams}
              team_id={this.props.data.team_id}
              updateProjects={this.props.updateProjects}
            />
            <NavDropdown.Item onClick={() => this.setState({showCreateProject: true})}>
              Create Project
            </NavDropdown.Item>
            </NavDropdown>
          : ''}
          <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
        </Nav>
        {this.props.data.projects.length > 0 ?
          <>
            <NavItem>Project Select</NavItem>
            <FormControl
              as="select"
              name="project_id"
              value={this.props.data.project_id}
              onChange={this.props.handleDataChange}
              className="select-nav"
            >
              {this.props.data.projects.map(project =>
                <option key={project.id} value={project.id}>{project.name}</option>
              )}
            </FormControl>
          </>
        : ''}
        {this.props.data.teams.length > 0 ?
          <>
            <NavItem>Team Select</NavItem>
            <FormControl
              as="select"
              name="team_id"
              value={this.props.data.team_id}
              onChange={this.props.handleDataChange}
              className="select-nav"
            >
              {this.props.data.teams.map(team =>
                <option key={team.id} value={team.id}>{team.name}</option>
              )}
            </FormControl>
          </>
        : ''}
        <Nav.Link style={{color: "white"}} href="/logout">Logout</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  </div>

  noauthNav = () =>
    <div className="PivotNavbar">
    <Navbar variant="dark" bg="dark" expand="sm">
      <FadeIn>
        <Navbar.Brand as={Link} to="/">Pivot</Navbar.Brand>
      </FadeIn>
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

  render() {
    return this.props.data.is_auth ? this.authNav() : this.noauthNav()
  }
}

export default PivotNavbar;
