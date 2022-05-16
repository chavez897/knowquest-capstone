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
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container">
        <a className="navbar-brand " href="#">
          <b style={{ color: "#333999" }}>
            Know<span style={{ color: "#f93" }}>Quest</span>
          </b>
        </a>
      </div>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Rate
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Textbook
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    School
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Class
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Online Learning
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Resource
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Wekipedia
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Search
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Partners
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contests
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link btn" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
