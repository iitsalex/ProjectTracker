import React, { Component } from "react";
import { Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Button, Container, Grid, FormControlLabel, TextField } from '@material-ui/core';
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
        this.props.onHide();
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
      <Container component="main" maxWidth="xs">
        <div>
          <form noValidate onSubmit={this.onSubmit}>
            <TextField
              value={this.state.email}
              onChange={this.handleInputChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={this.state.password}
              onChange={this.handleInputChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/passwordreset" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default Login;
