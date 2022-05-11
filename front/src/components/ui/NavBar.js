import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import { useDispatch } from "react-redux";

export const NavBar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light px-3">
      <div className="container">
        <div className="col-lg-6"><img src="%PUBLIC_URL%/favicon.ico"></img></div>
        {/* <div className="col">
          <Link to="/index">
            <p className="navbar-brand text-white">KnowQuest</p>
          </Link>
        </div> */}
        <div className="col-lg-1"><p className="navbar-brand">Home</p></div>
        <div className="col dropdown">
          <p className="navbar-brand">Rate</p>
        </div>
        <div className="col-lg-1"><p className="navbar-brand">Search</p></div>
        <div className="col-lg-1"><p className="navbar-brand">Partners</p></div>
        <div className="col-lg-1"><p className="navbar-brand">Contests</p></div>
        <div className="col-lg-1">
          <p
            className="btn nav-link text-decoration-none"
            onClick={handleLogout}
          >
            Logout
          </p>
        </div>
      </div>
      
    </nav>
  );
};
