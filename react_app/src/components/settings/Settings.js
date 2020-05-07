import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { Form, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap"
import FadeIn from 'react-fade-in';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data.user.id,
      email: this.props.data.user.email,
      password_old: '',
      password: '',
      password_confirm: '',
      fname: this.props.data.user.fname,
      lname: this.props.data.user.lname,
      message: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.password === this.state.password_confirm) {
      fetch('/api/user/info', {
        method: 'PUT',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.status === 200) {
          this.setState({
            message: 'Information updated successfully'
          });
          this.props.updateAuth();
        } else if (res.status === 403) {
          this.setState({
            message: 'Email already in use'
          });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      }).catch(err => {
        console.error(err);
        this.setState({
          message: 'An unknown error occured, try again later'
        });
      });
    } else {
      this.setState({
        message: 'Passwords do not match'
      });
    }
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FadeIn>
          <h3>Update Info</h3>

          <FormGroup>
            <FormLabel className="text-muted">First Name</FormLabel>
            <FormControl
              type="text"
              name="fname"
              placeholder="Enter First Name"
              value={this.state.fname}
              onChange={this.handleInputChange}
              autoComplete="given-name"
              maxLength="50"
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel className="text-muted">Last Name</FormLabel>
            <FormControl
              type="text"
              name="lname"
              placeholder="Enter Last Name"
              value={this.state.lname}
              onChange={this.handleInputChange}
              autoComplete="family-name"
              maxLength="50"
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel className="text-muted">Email address</FormLabel>
            <FormControl
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleInputChange}
              autoComplete="email"
              maxLength="100"
              required
            />
          </FormGroup>

          {/*
          <FormGroup>
            <FormLabel className="text-muted">Old Password</FormLabel>
            <FormControl
              type="password"
              name="password_old"
              placeholder="Enter password"
              value={this.state.password_old}
              onChange={this.handleInputChange}
              autoComplete="password"
              maxLength="60"
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel className="text-muted">New Password</FormLabel>
            <FormControl
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleInputChange}
              autoComplete="password"
              maxLength="60"
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel className="text-muted">Confirm Password</FormLabel>
            <FormControl
              type="password"
              name="password_confirm"
              placeholder="Enter password"
              value={this.state.password_confirm}
              onChange={this.handleInputChange}
              autoComplete="password"
              maxLength="60"
              required
            />
          </FormGroup>
          */}

          <Button type="submit" variant='info' className="btn-block">Submit</Button>
          <p>{this.state.message}&nbsp;</p>
        </FadeIn>
      </Form>
    );
  }
}

export default Settings
