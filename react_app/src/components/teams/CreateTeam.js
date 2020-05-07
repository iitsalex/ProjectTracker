import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap"

class CreateTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: ''
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
    fetch('/api/teams', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        this.props.updateTeams();
        this.props.onHide();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).catch(err => {
      console.error(err);
      this.setState({
        message: 'An error occured creating this team'
      });
    });
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <FormLabel className="text-muted">Team Name</FormLabel>
          <FormControl
            type="text"
            name="name"
            placeholder="Enter Team Name"
            value={this.state.name}
            onChange={this.handleInputChange}
            maxLength="100"
            autoComplete="off"
            required
          />
        </FormGroup>
        <Button variant='info' type="submit" className="btn-block">Submit</Button>
        <p>{this.state.message}&nbsp;</p>
      </Form>
    );
  }
}

export default CreateTeam;
