import React, { Component } from 'react';
import { ListGroup, Button, Card } from "react-bootstrap";
import FadeIn from 'react-fade-in';
import ModalTemplate from "../ModalTemplate";
import CreateTeam from "./CreateTeam";
import InviteMembers from "./InviteMembers";
import ViewMembers from "./ViewMembers";
import "./Teams.css";

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      team: {name: '', id: ''},
      show_create: false,
      show_invite: false,
      show_team: false
    };
  }

  fetchMembers(tid, tname) {
    fetch('/api/user/team/' + tid).then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).then(data => {
      this.setState({
        members: data,
        team: {name: tname, id: tid},
        show_team: true
      });
    }).catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  render() {
    return (
      <FadeIn>
        <h3>Team List</h3>
        <ModalTemplate
          show={this.state.show_team}
          onHide={() => this.setState({show_team: false})}
          title={this.state.team.name}
          component={ViewMembers}
          team={this.state.team}
          members={this.state.members}
          user_id={this.props.data.user.id}
          updateTeams={this.props.updateTeams}
        />
        <ListGroup horizontal='lg'>
          {this.props.data.teams.map(team =>
            <Card
              key={team.id}
              bg={team.lead_id === this.props.data.user.id ? 'primary' : 'secondary'}
              onClick={() => this.fetchMembers(team.id, team.name)}>
              {team.name}
              <br/>
              <p className='unpadded medium-muted text-small'>Click to view team details</p>
            </Card>
          )}
        </ListGroup>
        <ModalTemplate
          show={this.state.show_create}
          onHide={() => this.setState({show_create: false})}
          title="Create Team"
          component={CreateTeam}
          updateTeams={this.props.updateTeams}
        />
        <br/>
        <Button variant="secondary" className="btn-block btn-center" onClick={() => this.setState({show_create: true})}>
          Create Team
        </Button>
        <ModalTemplate
          show={this.state.show_invite}
          onHide={() => this.setState({show_invite: false})}
          title="Invite Members"
          component={InviteMembers}
          teams={this.props.data.teams}
          updateTeamMembers={this.updateTeamMembers}
        />
        <Button variant="secondary" className="btn-block btn-center" onClick={() => this.setState({show_invite: true})}>
          Invite Team Members
        </Button>
      </FadeIn>
    );
  }
}

export default Teams;
