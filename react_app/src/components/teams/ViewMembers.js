import React, {Component} from "react";
import {ListGroup} from "react-bootstrap";
import "./Teams.css";

class ViewMembers extends Component {
  _isMounted = false;

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
        this.setState({members: data});
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
    return (<div className="ViewMembers">
      <ListGroup>
        {this.state.members.map(member =>
          <ListGroup.Item key={member.id} value={member.id}>
            {member.lname + ", " + member.fname}
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>);
  }
}

export default ViewMembers;
