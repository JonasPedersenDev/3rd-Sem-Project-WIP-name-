import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBookingCount } from "../../../utils/sessionStorageSupport";

function Navbar({ onToggleDarkMode }) {
  const navigate = useNavigate();
  const [bookingCount, setBookingCount] = useState<number>(0);

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
        <div
          className="collapse navbar-collapse justify-content-end align-center"
          id="main-nav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => navigate("/hjem")}
              >
                Hjem
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => navigate("/kontakt")}
              >
                Kontakt
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => navigate("/mine-reservationer")}
              >
                Reservationer
              </button>
            </li>
            {/* New Reservation Overblik link with counter */}
            <li className="nav-item d-flex align-items-center">
              <button
                className="nav-link btn btn-link"
                onClick={() => navigate("/reservation-overblik")}
              >
                Reservation Overblik
              </button>
              <span className="badge bg-danger ms-2">{bookingCount}</span>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => navigate("/konto")}
              >
                Konto
              </button>
            </li>
            {/* Dark Mode Toggle */}
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={onToggleDarkMode}>
                Toggle Dark Mode
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
