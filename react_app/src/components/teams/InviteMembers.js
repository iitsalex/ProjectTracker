import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap"
import "./Teams.css";

class InviteMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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
        window.location.href = 'teams';
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  render() {
    return (
      <div className="InviteMembers">
        <Form onSubmit={this.onSubmit}>
          <h3>Create Team</h3>

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

          <Button type="submit" className="btn-dark btn-block">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default InviteMembers;
