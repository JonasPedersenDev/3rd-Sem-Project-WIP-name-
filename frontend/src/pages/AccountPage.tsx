import React from "react";
import SettingsForm from "../components/BothView/Settings/AccountSettings";
import { Button, Nav } from "react-bootstrap";
import SidePanel from "../components/BothView/SidePanel/SidePanel.tsx";
import Navbar from "../components/BothView/NavBar/NavBar.tsx";
import Footer from "../components/BothView/Footer/Footer.tsx";

const SettingsPage: React.FC = () => {
  return (
    <div>
      <SidePanel />
      <Navbar />
      <SettingsForm />
      <Footer style={footerStyle} />
    </div>
  );
};

export default SettingsPage;
