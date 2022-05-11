import React from "react";

const getCurrentYear = () => {
    return new Date().getFullYear();
  };

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2
        }}
    />
);

export const Footer = () => {
    return (
      <div className="bg-dark d-flex justify-content-center align-items-center text-white">
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-lg-6">
                    <div>
                        Logo goes here
                    </div>
                    <div className="mt-2">
                        The world's first academix feedback platform
                    </div>
                    <div className="mt-2">
                        links to linkedin
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="row">
                        <div className="col">Menu</div>
                    </div>
                    <div className="row mt-1">
                        <div className="col">Home</div>
                        <div className="col">F.A.Q.</div>
                    </div>
                    <div className="row">
                        <div className="col">About</div>
                        <div className="col">Reccommendations</div>
                    </div>
                    <div className="row">
                        <div className="col">Keep Contact</div>
                    </div>
                </div>
            </div>
            <div className="row mt-2"><ColoredLine color="grey" /></div>
            <div className="row">
                <div className="col-lg-6">
                    copyright {getCurrentYear()} @ KnowQuest.Inc
                </div>
                <div className="col-lg-2">
                    copyrights
                </div>
                <div className="col-lg-2">
                    term of use
                </div>
                <div className="col-lg-2">
                    Privacy policy
                </div>
            </div>  
        </div>
      </div>
    );
  };