import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { Card, Table } from "react-bootstrap";

class Dashboard extends Component {

  // may need a cardCreate function up here that is passed below in order
  //to pass in a list of cards
  render() {
    return (
      <div>
      <h1>Dashboard</h1>
      <br/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>New</th>
            <th>In Progress</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          <tr>

            <td>
              <Card>
                <Card.Body>
                  <Card.Title>As a user I want a working Bootleg Jira</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Sprint 1: 04/22 - 04/28</Card.Subtitle>
                  <Card.Text>
                    God help this project.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>As a user I want a working Bootleg Jira</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Sprint 1: 04/22 - 04/28</Card.Subtitle>
                  <Card.Text>
                    God help this project.
                  </Card.Text>
                </Card.Body>
              </Card>
            </td>

            <td>
              <Card>
                <Card.Body>
                  <Card.Title>As a user I want a working Bootleg Jira</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Sprint 1: 04/22 - 04/28</Card.Subtitle>
                  <Card.Text>
                    God help this project.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>As a user I want a working Bootleg Jira</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Sprint 1: 04/22 - 04/28</Card.Subtitle>
                  <Card.Text>
                    God help this project.
                  </Card.Text>
                </Card.Body>
              </Card>
            </td>

            <td>
              <Card>
                <Card.Body>
                  <Card.Title>As a user I want a working Bootleg Jira</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Sprint 1: 04/22 - 04/28</Card.Subtitle>
                  <Card.Text>
                    God help this project.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>As a user I want a working Bootleg Jira</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Sprint 1: 04/22 - 04/28</Card.Subtitle>
                  <Card.Text>
                    God help this project.
                  </Card.Text>
                </Card.Body>
              </Card>
            </td>
          </tr>
        </tbody>
      </Table>
      </div>
    );
  }
}

export default Dashboard
