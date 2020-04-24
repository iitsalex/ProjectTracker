import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap"
import { Link } from "react-router-dom";
import AuthUser from "../../auth/AuthUser";

class Teams extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      teams: [],
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

  render() {
    return (
      <>
        <h2>Team List</h2>
        <ul>
          {this.state.teams.map(team => {
            return <li key={team.id}>{team.name}</li>
          })}
        </ul>
        <Link to="createteam">Create Team</Link>
      </>
    );
  }
}

export default Teams;
