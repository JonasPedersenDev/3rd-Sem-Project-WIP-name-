import React, { useState } from "react";
import ResourceGrid from "../components/TenantView/ResourceGrid/ResourceGrid.tsx";
import { Link } from "react-router-dom";
import SidePanel from "../components/BothView/SidePanel/SidePanel.tsx";
import NavBar from "../components/BothView/NavBar/NavBar.tsx";

const HomePage = () => {
  return (
    <div>
      <SidePanel />
      <NavBar />
      <ResourceGrid />
      
      <Link to="/">Go to LoginPage</Link>
    </div>
  );
};

export default HomePage;
