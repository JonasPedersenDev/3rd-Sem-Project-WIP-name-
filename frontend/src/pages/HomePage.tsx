import React, { useState } from "react";
import ResourceGrid from "../components/TenantView/ResourceGrid/ResourceGrid.tsx";
import { Link } from "react-router-dom";
import SidePanel from "../components/BothView/SidePanel/SidePanel.tsx";

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
