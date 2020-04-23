import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PasswordReset from './components/PasswordReset';
import Settings from './components/Settings';
import Dashboard from './components/Dashboard';

class Routes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
    }
  }

  componentDidMount() {
    fetch('/api/user/auth').then(res => {
      if (res.status === 200) {
        this.state.isAuthenticated = true;
      } else if (res.status === 401) {
        this.state.isAuthenticated = false;
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  setAuthenticated = (isAuthenticated) => {
    this.setState({isAuthenticated});
  }

  render () {

    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/passwordreset" component={PasswordReset} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    );
  }
}

export default Routes;
