import React from "react";
import SettingsForm from "../components/BothView/Settings/AccountSettings";
import { Button, Nav } from "react-bootstrap";
import SidePanel from "../components/BothView/SidePanel/SidePanel.tsx";
import Navbar from "../components/BothView/NavBar/NavBar.tsx";

const SettingsPage: React.FC = () => {
  return (
    <div>
      <SidePanel />
      <Navbar />
      <SettingsForm />
    </div>
  );
};

export default SettingsPage;
