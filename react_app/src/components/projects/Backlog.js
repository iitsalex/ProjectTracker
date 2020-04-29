import React from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import FadeIn from 'react-fade-in';
import ModalTemplate from "../ModalTemplate";
import CreateTask from "./tasks/CreateTask";
import ViewTask from "./tasks/ViewTask";
import TaskCard from "./tasks/TaskCard";


class Backlog extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      modalCreate: false,
      modalView: false,
      task: '',
      taskType: 'New',
      team_members: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    fetch('/api/user/team/' + this.props.data.team_id).then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).then(data => {
      if (this._isMounted) {
        this.setState({team_members: data});
      }
    }).catch(err => {
      console.error(err);
      alert('Error fetching team members');
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
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
          team_members={this.state.team_members}
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
            project_id={this.props.data.project_id}
            team_members={this.state.team_members}
            updateTasks={this.props.updateTasks}
          />
          <Row>
            <Col lg>
              <FadeIn>
                <Button
                  className='btn-block centered pad-em'
                  onClick={() => this.setState({
                    taskType: 'New',
                    modalCreate: true
                  })}>Create New Task</Button>
                {this.props.data.all_tasks.map(task =>
                  (task.status === 'Done' || task.assignee_id !== null) ? '' :
                  <TaskCard
                    key={task.id}
                    task={task}
                    bg={''}
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
    );
  }
}

export default Backlog;
