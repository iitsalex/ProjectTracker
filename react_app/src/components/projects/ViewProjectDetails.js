import React, {Component} from "react";
import { Button } from "react-bootstrap";

class V extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      message: '',
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
        this.props.updateProjects();
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

  deleteProject = () => {
    fetch('/api/projects/' + this.props.project.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        this.props.updateProjects();
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
        <p className='pad-em-bottom'>Project Created: {this.props.project.created.substring(0,10)}</p>
        <p className='pad-em-bottom'>Description: {this.props.project.description}</p>
        <p></p>

        <Button variant='danger' className="btn-block wide centered" onClick={() =>
            window.confirm('Are you sure you want to delete "' + this.props.project.name + '" ?') ?
            this.deleteProject() : ''
          }>Delete Team</Button>
        <p>{this.state.message}&nbsp;</p>
      </div>
    );
  }
}

export default V;
