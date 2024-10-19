import React, { useState } from "react";
import ResourceGrid from "../components/ResourceGrid";
import { Link } from "react-router-dom";
import SidePanel from "../components/BothView/SidePanel";

const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <SidePanel />
      <ResourceGrid />
      <Link to="/">Go to LoginPage</Link>
    </div>
  );
};

export default HomePage;
