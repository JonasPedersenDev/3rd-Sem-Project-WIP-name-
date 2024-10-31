import { Link } from "react-router-dom";
import NavBar from "../components/BothView/NavBar/NavBar.tsx";
import Checkout from "../components/TenantView/Checkout/Checkout.tsx";
import Footer from "../components/BothView/Footer/Footer.tsx";

const CheckoutPage = () => {
  return (
    <div>
      <NavBar />
      <Checkout /> <br />
      <Link to="/Hjem">Go to HomePage</Link>
      <Footer style={footerStyle} />
    </div>
  );
};

export default CheckoutPage;
