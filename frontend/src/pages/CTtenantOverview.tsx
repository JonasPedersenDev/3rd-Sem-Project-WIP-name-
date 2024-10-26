import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/BothView/NavBar/NavBar.tsx";

const CTtenantOverview = () => {
  return (
    <>
    <NavBar />
    <div>
      <h1>CTtenantOverview</h1>
      <Link to="/Homepage">Go to HomePage</Link>
    </div>
    </>
  );
};

export default CTtenantOverview;
