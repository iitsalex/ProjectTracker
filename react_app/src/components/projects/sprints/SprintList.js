import React from 'react';
import { ListGroup, Card, Button } from 'react-bootstrap';
import FadeIn from 'react-fade-in';

import ModalTemplate from '../../ModalTemplate';
import SprintView from './SprintView';

class SprintList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tasks: [],
      sprint: {name: '', id: ''},
      show_sprint: false,
      first_sprint: true
    };
  }

  completeSprint = () => {
    fetch('/api/sprints/complete/latest', {
      method: 'POST',
      body: JSON.stringify({project_id: this.props.project_id}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        this.props.setMessage('Sprint Completed');
        this.props.updateTasks();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).catch(err => {
      console.error(err);
      this.props.setMessage('An error occured completing this sprint');
    });
  }

  fetchTasks = (sid, sname) => {
    fetch('/api/tasks/sprint/' + sid).then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).then(data => {
      this.props.setMessage('');
      this.setState({
        tasks: data,
        sprint: {name: sname, id: sid},
        show_sprint: true
      });
    }).catch(err => {
      console.error(err);
      this.props.setMessage('An error occured fetching this sprint');
    });
  }

  render () {
    return (
      <FadeIn>
        <h3>Sprints List</h3>
        <Button variant='info' className="btn-block centered pad-em" onClick={() =>
            window.confirm('Are you sure you want to complete the current sprint?') ?
            this.completeSprint() : ''
          }>Complete Sprint</Button>
        <ModalTemplate
          show={this.state.show_sprint}
          onHide={() => this.setState({show_sprint: false})}
          title={this.state.sprint.name}
          user_id={this.props.user_id}
          tasks={this.state.tasks}
          component={SprintView}
          team_members={this.props.team_members}
          updateSprints={this.props.updateSprints}
          updateTasks={this.props.updateTasks}
        />
        <ListGroup horizontal='lg'>
          <FadeIn>
          {this.props.sprints.map((sprint, index) =>
            <Card
              key={sprint.id}
              bg={index === 0 ? 'secondary' : ''}
              onClick={() => this.fetchTasks(sprint.id, sprint.name)}>
              {sprint.name}
              <br/>
              <p className='unpadded text-muted text-small'>
                {sprint.created.substring(0, 10)} - {sprint.ended ? sprint.ended.substring(0, 10) : 'Now'}
              </p>
              <p className='unpadded medium-muted text-small'>Click to view sprint details</p>
            </Card>
          )}
          </FadeIn>
        </ListGroup>
        <p>{this.state.message}&nbsp;</p>
      </FadeIn>
    );
  }
}

export default SprintList;
