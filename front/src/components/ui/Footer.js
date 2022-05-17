import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 2,
    }}
  />
);

const twitter = <FontAwesomeIcon icon={faTwitter} />
const facebook = <FontAwesomeIcon icon={faFacebook} />
const linkedin = <FontAwesomeIcon icon={faLinkedin} />

export const Footer = () => {
    return (
    <div className="bg-dark d-flex justify-content-center align-items-center text-white">
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-lg-6">
            <div className="row">
              <h2 href="/home">
                <b style={{ color: "white" }}>
                  Know<span style={{ color: "#f93" }}>Quest</span>
                </b>
              </h2>
            </div>
            <div className="row mt-2">
              <h6>The world's first academic feedback platform</h6>
            </div>
            <div className="row mt-2">
                <div className="col-sm-1"><a href="#">{twitter}</a></div>
                <div className="col-sm-1"><a href="#">{facebook}</a></div>
                <div className="col-sm-1"><a href="#">{linkedin}</a></div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col"><h5><b>Menu</b></h5></div>
            </div>
            <div className="row mt-1">
              <div className="col">
                <a href="/home" style={{ color: "white" }}>Home</a>
              </div>
              <div className="col">
              <a href="#" style={{ color: "white" }}>F.A.Q.</a>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
              <a href="#" style={{ color: "white" }}>About</a>
              </div>
              <div className="col">
              <a href="#" style={{ color: "white" }}>Reccommendations</a>
              </div>
            </div>
            <div className="row py-2">
              <div className="col">
              <a href="#" style={{ color: "white" }}>Keep Contact</a>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <ColoredLine color="grey" />
        </div>
        <div className="row">
          <div className="col-lg-6">
            copyright {getCurrentYear()} @ KnowQuest.Inc
          </div>
          <div className="col-lg-2">
            <a href="#" style={{ color: "white" }}>Copyrights</a>
          </div>
          <div className="col-lg-2">
            <a href="#" style={{ color: "white" }}>Term of use</a>
          </div>
          <div className="col-lg-2">
            <a href="#" style={{ color: "white" }}>Privacy policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};
