import NavBar from "../components/BothView/NavBar/NavBar.tsx";
import Footer from "../components/BothView/Footer/Footer.tsx";
import TenantDetailsList from "../components/CaretakerView/TenantDetails/TenantDetailsList.tsx";
const CTtenantOverview = () => {
  return (
    <>
    <NavBar />
    <div>
      <TenantDetailsList />
      <Footer />
    </div>
    </>
  );
};

export default CTtenantOverview;
