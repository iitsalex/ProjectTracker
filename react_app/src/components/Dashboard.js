import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { Button, Card, CardColumns, CardHeader, Nav, ListGroup } from "react-bootstrap";
class Dashboard extends Component {
  render() {
    return (
      <div>
      <h1>Dashboard</h1>
      <br/>
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#first">
            <Nav.Item>
              <Nav.Link href="#first">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#disabled" disabled>
                Disabled
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
        <CardColumns>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>As a user I want a working Bootleg Jira</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Sprint 1: 04/22 - 04/28</Card.Subtitle>
              <Card.Text>
                God help this project.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>As a developer, idfk what the fuck im doing</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Sprint 2</Card.Subtitle>
              <Card.Text>
                holy fuck this is ugly but functional?
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </CardColumns>
        </Card.Body>
      </Card>
      </div>
    );
  }
}

export default Dashboard
