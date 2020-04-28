import React from "react";
import { Button, Container, Row, Col, Card } from 'react-bootstrap'
import ModalTemplate from "../ModalTemplate";
import CreateTask from "./tasks/CreateTask";
import ViewTask from "./tasks/ViewTask";


class Backlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalCreate: false,
      modalView: false,
      task: ''
    };
  }
// this.props.data.tasks
  render() {
    return (
      <div>
        <h3> Backlog </h3>
        <>
          <Button variant="primary" onClick={() => this.setState({modalCreate: true})}>
            Create Task
          </Button>

          <ModalTemplate
            show={this.state.modalCreate}
            onHide={() => this.setState({modalCreate: false})}
            title="Create Task"
            component={CreateTask}
            project_id={this.props.data.project_id}
            updateTasks={this.props.updateTasks}
          />
      </>
      <Container>
        <ModalTemplate
          show={this.state.modalView}
          onHide={() => this.setState({modalView: false})}
          title={this.state.task.name}
          component={ViewTask}
          task={this.state.task}
          project_id={this.props.data.project_id}
          updateTasks={this.props.updateTasks}
        />
        <Row>
          <Col lg>
            {this.props.data.all_tasks.map(task =>
              task.status === 'Done' ? '' :
                <Card key={task.id} onClick={() => this.setState({
                    task: task,
                    modalView: true
                  })}>
                  <Card.Body>
                    <Card.Title><b>{task.name}</b></Card.Title>
                    <Card.Subtitle className="text-muted pad-em-bottom">Date Created: {task.created.substring(0,10)}</Card.Subtitle>
                    <Card.Text className="slight-muted">
                      {task.description.substring(0,50)}
                      {task.description.length > 50 ? '...' : ''}
                    </Card.Text>
                  </Card.Body>
                </Card>
            )}
          </Col>
        </Row>
      </Container>
  </div>
    );
  }
}

export default Backlog;
