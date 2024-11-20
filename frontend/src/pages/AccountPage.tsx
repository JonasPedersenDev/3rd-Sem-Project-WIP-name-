import React from "react";
import SettingsForm from "../components/BothView/Settings/AccountSettings.tsx";
import TenantNavbar from "../components/BothView/NavBar/TenantNavBar.tsx";
import Footer from "../components/BothView/Footer/Footer.tsx";

const SettingsPage: React.FC = () => {
  return (
    <div>
      <TenantNavbar />
      <SettingsForm />
      <Footer />
    </div>
  );
};

export default SettingsPage;
