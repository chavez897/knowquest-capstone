import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ForgotPasswordScreen } from "../components/auth/ForgotPasswordScreen";

import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { ResetPasswordScreen } from "../components/auth/ResetPassword";

export const AuthRouter = () => {
  return (
    <Switch>
      <Route exact path="/auth/login" component={LoginScreen} />
      <Route exact path="/auth/register" component={RegisterScreen} />
      <Route exact path="/auth/forgot-password" component={ForgotPasswordScreen} />
      <Route exact path="/auth/reset-password" component={ResetPasswordScreen} />
      <Redirect to="/auth/login" />
    </Switch>
  );
};
