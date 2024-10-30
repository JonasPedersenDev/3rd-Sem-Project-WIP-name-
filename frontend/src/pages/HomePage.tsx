import React, { useState } from "react";
import ResourceGrid from "../components/TenantView/ResourceGrid/ResourceGrid.tsx";
import { Link } from "react-router-dom";
import SidePanel from "../components/BothView/SidePanel/SidePanel.tsx";
import NavBar from "../components/BothView/NavBar/NavBar.tsx";
import Footer from "../components/BothView/Footer/Footer.tsx";

const HomePage = () => {
  const footerStyle = {
    marginLeft: "250px",
    padding: "20px",
    flex: 1
  }; 
  return (
    <div>
      <SidePanel />
      <NavBar />
      <ResourceGrid />
      <Footer style={footerStyle} />
      <Link to="/">Go to LoginPage</Link> <br />
      <Link to="/reservation-overblik">Go to CheckoutPage</Link>
    </div>
  );
};

export default HomePage;
