import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap"
import "../Projects.css";

class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      teams: [],
      projects: [],
      team_id: '',
      project_id: '',
      projects_enabled: false
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        window.location.href = 'backlog';
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  handleInputChange = (event) => {
    const {value, name} = event.target;
    this.setState({[name]: value});
    fetch('/api/projects/team/' + this.state.team_id).then(res => {
      if (res.status === 200) {
        return('Auth ok');
      } else if (res.status === 401) {
        return('Auth failed');
      }
    }).then(data => this.setState(
      { projects: data,
        projects_enabled: true})
    ).catch(console.error);
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <FormControl as="select" name="team_id" value={this.state.team_id} onChange={this.handleInputChange} maxLength="100" autoComplete="off" required="required">
            {
              this.state.projects.map(project => {
                return <option key={project.id} value={project.id}>{project.name}</option>
              })
            }
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl as="select" name="team_id" placeholder="Enter Team Member's Email" value={this.state.team_id} onChange={this.handleInputChange} maxLength="100" autoComplete="off" required="required">
            {
              this.state.teams.map(team => {
                return <option key={team.id} value={team.id}>{team.name}</option>
              })
            }
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormLabel className="text-muted">Task Name</FormLabel>
          <FormControl
            type="text"
            name="name"
            placeholder="Enter Task Name"
            value={this.state.name}
            onChange={this.handleInputChange}
            maxLength="100"
            autoComplete="off"
            required
          />
        </FormGroup>

        <FormGroup>
          <FormLabel className="text-muted">Task Description</FormLabel>
          <FormControl
            type="text"
            name="description"
            placeholder="Enter Task Description"
            value={this.state.description}
            onChange={this.handleInputChange}
            autoComplete="off"
          />
        </FormGroup>

        <Button type="submit" className="btn-block">Submit</Button>
      </Form>
    );
  }
}

export default CreateTask;
