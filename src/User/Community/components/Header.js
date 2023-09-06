import React from "react";
import { Link } from "react-router-dom";

const Header = () => {


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid bg-faded padding-media">
        <div className="container padding-media">
          <nav className="navbar navbar-toggleable-md navbar-light">
            <button
              className="navbar-toggler mt-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              data-bs-parent="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="true"
              aria-label="Toggle Navigation"
            >
              <span className="fa fa-bars"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <Link to="/User" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link`}
                  >
                    Home
                  </li>
                </Link>
                <Link to="/Community" >
                  <li
                    className={`nav-item nav-link`}>
                    Timeline
                  </li>
                </Link>
                <Link to="/Community/blogs" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link`}
                  >
                    Blogs
                  </li>
                </Link>

                <Link to="/Community/create" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link`}
                  >
                    Create
                  </li>
                </Link>

              </ul>

            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Header;
