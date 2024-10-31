import NavBar from "../components/BothView/NavBar/NavBar.tsx";
import Checkout from "../components/TenantView/Checkout/Checkout.tsx";
import Footer from "../components/BothView/Footer/Footer.tsx";

const CheckoutPage = () => {
  return (
    <div>
      <NavBar />
      <Checkout /> <br />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
