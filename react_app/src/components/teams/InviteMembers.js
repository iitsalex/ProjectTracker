import React, {Component} from "react";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Dropdown
} from "react-bootstrap"
import "./Teams.css";

class InviteMembers extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      email: '',
      team_id: '',
      message: ''
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
        this.setState({teams: data});
        this.setState({team_id: data[0].id})
      }
    }).catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleInputChange = (event) => {
    const {value, name} = event.target;
    this.setState({[name]: value});
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/teams/join', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        window.location.href = 'teams';
      } else if (res.status === 404) {
        this.setState({message: "No such user"})
      } else if (res.status === 412) {
        this.setState({message: "Invalid Team"})
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
    return (<div className="InviteMembers">
      <Form onSubmit={this.onSubmit}>
        <h3>Invite Team Members</h3>
        <br/>

        <br/>
        <FormGroup>
          <FormControl as="select" name="team_id" placeholder="Enter Team Member's Email" value={this.state.team_id} onChange={this.handleInputChange} maxLength="100" autoComplete="off" required="required">
            {
              this.state.teams.map(team => {
                return <option key={team.id} value={team.id}>{team.name}</option>
              })
            }
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormLabel className="text-muted">Team Member's Email</FormLabel>
          <FormControl type="email" name="email" placeholder="Enter Team Member's Email" value={this.state.email} onChange={this.handleInputChange} maxLength="100" autoComplete="off" required="required"/>
        </FormGroup>

        <Button type="submit" className="btn-dark btn-block">Submit</Button>
        <p>{this.state.message}</p>
      </Form>
    </div>);
  }
}

export default InviteMembers;
