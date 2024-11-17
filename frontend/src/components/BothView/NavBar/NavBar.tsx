import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getBookingCount } from "../../../utils/sessionStorageSupport";
import { useDarkMode } from "../../DarkModeContext";
import { AuthContext } from './components/BothView/NavBar/AuthContext.js';

function Navbar() {
  const { toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [bookingCount, setBookingCount] = useState(0);

  // Use useContext to access AuthContext
  const { userRole } = useContext(AuthContext);

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

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-custom">
      <div className="container-fluid">
        <a href="#intro" className="navbar-title">
          <span style={{ color: "#00ac58", fontWeight: "bold" }}>
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
