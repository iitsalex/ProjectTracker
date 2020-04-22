import React from "react";
import { Route, Switch } from "react-router-dom";

import MainNavbar from './MainNavbar';
import Home from './Home';
import Login from './containers/Login'
import SignUp from './containers/SignUp'
import PasswordReset from './containers/PasswordReset'

function Routes() {
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
    </Switch>
  );
}

export default Routes;
