import TenantNavbar from "../components/BothView/NavBar/TenantNavBar.tsx";
import Footer from "../components/BothView/Footer/Footer.tsx";
import TenantBookingOverview from "../components/TenantView/BookingOverview/TenantBookingOverview.tsx";

const OwnBookingsPage = () => {
  return (
    <div>
      <TenantNavbar />
      <h1>Own Bookings Page</h1>
      <TenantBookingOverview />
      <Footer />
    </div>
  );
};

export default OwnBookingsPage;
