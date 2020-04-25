import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import ModalTemplate from "../ModalTemplate";
import CreateTeam from "./CreateTeam";
import InviteMembers from "./InviteMembers";

class Teams extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      show_create: false,
      show_invite: false
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
        <ModalTemplate
          show={this.state.show_create}
          onHide={() => this.setState({show_create: false})}
          title="Create Team"
          component={<CreateTeam/>}
        />
        <Button onClick={() => this.setState({show_create: true})}>Create Team</Button>
        <br/>
        <ModalTemplate
          show={this.state.show_invite}
          onHide={() => this.setState({show_invite: false})}
          title="Invite Members"
          component={<InviteMembers teams={this.state.teams}/>}
        />
        <Button onClick={() => this.setState({show_invite: true})}>Invite Team Members</Button>
      </>
    );
  }
}

export default Teams;
