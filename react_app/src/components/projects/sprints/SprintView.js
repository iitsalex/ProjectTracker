import React from 'react';
import { ListGroup } from 'react-bootstrap';

import ModalTemplate from '../../ModalTemplate';
import ViewTask from '../tasks/ViewTask';

class SprintView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      modalView: false
    };
  }

  render () {
    return (
      <div>
        <p className='pad-em'>Tasks:</p>
        <ModalTemplate
          show={this.state.modalView}
          onHide={() => this.setState({modalView: false})}
          title={this.state.task.name}
          component={ViewTask}
          task={this.state.task}
          team_members={this.props.team_members}
          updateTasks={this.props.updateTasks}
        />
        <ListGroup as="ul">
          {this.props.tasks.map(task =>
            task.assignee_id === this.props.user_id ?
              <ListGroup.Item
                as="li"
                key={task.id}
                value={task.id}
                onClick={() => this.setState({
                  task: task,
                  modalView: true
                })}
                active>
                {task.name + ' / ' + task.points} points
              </ListGroup.Item>
              :
              <ListGroup.Item
                as="li"
                key={task.id}
                value={task.id}
                onClick={() => this.setState({
                  task: task,
                  modalView: true
                })}>
                {task.name + ' / ' + task.points} points
              </ListGroup.Item>
          )}
        </ListGroup>
      </div>
    );
  }
}

export default SprintView;
