import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { LoginScreen } from "../components/auth/LoginScreen";

export const AuthRouter = () => {
  return (
    <Switch>
      <Route exact path="/auth/login" component={LoginScreen} />

      <Redirect to="/auth/login" />
    </Switch>
  );
};
