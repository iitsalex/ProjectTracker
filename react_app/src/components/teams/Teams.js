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
      team: {name: '', id: '', lead_id: ''},
      show_create: false,
      show_invite: false,
      show_team: false,
      message: ''
    };
  }

  fetchMembers(tid, tname, tlead) {
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
        team: {name: tname, id: tid, lead_id: tlead},
        show_team: true
      });
    }).catch(err => {
      console.error(err);
      this.setState({
        message: 'An error occured fetching this team'
      });
    });
  }

  render() {
    return (
      <FadeIn>
        <h3>Team List</h3>
        <ModalTemplate
          show={this.state.show_create}
          onHide={() => this.setState({show_create: false})}
          title="Create Team"
          component={CreateTeam}
          updateTeams={this.props.updateTeams}
        />
        <ModalTemplate
          show={this.state.show_invite}
          onHide={() => this.setState({show_invite: false})}
          title="Invite Members"
          component={InviteMembers}
          teams={this.props.data.teams}
          updateTeamMembers={this.props.updateTeamMembers}
        />
        <ModalTemplate
          show={this.state.show_team}
          onHide={() => this.setState({show_team: false})}
          title={this.state.team.name}
          component={ViewMembers}
          team={this.state.team}
          members={this.state.members}
          updateTeams={this.props.updateTeams}
        />
        <Button variant="info" className='btn-block centered pad-em' onClick={() => this.setState({show_create: true})}>
          Create Team
        </Button>
        <Button variant="secondary" className='btn-block centered pad-em' onClick={() => this.setState({show_invite: true})}>
          Invite Team Members
        </Button>
        <ListGroup horizontal='lg'>
          {this.props.data.teams.map(team =>
            <Card
              key={team.id}
              bg={team.lead_id === this.props.data.user.id ? 'primary' : 'secondary'}
              onClick={() => this.fetchMembers(team.id, team.name, team.lead_id)}>
              {team.name}
              <br/>
              <p className='unpadded medium-muted text-small'>Click to view team details</p>
            </Card>
          )}
        </ListGroup>
        <p>{this.state.message}&nbsp;</p>
      </FadeIn>
    );
  }
}

export default Teams;
