import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap"
class Dashboard extends Component {
  render() {
    return (
      <div>
      <h1>Dashboard</h1>
      <br/>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the content of the card.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      </div>
    );
  }
}

export default Dashboard
