import React from "react";
import "../../../public/assets/css/style.css";

function Header() {
  return (
    <div>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="http:/">
            <img src="/assets/images/logo.png" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Accueil
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Participer
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="about.html">
                  Gains
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/about">
                  A propos
                </a>
              </li>

              {/* <li className="nav-item">
                <a className="nav-link" href="coffees.html">
                  Boutique
                </a>
              </li> */}

              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
