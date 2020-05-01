import React, { Component } from "react";
import FadeIn from 'react-fade-in';
import { Form, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap"

import ModalTemplate from '../ModalTemplate';
import Login from './Login';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      email: '',
      password: '',
      fname: '',
      lname: '',
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
    fetch('/api/user/create', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        window.location.href = '/';
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
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FadeIn>
          <h3>Sign Up</h3>

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

          <FormGroup>
            <FormLabel className="text-muted">Password</FormLabel>
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

          <Button type="submit" variant='info' className="btn-block">Submit</Button>

          <ModalTemplate
            show={this.state.showLogin}
            onHide={() => this.setState({showLogin: false})}
            title="Sign In"
            component={Login}
            updateAuth={this.props.updateAuth}
          />
          <Button variant='secondary' className='btn-block' onClick={() => this.setState({showLogin: true})}>Already signed up? Login</Button>
          <p>{this.state.message}&nbsp;</p>
        </FadeIn>
      </Form>
    );
  }
}

export default SignUp;
