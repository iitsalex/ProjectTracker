import React from 'react';
import { Card } from 'react-bootstrap';

class TaskCard extends React.Component {
  render () {
    return (
      <Card
        bg={this.props.bg}
        onClick={this.props.onClick}>
        <Card.Body>
          <Card.Title><b>{this.props.task.name}</b></Card.Title>
            <Card.Subtitle className="slight-muted pad-em-bottom text-small">
              {this.props.task.created.substring(0,10)}
              <h5 className="inline white text-muted">/</h5>
              {this.props.task.points} points
            </Card.Subtitle>
          <Card.Text className="slight-muted">
            {this.props.task.description.substring(0,50)}
            {this.props.task.description.length > 50 ? '...' : ''}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default TaskCard;
