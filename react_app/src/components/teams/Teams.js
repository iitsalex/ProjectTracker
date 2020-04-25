import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap"

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
            return  <Card key={team.id}>
                      <Card.Title>{team.name}</Card.Title>
                      <Card.Link href="#"> View Team Members</Card.Link>
                    </Card>
          })}
        </ul>
        <Link to="createteam">Create Team</Link>
        <br/>
        <Link to="invitemembers">Invite Team Members</Link>
      </>
    );
  }
}

export default Teams;
