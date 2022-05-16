import React from "react";
import logo from "./logo192.jpeg";

export const Card = (props) => {
  return (
    <div className="card mt-2 mb-2 hover-shadow">
      <img src={logo} className="card-img-top" alt="" style={{height:"20vh"}} />
      <div class="card-body">
        <h5 class="card-title text-center">props.title</h5>
        <p class="card-text">
        props.description
        </p>
      </div>
    </div>
  );
};
