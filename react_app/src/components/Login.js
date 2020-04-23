import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap"
import "./Login.css";

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
        window.location.href = 'home';
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
              required
            />
          </FormGroup>

          <Button type="submit" className="btn-dark btn-block">Submit</Button>
          <p className="forgot-password">
            <a href="passwordreset">Forgot password?</a>
          </p>
          <p>
            <a href="signup">Sign Up</a>
          </p>
        </Form>
      </div>
    );
  }
}

export default Login;
