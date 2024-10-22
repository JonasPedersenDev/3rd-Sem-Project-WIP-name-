import React from "react";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-custom">
            <div className="container-fluid">
                <a href="#intro" className="navbar-title">
                    <span className="fw-bold text-secondary">
                        Himmerland Boligforening booking System
                    </span>
                </a>

        
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false"
                aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

             
                <div className="collapse navbar-collapse justify-content-end align-center" 
                id="main-nav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href="#reviews" className="nav-link">Hjem</a>
                        </li>
                        <li className="nav-item">
                            <a href="#contact" className="nav-link">Kontakt</a>
                        </li>
                        <li className="nav-item">
                            <a href="#pricing" className="nav-link">Bookings</a>
                        </li>
                        <li className="nav-item">
                            <a href="#about" className="nav-link">Navn</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
