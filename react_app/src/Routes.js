import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import Home from './components/Home';
import SignUp from './components/accounts/SignUp';
import PasswordReset from './components/accounts/PasswordReset';
import Settings from './components/settings/Settings';
import Dashboard from './components/projects/Dashboard';
import Backlog from './components/projects/Backlog';
import Teams from './components/teams/Teams';

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

        <Route path="/signup" render={ () =>
          this.props.data.is_auth ?
          <Redirect to="/403" /> :
          <SignUp data={this.props.data} />
        }/>
        <Route path="/passwordreset" render={ () =>
          this.props.data.is_auth ?
          <Redirect to="/403" /> :
          <PasswordReset data={this.props.data} />
        }/>

        <Route path="/settings" render={ () =>
          this.props.data.is_auth ?
          <Settings data={this.props.data} /> :
          <Redirect to="/401" />
        }/>
        <Route path="/dashboard" render={ () =>
          this.props.data.is_auth ?
          <Dashboard data={this.props.data} updateTasks={this.props.updateTasks} /> :
          <Redirect to="/401" />
        }/>
        <Route path="/teams" render={ () =>
          this.props.data.is_auth ?
          <Teams data={this.props.data} updateTeams={this.props.updateTeams} /> :
          <Redirect to="/401" />
        }/>
        <Route path="/backlog" render={ () =>
          this.props.data.is_auth ?
          <Backlog data={this.props.data} updateTasks={this.props.updateTasks} /> :
          <Redirect to="/401" />
        }/>
      </Switch>
    );
  }
}

export default Routes;
