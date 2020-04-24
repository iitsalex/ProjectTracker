import React, { Component } from "react";
import "./Accounts.css";

class PasswordReset extends Component {
  render() {
    return (
      <div className="Login">
        <form>
          <h3>Password Reset</h3>
          <br/>

          <div className="form-group">
            <label>Enter your email address</label>
            <input type="email" className="form-control" placeholder="Enter email for password reset" />
          </div>

          <button type="submit" className="btn btn-primary btn-block">Submit</button>
          <br/>
          <p className="Intructions">
            We will send you an email with instructions on how to reset your password.
          </p>
        </form>
      </div>
    );
  }
}

export default PasswordReset;
