import React, { useState } from "react";
import ResourceGrid from "../components/TenantView/ResourceGrid/ResourceGrid.tsx";
import { Link } from "react-router-dom";
import SidePanel from "../components/BothView/SidePanel/SidePanel.tsx";
import NavBar from "../components/BothView/NavBar/NavBar.tsx";
import Footer from "../components/BothView/Footer/Footer.tsx";

const HomePage = () => {
  return (
    <div>
      <SidePanel />
      <NavBar />
      <ResourceGrid />
      <Footer />
      <Link to="/">Go to LoginPage</Link> <br />
      <Link to="/Checkoutpage">Go to CheckoutPage</Link>
    </div>
  );
};

export default HomePage;
