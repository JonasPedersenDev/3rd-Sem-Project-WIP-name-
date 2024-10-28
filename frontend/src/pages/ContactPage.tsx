import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/BothView/NavBar/NavBar.tsx";


const ContactPage = () => {

    const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      <h1>KONTAKT INFO</h1>
      <button
        className="NotFoundButton"
        onClick={() => navigate("/homepage")}
      >
        Tilbage til hjem
      </button>
    </div>
  );
};

export default ContactPage;
