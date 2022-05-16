import React from "react";
import { Card } from "../ui/Card";
import { CardData } from "../ui/CardData";
import { Announcenment } from "../ui/Announcement";
import { IndexSignUp } from "../ui/IndexSignUp";

export const HomeScreen = () => {
  const title = "test 2"
  const description = "easdf"
  return (
    <div className="container-fluid">
      <IndexSignUp />
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <Card title={title} description={description}/>
          </div>
          {/* <div className="col-lg-4">
            <Card title={title} description={description}/>
          </div>
          <div className="col-lg-4">
            <Card key="1" title={title} description={description}/>
          </div>
          <div className="col-lg-4">
            <Card title={title} description={description}/>
          </div>
          <div className="col-lg-4">
            <Card title={title} description={description}/>
          </div> */}
        </div>
      </div>
      <Announcenment />
    </div>
  );
};
