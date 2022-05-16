import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { HomeScreen } from "../components/home/HomeScreen";

import { NavBar } from "../components/ui/NavBar";
import { Footer } from "../components/ui/Footer";
import { Card } from "../components/ui/Card";
import { CardData } from "../components/ui/CardData";
import { Announcenment } from "../components/ui/Announcement";
import { IndexSignUp } from "../components/ui/IndexSignUp";

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
    <IndexSignUp />
    <div className="container">
      <div className="row">
        <div className="col-lg-4"><Card /></div>
        <div className="col-lg-4"><Card /></div>
        <div className="col-lg-4"><Card /></div>
        <div className="col-lg-4"><Card /></div>
        <div className="col-lg-4"><Card /></div>
      </div>
    </div>
    <Announcenment />
    <Footer />
  </div>
  );
};
