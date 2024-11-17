<<<<<<< HEAD
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBookingCount } from "../../../utils/sessionStorageSupport";
import { useDarkMode } from "../../DarkModeContext";
import { FaHome, FaEnvelope, FaList, FaUser, FaSun, FaMoon } from "react-icons/fa"; // Import icons
=======
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getBookingCount } from "../../../utils/sessionStorageSupport";
import { useDarkMode } from "../../DarkModeContext";
import { AuthContext } from './AuthContext';
>>>>>>> 3a94a6e84b83bf53b55d7e0adb5f188034058380

function Navbar() {
  const { toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
<<<<<<< HEAD
  const location = useLocation(); // Track current location
  const [bookingCount, setBookingCount] = useState<number>(0);
=======
  const [bookingCount, setBookingCount] = useState(0);

  // Use useContext to access AuthContext
  const { userRole } = useContext(AuthContext);
>>>>>>> 3a94a6e84b83bf53b55d7e0adb5f188034058380

  useEffect(() => {
    setBookingCount(getBookingCount());

    const handleBookingAdded = () => {
      setBookingCount(getBookingCount());
    };

    window.addEventListener("bookingsUpdated", handleBookingAdded);

    return () => {
      window.removeEventListener("bookingsUpdated", handleBookingAdded);
    };
  }, []);

  // Function to determine if the current route matches
  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar navbar-expand-md navbar-dark" style={{ backgroundColor: '#28a745' }}>
      <div className="container-fluid">
        <a href="#intro" className="navbar-title">
          <span style={{ color: "#fff", fontWeight: "bold" }}>
            Himmerland <br /> Boligforening
          </span>
        </a>

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

        <div className="collapse navbar-collapse justify-content-end" id="main-nav">
          <ul className="navbar-nav">
<<<<<<< HEAD
            <li className={`nav-item ${isActive('/hjem')}`}>
              <button
                className="nav-link btn btn-link text-white"
                onClick={() => navigate("/hjem")}
              >
                <FaHome /> Hjem
              </button>
            </li>
            <li className={`nav-item ${isActive('/kontakt')}`}>
              <button
                className="nav-link btn btn-link text-white"
                onClick={() => navigate("/kontakt")}
              >
                <FaEnvelope /> Kontakt
              </button>
            </li>
            <li className={`nav-item ${isActive('/mine-reservationer')}`}>
              <button
                className="nav-link btn btn-link text-white"
                onClick={() => navigate("/mine-reservationer")}
              >
                <FaList /> Reservationer
              </button>
            </li>

            <li className={`nav-item ${isActive('/konto')}`}>
              <button
                className="nav-link btn btn-link text-white"
                onClick={() => navigate("/konto")}
              >
                <FaUser /> Konto
              </button>
            </li>

            {/* Dark Mode Toggle */}
            <li className="nav-item">
              <button className="nav-link btn btn-link text-white" onClick={toggleDarkMode}>
                {location.pathname === "/konto" ? <FaSun /> : <FaMoon />} Toggle Dark Mode
              </button>
            </li>
=======
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => navigate("/hjem")}>Hjem</button>
            </li>
            {/* Conditional rendering based on userRole from AuthContext */}
            {userRole === 'tenant' && (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => navigate("/kontakt")}>Kontakt</button>
              </li>
            )}
            <li className="nav-item d-flex align-items-center">
              <button className="nav-link btn btn-link" onClick={() => navigate("/reservation-overblik")}>
                Reservation Overblik
              </button>
              <span className="badge bg-danger ms-2">{bookingCount}</span>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => navigate("/konto")}>Konto</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={toggleDarkMode}>Toggle Dark Mode</button>
            </li>
>>>>>>> 3a94a6e84b83bf53b55d7e0adb5f188034058380
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
