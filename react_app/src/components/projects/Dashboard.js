import React, { Component } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(props.data.tasks)
  }
  render() {
    return (
      <Container>
        <Row>
          {this.props.data.tasks.map(taskType => {
            return  <Col lg key={taskType.name}>
                      <h3>{taskType.name}</h3>
                      <div className="task-cards">
                        {taskType.container.map(task => {
                          return  <Card key={task.id}>
                                    <Card.Body>
                                      <Card.Title>{task.name}</Card.Title>
                                      <Card.Text>
                                        {task.description.substring(0,50)}
                                        {task.description.length > 50 ? '...' : ''}
                                      </Card.Text>
                                    </Card.Body>
                                  </Card>
                        })}
                      </div>
                    </Col>
          })}
        </Row>
      </Container>
    );
  }
}

export default Dashboard
