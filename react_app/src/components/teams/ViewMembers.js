import React, {Component} from "react";
import { Button, ListGroup, Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";

import "./Teams.css";

class ViewMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      message: ''
    };
  }

  handleInputChange = (event) => {
    const {value, name} = event.target;
    this.setState({[name]: value});
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/teams/join', {
      method: 'POST',
      body: JSON.stringify({team_id: this.props.team.id, email: this.state.email}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 404) {
        this.setState({
          message: "No such user"
        });
      } else if (res.status === 412) {
        this.setState({
          message: "User is already in this team"
        });
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).then(data => {
      if (data !== undefined) {
        this.props.updateTeamMembers();
        this.props.onHide();
        alert(data.fname + " " + data.lname + " has been added to the team."); // TODO replace with toast
      }
    }).catch(err => {
      console.error(err);
      this.setState({
        message: 'An error occured inviting this user'
      });
    });
  }

  deleteTeam = () => {
    fetch('/api/teams/' + this.props.team.id, {
      method: 'DELETE',
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
        message: 'An error occured deleting this team'
      });
    });
  }

  render() {
    return (
      <div className="ViewMembers wide">
        <p className='pad-em-bottom'>Members:</p>
        <ListGroup as="ul">
          {this.props.members.map(member =>
            member.id === this.props.team.lead_id ?
              <ListGroup.Item as="li" key={member.id} value={member.id} active>
                {member.lname + ", " + member.fname}
              </ListGroup.Item>
              :
              <ListGroup.Item as="li" key={member.id} value={member.id} >
                {member.lname + ", " + member.fname}
              </ListGroup.Item>
          )}
        </ListGroup>

        <Form onSubmit={this.onSubmit} className='wide pad-em centered'>
          <FormGroup>
            <FormLabel className="wide pad-em-bottom text-muted">Invite Team Member:</FormLabel>
            <FormControl type="email" name="email" className='wide' placeholder="Enter Team Member's Email" value={this.state.email} onChange={this.handleInputChange} maxLength="100" autoComplete="off" required="required"/>
          </FormGroup>

          <Button variant='info' type="submit" className="btn-block wide centered">Invite New Member</Button>
        </Form>

        <Button variant='danger' className="btn-block wide centered" onClick={() =>
            window.confirm('Are you sure you want to delete ' + this.props.team.name + '?') ?
            this.deleteTeam() : ''
          }>Delete Team</Button>
        <p>{this.state.message}&nbsp;</p>
      </div>
    );
  }
}

export default ViewMembers;
