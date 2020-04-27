import React, { Component } from "react";
import { CardColumns, Card, Col } from "react-bootstrap";

class Dashboard extends Component {
  _isMounted = false;

  constructor() {
    super();
    //Set default message
    this.state = {
      tasks: [],
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
      if (this._isMounted) {
        this.setState({ tasks: data }, this.distributeTasks());
      }
    }).catch(console.error);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  distributeTasks = () => {
    for (const task in this.tasks) {
      switch (task.status) {
        case 'New':
          this.newTasks.push(task);
          break;
        case 'In Progess':
          this.ipTasks.push(task);
          break;
        case 'Done':
          this.doneTasks.push(task);
          break;
      }
    }
  }

  render() {
    return (
      <>
        <CardColumns>
          {this.state.newTasks.map(task => {
            return  <Card>
                      <Card.Body>
                        <Card.Title>{task.name}</Card.Title>
                        <Card.Text>
                          {task.description}
                        </Card.Text>
                      </Card.Body>
                    </Card>
          })}
        </CardColumns>
        <CardColumns>
          {this.state.ipTasks.map(task => {
            return  <Card>
                      <Card.Body>
                        <Card.Title>{task.name}</Card.Title>
                        <Card.Text>
                          {task.description}
                        </Card.Text>
                      </Card.Body>
                    </Card>
          })}
        </CardColumns>
        <CardColumns>
          {this.state.doneTasks.map(task => {
            return  <Card>
                      <Card.Body>
                        <Card.Title>{task.name}</Card.Title>
                        <Card.Text>
                          {task.description}
                        </Card.Text>
                      </Card.Body>
                    </Card>
          })}
        </CardColumns>
      </>
    );
  }
}

// Put the thing into the DOM!
export default Dashboard
