import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileScreen } from "../components/user/UserProfileScreen";

export const UserRouter = () => {
  return (
    <div>
      <div className="container mx-auto">
        <Switch>
          <Route exact path="/user/profile" component={UserProfileScreen} />

          <Redirect to="/home" />
        </Switch>
      </div>
    </div>
  );
};
