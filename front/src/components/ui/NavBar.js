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
    <nav className="navbar navbar-expand-sm navbar-light bg-info px-3">
      <Link to="/donors">
        <p className="navbar-brand text-white">KnowQuest</p>
      </Link>

      <div>
        <p
          className="btn nav-link text-decoration-none text-white"
          onClick={handleLogout}
        >
          Logout
        </p>
      </div>
    </nav>
  );
};
