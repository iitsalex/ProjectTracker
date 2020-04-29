import React, { Component } from "react";
import { Container, Card, Col, Row, Button } from "react-bootstrap";
import FadeIn from 'react-fade-in';
import ModalTemplate from "../ModalTemplate";
import ViewTask from "./tasks/ViewTask";
import CreateTask from "./tasks/CreateTask";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      show_task: false,
    }
  }

  render() {
    return (
      <FadeIn>
        <Button variant="primary" onClick={() => this.setState({modalCreate: true})}>
          Create Task
        </Button>
        <ModalTemplate
          show={this.state.modalCreate}
          onHide={() => this.setState({modalCreate: false})}
          title="Create Task"
          component={CreateTask}
          user_id={this.props.data.user.id}
          project_id={this.props.data.project_id}
          team_members={this.props.data.team_members}
          updateTasks={this.props.updateTasks}
        />
        <Container>
          <ModalTemplate
            show={this.state.show_task}
            onHide={() => this.setState({show_task: false})}
            title={this.state.task.name}
            component={ViewTask}
            task={this.state.task}
            project_id={this.props.data.project_id}
            team_members={this.props.data.team_members}
            updateTasks={this.props.updateTasks}
          />
          <Row>
            {this.props.data.tasks.map(taskType =>
              <Col lg key={taskType.name}>
                <h3>{taskType.name}</h3>
                <div className="task-cards">
                  <FadeIn>
                    {taskType.container.map(task =>
                      <Card
                        key={task.id}
                        bg={task.assignee_id === this.props.data.user.id ?
                              'success' : task.assignee_id === null ?
                              'secondary' :
                              'primary'}
                        onClick={() => this.setState({
                          task: task,
                          show_task: true
                        })}>
                        <Card.Body>
                          <Card.Title>{task.name}</Card.Title>
                            <Card.Subtitle className="text-muted pad-em-bottom">Date Created: {task.created.substring(0,10)}</Card.Subtitle>
                            <Card.Text className="slight-muted">
                              {task.description.substring(0,50)}
                              {task.description.length > 50 ? '...' : ''}
                            </Card.Text>
                        </Card.Body>
                      </Card>
                    )}
                  </FadeIn>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </FadeIn>
    );
  }
}

export default Dashboard
