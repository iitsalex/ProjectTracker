import React, {Component} from "react";
import { Button, ListGroup } from "react-bootstrap";
import "./Teams.css";

class ViewMembers extends Component {
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
      alert('Error logging in please try again');
    });
  }

  render() {
    return (
      <div className="ViewMembers">
        <p className='pad-em'>Members:</p>
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
        <Button variant='danger' className="btn-block centered pad-em" onClick={() =>
            window.confirm('Are you sure you want to delete ' + this.props.team.name + '?') ?
            this.deleteTeam() : ''
          }>Delete</Button>
      </div>
    );
  }
}

export default ViewMembers;
