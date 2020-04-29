import React, { Component } from "react";

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'We will send you an email with instructions on how to reset your password.'
    };
  }

  render() {
    return (
      <div className="Login">
        <form>
          <h3>Password Reset</h3>

          <div className="form-group">
            <label>Enter your email address</label>
            <input type="email" className="form-control" placeholder="Enter email for password reset" />
          </div>

          <button type="submit" className="btn btn-info btn-block">Submit</button>
          <br/>
          <p className="Intructions">
            {this.state.message}
          </p>
        </form>
      </div>
    );
  }
}

export default PasswordReset;
