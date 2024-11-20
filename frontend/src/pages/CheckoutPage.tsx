import TenantNavBar from "../components/BothView/NavBar/TenantNavBar.tsx";
import Checkout from "../components/TenantView/Checkout/Checkout.tsx";
import Footer from "../components/BothView/Footer/Footer.tsx";

const CheckoutPage = () => {
  return (
    <div>
      <TenantNavBar />
      <Checkout /> <br />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
