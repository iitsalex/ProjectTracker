import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import AuthUser from "./AuthUser";

import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PasswordReset from './components/PasswordReset';
import Settings from './components/Settings';
import Dashboard from './components/Dashboard';

class Routes extends Component {
  logout = () => {
    console.log('test')
    fetch('/api/user/deauth').then(res => {
      if (res.status !== 200 && res.status !== 401) {
        const error = new Error(res.error);
        throw error;
      }
      window.location.href = 'login';
    }).catch(err => {
      console.error(err);
    });
  }

  render () {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/logout" render={this.logout} />
        <Route path="/passwordreset" component={PasswordReset} />
        <Route path="/settings" component={AuthUser(Settings)} />
        <Route path="/dashboard" component={AuthUser(Dashboard)} />
      </Switch>
    );
  }
}

export default Routes;
