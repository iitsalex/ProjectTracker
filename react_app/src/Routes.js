import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
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
import CreateTeam from './components/teams/CreateTeam';
import Teams from './components/teams/Teams';
import InviteMembers from './components/teams/InviteMembers';

class Routes extends Component {
  logout = () => {
    fetch('/api/user/deauth').then(res => {
      if (res.status !== 200 && res.status !== 401) {
        const error = new Error(res.error);
        throw error;
      }
      this.props.logout();
      window.location.href = '/';
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

        <Route path="/settings" render={ () =>
          this.props.data.is_auth ?
          <Settings data={this.props.data} /> :
          <Home />
        }/>
        <Route path="/dashboard" render={ () =>
          this.props.data.is_auth ?
          <Dashboard data={this.props.data} /> :
          <Home />
        }/>
        <Route path="/teams" render={ () =>
          this.props.data.is_auth ?
          <Teams data={this.props.data} updateTeams={this.props.updateTeams} /> :
          <Home />
        }/>
        <Route path="/backlog" render={ () =>
          this.props.data.is_auth ?
          <Backlog data={this.props.data} /> :
          <Home />
        }/>
        <Route path="/createproject" render={ () =>
          this.props.data.is_auth ?
          <CreateProject data={this.props.data} updateProjects={this.props.updateProjects} /> :
          <Home />
        }/>
      </Switch>
    );
  }
}

export default Routes;
