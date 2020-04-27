import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ListGroup, Card, Button, Spinner } from "react-bootstrap";
import ModalTemplate from "../ModalTemplate";
import CreateTeam from "./CreateTeam";
import InviteMembers from "./InviteMembers";
import ViewMembers from "./ViewMembers";
import "./Teams.css";

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_create: false,
      show_invite: false,
      show_team: false
    };
  }

  render() {
    return (
      <>
        <h2>Team List</h2>
        <ListGroup horizontal='lg'>
          {this.props.data.teams.map(team => {
            return  <ListGroup.Item key={team.id}>
                        {team.name}
                        <br/>
                          <ModalTemplate
                            show={this.state.show_team}
                            onHide={() => this.setState({show_team: false})}
                            title="Members List"
                            component={ViewMembers}
                            team_id={team.id}
                          />
                        <Button onClick={() => this.setState({show_team: true})}>View Team Members</Button>
                    </ListGroup.Item>
          })}
        </ListGroup>
        <ModalTemplate
          show={this.state.show_create}
          onHide={() => this.setState({show_create: false})}
          title="Create Team"
          component={CreateTeam}
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
      />
      <Button variant="secondary" className="btn-block btn-center" onClick={() => this.setState({show_invite: true})}>
        Invite Team Members
      </Button>
      </>
    );
  }
}

export default Teams;
