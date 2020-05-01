import React from 'react';
import { ListGroup } from 'react-bootstrap';

class SprintView extends React.Component {
  render () {
    return (
      <div>
        <p className='pad-em'>Tasks:</p>
        <ListGroup as="ul">
          {this.props.tasks.map(task =>
            task.assignee_id === this.props.user_id ?
              <ListGroup.Item as="li" key={task.id} value={task.id} active>
                {task.name + ' / ' + task.points} points
              </ListGroup.Item>
              :
              <ListGroup.Item as="li" key={task.id} value={task.id} >
                {task.name + ' / ' + task.points} points
              </ListGroup.Item>
          )}
        </ListGroup>
      </div>
    );
  }
}

export default SprintView;
