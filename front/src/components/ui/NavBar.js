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
        <Link to="/home">
          <div className="navbar-brand">
            <b style={{ color: "#333999" }}>
              Know<span style={{ color: "#f93" }}>Quest</span>
            </b>
          </div>
        </Link>
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
              <Link to="/home">
                <div className="nav-link active" aria-current="page">
                  Home
                </div>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <div
                className="nav-link dropdown-toggle active"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Rate
              </div>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <div className="dropdown-item pointer">Textbook</div>
                </li>
                <li>
                  <div className="dropdown-item pointer">School</div>
                </li>
                <li>
                  <div className="dropdown-item pointer">Class</div>
                </li>
                <li>
                  <div className="dropdown-item pointer">Online Learning</div>
                </li>
                <li>
                  <div className="dropdown-item pointer">Resource</div>
                </li>
                <li>
                  <div className="dropdown-item pointer">Wekipedia</div>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/search">
                <div className="nav-link active pointer">Search</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/partners">
                <div className="nav-link active">Partners</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contests">
                <div className="nav-link active pointer">Contests</div>
              </Link>
            </li>
            {user.email ? (
              <>
                <li className="nav-item">
                  <Link to="/user/profile">
                    <div className="nav-link active pointer">{user.email}</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/user/referral">
                    <div className="nav-link active pointer">Referral</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <div
                    className="nav-link active pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/auth/login">
                  <div className="nav-link active">Login</div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
