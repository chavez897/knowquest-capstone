import React from "react";

export const Card = ({src, href, title, description, offer, initial_date, end_date, location}) => {
  return (
    <div className="card py-3 hover-shadow bg-light text-black">
      <img src={src} className="card-img-top mx-auto d-block" alt="" style={{height:"10vh", width:"10vh"}} />
      <div className="card-body">
        <a className="stretched-link" href={href}></a>
        <h5 className="card-title text-center">{title}</h5>
        <p className="card-text text-center">{description}</p>
        {/* The following are for contests components */}
        <p className="card-text text-center"><b>{offer}</b></p>
        {/* The following are for partners components */}
        <p className="card-text text-center">{initial_date}</p>
        <p className="card-text text-center">{end_date}</p>
        <p className="card-text text-center">{location}</p>
      </div>
    </div>
  );
};
