import React, { Component } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";

class Dashboard extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      tasks: props.data.tasks,
      newTasks: [],
      ipTasks: [],
      doneTasks: []
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.distributeTasks(this.props.data.tasks);
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
        default:
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
          {[
            {name: 'New', container: this.state.newTasks},
            {name: 'In Progress', container: this.state.ipTasks},
            {name: 'Done', container: this.state.doneTasks}
          ].map(taskType => {
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
