import React from "react";
import { Link } from "react-router-dom";

export const Breadcrumb = ({ main, secondary, link }) => {
  return (
    <div>
      {secondary ? (
        <nav aria-label="py-3 breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <Link to="/home">
                <a>Home</a>
              </Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              <Link to={link}>
                <a>{main}</a>
              </Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {secondary}
            </li>
          </ol>
        </nav>
      ) : (
        <nav aria-label="py-3 breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <Link to="/home">
                <a>Home</a>
              </Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {main}
            </li>
          </ol>
        </nav>
      )}
    </div>
  );
};
