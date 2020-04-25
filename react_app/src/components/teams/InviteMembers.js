import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl, FormLabel, Dropdown } from "react-bootstrap"
import "./Teams.css";

class InviteMembers extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      email: '',
      team_id: ''
    };
  }

  componentDidMount() {
    this._isMounted = true;
    fetch('/api/teams/currentuser').then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).then(data => {
      if (this._isMounted) {
        this.setState({ teams: data });
      }
    }).catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('api/teams/currentuser', {
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
          <h3>Invite Team Members</h3>

            <select class="form-control">
              {this.state.teams.map(team => {
              return <option key={team.id}>{team.name}</option>
              })}
            </select>

          <FormGroup>
            <FormLabel className="text-muted">Team Member's Email</FormLabel>
            <FormControl
              type="text"
              name="name"
              placeholder="Enter Team Member's Email"
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
