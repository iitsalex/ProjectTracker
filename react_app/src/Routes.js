import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import MainNavbar from './MainNavbar';
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

  setAuthenticated = (isAuthenticated) => {
    this.setState({isAuthenticated});
  }

  render () {
    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/passwordreset">
          <PasswordReset />
        </Route>
        <Route exact path="/settings">
          <Settings />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    );
  }
}

export default Routes;
