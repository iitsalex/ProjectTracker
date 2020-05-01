import React, { Component } from "react";
import FadeIn from 'react-fade-in';

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'We will send you an email with instructions on how to reset your password.'
    };
  }

  render() {
    return (
      <form>
        <FadeIn>
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
        </FadeIn>
      </form>
    );
  }
}

export default PasswordReset;
