import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBookingCount } from "../../../utils/sessionStorageSupport";
import { useDarkMode } from "../../DarkModeContext";
import { FaHome, FaEnvelope, FaList, FaUser, FaSun, FaMoon } from "react-icons/fa"; // Import icons

function Navbar() {
  const { toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
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

  // Function to determine if the current route matches
  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar navbar-expand-md navbar-dark" style={{ backgroundColor: '#28a745' }}>
    <nav className="navbar navbar-expand-md navbar-dark" style={{ backgroundColor: '#28a745' }}>
      <div className="container-fluid">
        <a href="#intro" className="navbar-title">
          <span style={{ color: "#fff", fontWeight: "bold" }}>
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
            <li className={`nav-item ${isActive('/hjem')}`}>
              <button
                className="nav-link btn btn-link text-white"
                className="nav-link btn btn-link text-white"
                onClick={() => navigate("/hjem")}
              >
                <FaHome /> Hjem
                <FaHome /> Hjem
              </button>
            </li>
            <li className={`nav-item ${isActive('/kontakt')}`}>
            <li className={`nav-item ${isActive('/kontakt')}`}>
              <button
                className="nav-link btn btn-link text-white"
                className="nav-link btn btn-link text-white"
                onClick={() => navigate("/kontakt")}
              >
                <FaEnvelope /> Kontakt
                <FaEnvelope /> Kontakt
              </button>
            </li>
            <li className={`nav-item ${isActive('/mine-reservationer')}`}>
            <li className={`nav-item ${isActive('/mine-reservationer')}`}>
              <button
                className="nav-link btn btn-link text-white"
                className="nav-link btn btn-link text-white"
                onClick={() => navigate("/mine-reservationer")}
              >
                <FaList /> Reservationer
                <FaList /> Reservationer
              </button>
            </li>

            <li className={`nav-item ${isActive('/konto')}`}>

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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
