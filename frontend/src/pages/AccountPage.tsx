import React from "react";
import SettingsForm from "../components/BothView/Settings/AccountSettings";
import { Button, Nav } from "react-bootstrap";
import Navbar from "../components/BothView/NavBar/NavBar.tsx";

const SettingsPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <SettingsForm />
    </div>
  );
};

export default SettingsPage;
