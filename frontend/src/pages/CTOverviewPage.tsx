import NavBar from "../components/BothView/NavBar/NavBar.tsx";
import Footer from "../components/BothView/Footer/Footer.tsx";
import CaretakerBookingOverview from "../components/CaretakerView/BookingOverview/CaretakerBookingOverview.tsx";

const CToverviewPage = () => {
  return (
    <>
    <NavBar />
    <div>
      <CaretakerBookingOverview />
      <Footer />
    </div>
    </>
  );
};

export default CToverviewPage;
