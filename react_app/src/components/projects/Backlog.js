import React from "react";
import { Redirect } from "react-router-dom";
import { Button, Container, Row, Col } from 'react-bootstrap';
import FadeIn from 'react-fade-in';
import ModalTemplate from "../ModalTemplate";
import CreateTask from "./tasks/CreateTask";
import ViewTask from "./tasks/ViewTask";
import TaskCard from "./tasks/TaskCard";


class Backlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      modalCreate: false,
      modalView: false,
      taskType: 'New'
    };
  }

  render() {
    return (
      this.props.data.projects.length > 0 ?
        <FadeIn>
          <h3> Backlog </h3>
          <ModalTemplate
            show={this.state.modalCreate}
            onHide={() => this.setState({
              modalCreate: false,
            })}
            title="Create Task"
            component={CreateTask}
            user_id={this.props.data.user.id}
            project_id={this.props.data.project_id}
            team_members={this.props.data.team_members}
            updateTasks={this.props.updateTasks}
            taskType={this.state.taskType}
          />
          <Container>
            <ModalTemplate
              show={this.state.modalView}
              onHide={() => this.setState({modalView: false})}
              title={this.state.task.name}
              component={ViewTask}
              task={this.state.task}
              team_members={this.props.data.team_members}
              updateTasks={this.props.updateTasks}
            />
            <Row>
              <Col lg>
                <FadeIn>
                  <Button
                    variant='info'
                    className='btn-block centered pad-em'
                    onClick={() => this.setState({
                      taskType: 'New',
                      modalCreate: true
                    })}>Create New Task</Button>
                  {this.props.data.backlog_tasks.map(task =>
                    <TaskCard
                      key={task.id}
                      task={task}
                      bg={task.assignee_id === this.props.data.user.id ?
                            'success' : task.assignee_id !== null ?
                            'primary' :
                            ''}
                      onClick={() => this.setState({
                        task: task,
                        modalView: true
                      })}/>
                  )}
              </FadeIn>
              </Col>
            </Row>
          </Container>
        </FadeIn>
      : <Redirect to='teams'></Redirect>
    );
  }
}

export default Backlog;
