import React, { useState, Component } from "react";
import { Button, FormGroup, FormControl, FormLabel, FormCheck } from "react-bootstrap";
import "./Login.css";

class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
          username: '',
          password: ''
      }
  }

  // function validateForm() {
  //     return email.length > 0 && password.length > 0;
  // }
  //
  // function handleSubmit(event) {
  //   event.preventDefault();
  // }
  // function handleClick(e) {
  //   e.preventDefault();
  //   console.log('The link was clicked.');
  // }

  render() {
    return (
      <div className="Login">
        <form>
          <h3>Sign In</h3>

          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Submit</button>
          <p className="forgot-password text-right">
            Forgot <a href="passwordreset">password?</a>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
