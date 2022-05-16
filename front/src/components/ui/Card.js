import React from "react";
import logo from "./logo192.jpeg";

export const Card = ({title, description}) => {
  return (
    <div className="card mt-2 mb-2 hover-shadow">
      <img src={logo} className="card-img-top" alt="" style={{height:"20vh"}} />
      <div className="card-body">
        <h5 className="card-title text-center">{title}</h5>
        <p className="card-text">
        {description}
        </p>
      </div>
    </div>
  );
};
