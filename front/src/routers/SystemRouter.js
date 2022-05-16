import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { HomeScreen } from "../components/home/HomeScreen";

import { NavBar } from "../components/ui/NavBar";
import { Footer } from "../components/ui/Footer";

export const SystemRouter = () => {
  return (
  <div>
    <NavBar />
    <div className="container mx-auto">
      <Switch>
        <Route exact path="/home" component={HomeScreen} />

        <Redirect to="/home" />
      </Switch>
    </div>
    <Footer />
  </div>
  );
};
