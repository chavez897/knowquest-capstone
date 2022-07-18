import React from "react";
import { AddResource } from "./AddResource";

export const RateResourceScreen = () => {
  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 py-3">
          <h5>
            Rate Your Resources for Each Class to Help Your Peers Find The Best
            Resources Too
          </h5>
        </div>
        <div className="col-12 col-md-8 py-3">
          <AddResource />
        </div>
      </div>
      <div className="row p-5"></div>
    </div>
  );
};
