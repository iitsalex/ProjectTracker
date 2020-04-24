import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap"
import { Link } from "react-router-dom";
import "./Accounts.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
    fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        window.location.href = 'dashboard';
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
          <h3>Sign In</h3>

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
          <Link to="passwordreset" className="forgot-password">Forgot password?</Link>
          <br/>
          <Link to="signup">Sign Up</Link>
        </Form>
      </div>
    );
  }
}

export default Login;
