import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";

export const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container-fluid">
        <a className="navbar-brand " href="/home">
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
              <a className="nav-link active" aria-current="page" href="/home">
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle active"
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
                  <a className="dropdown-item active" href="#">
                    Textbook
                  </a>
                </li>
                <li>
                  <a className="dropdown-item active" href="#">
                    School
                  </a>
                </li>
                <li>
                  <a className="dropdown-item active" href="#">
                    Class
                  </a>
                </li>
                <li>
                  <a className="dropdown-item active" href="#">
                    Online Learning
                  </a>
                </li>
                <li>
                  <a className="dropdown-item active" href="#">
                    Resource
                  </a>
                </li>
                <li>
                  <a className="dropdown-item active" href="#">
                    Wekipedia
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Search
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Partners
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Contests
              </a>
            </li>
            {user.username ? (
                <li className="nav-item">
                  <a className="nav-link active" onClick={handleLogout} href="#">
                    Logout [{user.username}]
                  </a>
                </li>
            ) : (
              <li className="nav-item">
                <a className="nav-link active" href="/auth/login">
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
