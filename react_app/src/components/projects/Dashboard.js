import React, { Component } from "react";
import { Container, CardColumns, Card, Col, Row } from "react-bootstrap";

class Dashboard extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      newTasks: [],
      ipTasks: [],
      doneTasks: []
    }
  }

  componentDidMount() {
    this._isMounted = true;
    fetch('/api/tasks/project/' + this.props.data.project_id).then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).then(data => {
      this.distributeTasks(data);
    }).catch(console.error);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  distributeTasks = (data) => {
    let newArr = [];
    let ipArr = [];
    let doneArr = [];
    data.forEach((task, i) => {
      switch (task.status) {
        case 'New':
          newArr.push(task);
          break;
        case 'In Progess':
          ipArr.push(task);
          break;
        case 'Done':
          doneArr.push(task);
          break;
      }
    });
    if (this._isMounted) {
      this.setState({
        newTasks: newArr,
        ipTasks: ipArr,
        doneTasks: doneArr
      });
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col lg>
            <h3>New</h3>
            <div class="task-cards">
              {this.state.newTasks.map(task => {
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
          <Col lg>
            <h3>In Progress</h3>
            <div class="task-cards">
              {this.state.ipTasks.map(task => {
                return  <Card key={task.id}>
                          <Card.Body>
                            <Card.Title>{task.name}</Card.Title>
                            <Card.Text>
                              {task.description}
                            </Card.Text>
                          </Card.Body>
                        </Card>
              })}
            </div>
          </Col>
          <Col lg>
            <h3>Done</h3>
            <div class="task-cards">
              {this.state.doneTasks.map(task => {
                return  <Card key={task.id}>
                          <Card.Body>
                            <Card.Title>{task.name}</Card.Title>
                            <Card.Text>
                              {task.description}
                            </Card.Text>
                          </Card.Body>
                        </Card>
              })}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard
