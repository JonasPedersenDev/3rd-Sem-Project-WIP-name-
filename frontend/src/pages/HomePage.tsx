import ResourceGrid from "../components/TenantView/ResourceGrid/ResourceGrid.tsx";
import SidePanel from "../components/BothView/SidePanel/SidePanel.tsx";
import NavBar from "../components/BothView/NavBar/NavBar.tsx";
import Footer from "../components/BothView/Footer/Footer.tsx";

const HomePage = () => {

  return (
    <div className="homePage">
      <SidePanel />
      <NavBar />
      <ResourceGrid />
      <Footer />
    </div>
  );
};

export default HomePage;
