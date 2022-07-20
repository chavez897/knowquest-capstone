import React, {useRef} from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";

export const NavBar = () => {
  const dispatch = useDispatch();
  const navbarToggler = useRef();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCollapse = () => {
    if (window.getComputedStyle(navbarToggler.current).display !== 'none') {
      navbarToggler.current.click();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container-fluid">
        <Link to="/home" onClick={handleCollapse}>
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
          ref={navbarToggler}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/home" onClick={handleCollapse}>
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
                  <Link to="/user/ratebook" onClick={handleCollapse}>
                    <div className="dropdown-item pointer">Textbook</div>
                  </Link>
                </li>
                <li>
                  <Link to="/user/ratebook" onClick={handleCollapse}>
                    <div className="dropdown-item pointer">School</div>
                  </Link>
                </li>
                <li>
                  <Link to="/user/ratebook" onClick={handleCollapse}>
                    <div className="dropdown-item pointer">Class</div>
                  </Link>
                </li>
                <li>
                  <Link to="/user/ratebook" onClick={handleCollapse}>
                    <div className="dropdown-item pointer">Online Learning</div>
                  </Link>
                </li>
                <li>
                  <Link to="/user/rateresource" onClick={handleCollapse}>
                    <div className="dropdown-item pointer">Resource</div>
                  </Link>
                </li>
                <li>
                  <Link to="/user/ratebook" onClick={handleCollapse}>
                    <div className="dropdown-item pointer">Wikipedia</div>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/search" onClick={handleCollapse}>
                <div 
                  className="nav-link active pointer"
                >Search</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/partners" onClick={handleCollapse}>
                <div className="nav-link active">Partners</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contests" onClick={handleCollapse}>
                <div className="nav-link active pointer">Contests</div>
              </Link>
            </li>
            {user.email ? (
              <>
                <li className="nav-item">
                  <Link to="/user/profile" onClick={handleCollapse}>
                    <div className="nav-link active pointer">{user.email}</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/user/referral" onClick={handleCollapse}>
                    <div className="nav-link active pointer">Referral</div>
                  </Link>
                </li>
                <li className="nav-item" onClick={handleCollapse}>
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
                <Link to="/auth/login" onClick={handleCollapse}>
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
