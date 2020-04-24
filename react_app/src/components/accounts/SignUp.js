import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap"
import { Link } from "react-router-dom";
import "./Accounts.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fname: '',
      lname: ''
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
        window.location.href = 'login';
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
      <div className="Login">
        <Form onSubmit={this.onSubmit}>
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
              required
            />
          </FormGroup>

          <Button type="submit" className="btn-dark btn-block">Submit</Button>
          <Link to="login">Already signed up? Login</Link>
        </Form>
      </div>
    );
  }
}

export default SignUp;