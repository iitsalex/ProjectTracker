import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl, FormLabel, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
    fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        this.props.onHide();
        window.location.href = 'teams';
      } else if (res.status === 401) {
        this.setState({
          message: 'Invalid username or password'
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

        <Button type="submit" variant='info' className="btn-block">Log In</Button>
        <Row>
          <Col>
            <Link to="passwordreset" onClick={this.props.onHide} className="forgot-password">Forgot password?</Link>
          </Col>
          <Col>
            <div align="right">
              <Link to="signup" onClick={this.props.onHide}>Sign Up</Link>
            </div>
          </Col>
        </Row>
        <p>{this.state.message}&nbsp;</p>
      </Form>
    );
  }
}

export default Login;
