import React from 'react';
import { ListGroup, Card } from 'react-bootstrap';
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

  fetchTasks = (sid, sname) => {
    fetch('/api/tasks/sprint/' + sid).then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).then(data => {
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

  firstSprint = () => {
    if (this.state.first_sprint) {
      return true;
    } else {
      this.setState({ first_sprint: false });
      return false;
    }
  }

  render () {
    return (
      <FadeIn>
        <h3>Team List</h3>
        <ModalTemplate
          show={this.state.show_sprint}
          onHide={() => this.setState({show_sprint: false})}
          title={this.state.sprint.name}
          user_id={this.props.user_id}
          tasks={this.state.tasks}
          component={SprintView}
          updateSprints={this.props.updateSprints}
        />
        <ListGroup horizontal='lg'>
          <FadeIn>
          {this.props.sprints.map(sprint =>
            <Card
              key={sprint.id}
              bg={this.firstSprint() ? 'primary' : 'secondary'}
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
