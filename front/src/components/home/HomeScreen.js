import React from "react";
import { Card } from "../ui/Card";
import { CardData } from "../ui/CardData";
import { Announcenment } from "../ui/Announcement";
import { IndexSignUp } from "../ui/IndexSignUp";

export const HomeScreen = () => {
  return (
    <div className="container-fluid">
      <IndexSignUp />
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <Card />
          </div>
          <div className="col-lg-4">
            <Card />
          </div>
          <div className="col-lg-4">
            <Card />
          </div>
          <div className="col-lg-4">
            <Card />
          </div>
          <div className="col-lg-4">
            <Card />
          </div>
        </div>
      </div>
      <Announcenment />
    </div>
  );
};
