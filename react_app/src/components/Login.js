import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap"
import "./Login.css";

class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
          email: '',
          password: ''
      }
  }

  submitLogin = (event) => {
    event.preventDefault();
    alert('Authentication coming soon!');
  }

  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.submitLogin}>
          <h3>Sign In</h3>

          <FormGroup>
            <FormLabel>Email address</FormLabel>
            <FormControl type="email" placeholder="Enter email" />
          </FormGroup>

          <FormGroup>
            <FormLabel>Password</FormLabel>
            <FormControl type="password" placeholder="Enter password" />
          </FormGroup>

          <Button type="submit" className="btn-block">Submit</Button>
          <p className="forgot-password text-right">
            <a href="passwordreset">Forgot password?</a>
          </p>
        </Form>
      </div>
    );
  }
}

export default Login;
