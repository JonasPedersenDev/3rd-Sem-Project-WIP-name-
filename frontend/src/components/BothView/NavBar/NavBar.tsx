import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-custom">
      <div className="container-fluid">
        <a href="#intro" className="navbar-title">
          <span style={{ color: "#00ac58", fontWeight: "bold" }}>
            Himmerland <br /> Boligforening
          </span>
        </a>

        {/* Navbar toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-nav"
          aria-controls="main-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse justify-content-end align-center" id="main-nav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => navigate("/homepage")}
              >
                Hjem
              </button>
            </li>
            <li className="nav-item">
            <button
                className="nav-link btn btn-link"
                onClick={() => navigate("/contact")}
              >
                Kontakt
              </button>
            </li>
            <li className="nav-item">
            <button
                className="nav-link btn btn-link"
                onClick={() => navigate("/OwnBookingsPage")}
              >
                Reservationer
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => navigate("/accountpage")}
              >
                Navn
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
