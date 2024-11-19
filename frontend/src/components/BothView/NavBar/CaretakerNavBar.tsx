import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBookingCount } from "../../../utils/sessionStorageSupport";
import { useDarkMode } from "../../DarkModeContext";
import { FaHome, FaEnvelope, FaList, FaUser } from "react-icons/fa";

function Navbar() {
  const { toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation(); // Track current location
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

  // Function to determine if the current route matches
  const isActive = (path: string) => (location.pathname === path ? 'active' : '');

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
            <li className={`nav-item ${isActive('/admin-overblik')}`}>
              <button
                className="nav-link btn btn-link text-white"
                onClick={() => navigate("/admin-overblik")}
              >
                <FaHome /> Admin-overblik
              </button>
            </li>
            <li className={`nav-item ${isActive('/ressource-overblik')}`}>
              <button
                className="nav-link btn btn-link text-white"
                onClick={() => navigate("/ressource-overblik")}
              >
                <FaList /> Ressource-overblik
              </button>
            </li>
            <li className={`nav-item ${isActive('/beboer-overblik')}`}>
              <button
                className="nav-link btn btn-link text-white"
                onClick={() => navigate("/beboer-overblik")}
              >
                <FaUser /> Beboer-overblik
              </button>
            </li>

            {/* Dark Mode Toggle */}
            <li className="nav-item">
              <button className="nav-link btn btn-link text-white" onClick={toggleDarkMode}>
                Dark Mode
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
