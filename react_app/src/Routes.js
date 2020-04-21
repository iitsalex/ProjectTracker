import React from "react";
import { Route, Switch } from "react-router-dom";

import MainNavbar from './MainNavbar';
import Dump from './Dump';
import Login from './containers/Login'
import SignUp from './containers/SignUp'

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Dump />
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

export default Routes;
