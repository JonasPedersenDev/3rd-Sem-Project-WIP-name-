import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/BothView/NavBar/NavBar.tsx";

const CTresourcePage = () => {
  return (
    <>
    <NavBar />
    <div>
      <h1>CTresourcePage</h1>
      <Link to="/Hjem">Go to HomePage</Link>
    </div>
    </>
  );
};

export default CTresourcePage;
