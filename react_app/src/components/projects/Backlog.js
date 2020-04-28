import React from "react";
import { Button, Container, Row, Col, Card } from 'react-bootstrap'
import ModalTemplate from "../ModalTemplate";
import CreateTask from "./tasks/CreateTask";

class Backlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    };
  }
// this.props.data.tasks
  render() {
    return (
      <div>
        <h3> Backlog </h3>
        <>
          <Button variant="primary" onClick={() => this.setState({modalShow: true})}>
            Create Task
          </Button>

          <ModalTemplate
            show={this.state.modalShow}
            onHide={() => this.setState({modalShow: false})}
            title="Create Task"
            component={CreateTask}
            project_id={this.props.data.project_id}
            updateTasks={this.props.updateTasks}
          />
      </>
      <Container>
        <Row>
          <Col lg>
            {this.props.data.all_tasks.reverse().map(task =>
              task.status === 'Done' ? '' :
                <Card key={task.id}>
                  <Card.Body>
                    <Card.Title><b>{task.name}</b></Card.Title>
                    <Card.Subtitle>Task Number: {task.id}</Card.Subtitle>
                    <Card.Text>
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
