import React, {Component} from "react";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";

class ViewProjectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: props.project,
      name: props.project.name,
      description: props.project.description,
      team_id: props.team_id,
      message: '',
    };
  }

  handleInputChange = (event) => {
    const {value, name} = event.target;
    this.setState({[name]: value});
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/projects/', {
      method: 'PUT',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 404) {
        this.setState({
          message: "TEMP ERROR MESSAGE"
        });
      } else if (res.status === 412) {
        this.setState({
          message: "TEMP ERROR MESSAGE"
        });
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).then(data => {
      if (data !== undefined) {
        this.props.updateProjects();
        this.props.onHide();
        // TODO replace with toast
      }
    }).catch(err => {
      console.error(err);
      this.setState({
        message: 'An error occured updating this project'
      });
    });
  }

  deleteProject = () => {
    fetch('/api/projects/' + this.props.project.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        this.props.updateProjects();
        this.props.onHide();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).catch(err => {
      console.error(err);
      this.setState({
        message: 'An error occured deleting this team'
      });
    });
  }

  render() {
    return (
      <div className="ViewMembers wide">
        <p>Team ID: {this.state.team_id}</p>


      <Form onSubmit={this.onSubmit} className="wide">
        <FormGroup>
          <FormLabel className="text-muted">Project Name</FormLabel>
          <FormControl
            type="text"
            name="name"
            placeholder="how did you manage to put no project name???"
            value={this.state.name}
            onChange={this.handleInputChange}
            maxLength="100"
            autoComplete="off"
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel className="text-muted">Project Description</FormLabel>
          <FormControl
            as="textarea"
            type="text"
            name="description"
            placeholder="Enter Project Name"
            value={this.state.description}
            onChange={this.handleInputChange}
            autoComplete="off"
            rows="5"
            required
          />
        </FormGroup>
        <Button variant='info' type="submit" className="btn-block btn-wide">Update</Button>
        <Button variant='danger' className="btn-block wide centered" onClick={() =>
            window.confirm('Are you sure you want to delete "' + this.props.project.name + '" ?') ?
            this.deleteProject() : ''
          }>Delete Team</Button>
        <p>{this.state.message}&nbsp;</p>
      </Form>
      </div>
    );
  }
}

export default ViewProjectDetails;
