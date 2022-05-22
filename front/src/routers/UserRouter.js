import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileScreen } from "../components/user/UserProfileScreen";
import { ReferralScreen } from "../components/referral/ReferralScreen";

export const UserRouter = () => {
  return (
    <div>
      <div className="container mx-auto">
        <Switch>
          <Route exact path="/user/profile" component={UserProfileScreen} />
          <Route exact path="/user/referral" component={ReferralScreen} />

          <Redirect to="/home" />
        </Switch>
      </div>
    </div>
  );
};
