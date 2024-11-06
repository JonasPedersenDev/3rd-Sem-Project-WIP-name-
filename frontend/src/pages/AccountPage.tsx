import React from "react";
import SettingsForm from "../components/BothView/Settings/AccountSettings";
import Navbar from "../components/BothView/NavBar/NavBar.tsx";
import Footer from "../components/BothView/Footer/Footer.tsx";

const SettingsPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <SettingsForm />
      <Footer />
    </div>
  );
};

export default SettingsPage;
