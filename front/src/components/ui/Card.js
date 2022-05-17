import React from "react";

export const Card = ({src, title, description}) => {
  return (
    <div className="card py-3 hover-shadow">
      <img src={src} className="card-img-top mx-auto d-block" alt="" style={{height:"10vh", width:"10vh"}} />
      <div className="card-body">
        <h5 className="card-title text-center">{title}</h5>
        <p className="card-text text-center">
        {description}
        </p>
      </div>
    </div>
  );
};
