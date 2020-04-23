import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import MainNavbar from './MainNavbar';
import Home from './Home';
import Login from './containers/Login'
import SignUp from './containers/SignUp'

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
      </Switch>
    );
  }
}

export default Routes;
