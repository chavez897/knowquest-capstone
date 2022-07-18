import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileScreen } from "../components/user/UserProfileScreen";
import { ReferralScreen } from "../components/referral/ReferralScreen";
import { RateBookScreen } from "../components/rate/RateBookScreen";
import { ListOwnReviewsScreen } from "../components/user/ListOwnReviewsScreen";
import { ListResourceReviewScreen } from "../components/user/ListResourceReviewScreen";
import { RateResourceScreen } from "../components/resource/RateResourceScreen";

export const UserRouter = () => {
  return (
    <div>
      <div className="container mx-auto">
        <Switch>
          <Route exact path="/user/profile" component={UserProfileScreen} />
          <Route exact path="/user/referral" component={ReferralScreen} />
          <Route exact path="/user/ratebook" component={RateBookScreen} />
          <Route exact path="/user/rateresource" component={RateResourceScreen} />
          <Route exact path="/user/my-ratings" component={ListOwnReviewsScreen} />
          <Route exact path="/user/rc-ratings" component={ListResourceReviewScreen} />
          <Redirect to="/home" />
        </Switch>
      </div>
    </div>
  );
};
