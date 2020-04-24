import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import AuthUser from "./auth/AuthUser";
import NewUser from "./auth/NewUser";

import Home from './components/Home';
import Login from './components/accounts/Login';
import SignUp from './components/accounts/SignUp';
import PasswordReset from './components/accounts/PasswordReset';
import Settings from './components/settings/Settings';
import Dashboard from './components/projects/Dashboard';
import Backlog from './components/projects/Backlog';
import CreateProject from './components/projects/CreateProject';

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
        <Route path="/logout" render={this.logout} />
        <Route path="/login" component={NewUser(Login)} />
        <Route path="/signup" component={NewUser(SignUp)} />
        <Route path="/passwordreset" component={NewUser(PasswordReset)} />
        <Route path="/settings" component={AuthUser(Settings)} />
        <Route path="/dashboard" component={AuthUser(Dashboard)} />
        <Route path="/Backlog" component={AuthUser(Backlog)} />
        <Route path="/createproject" component={AuthUser(CreateProject)} />
      </Switch>
    );
  }
}

export default Routes;
