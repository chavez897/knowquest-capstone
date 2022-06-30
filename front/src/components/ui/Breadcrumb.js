import React from "react";
import { Link } from "react-router-dom";

export const Breadcrumb = ({ main, secondary, link }) => {
  return (
    <div>
      {secondary ? (
        <nav aria-label="py-3 breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home">
                <div>Home</div>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <Link to={link} className="mt-0 pt-0">
                <div className="mx-3">{main}</div>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {secondary}
            </li>
          </ol>
        </nav>
      ) : (
        <nav aria-label="py-3 breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home">
                <div>Home</div>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {main}
            </li>
          </ol>
        </nav>
      )}
    </div>
  );
};
