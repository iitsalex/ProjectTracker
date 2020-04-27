import React, {Component} from "react";
import {Form, Button, FormGroup, FormControl, FormLabel, ListGroup} from "react-bootstrap";
import "./Teams.css";

class ViewMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    fetch('/api/user/team/' + this.props.team_id).then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).then(data => {
      if (this._isMounted) {
        this.setState({ members: data });
      }
    }).catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  render() {
    return (<div className="ViewMembers">
            <ListGroup>
              <ListGroup.Item>
                {
                  this.state.members.map(member => {
                    return <ListGroup.Item key={member.id} value={member.id}>{member.name}</ListGroup.Item>
                  })
                }
              </ListGroup.Item>
            </ListGroup>
    </div>);
  }
}

export default ViewMembers;
