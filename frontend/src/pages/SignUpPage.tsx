import SignUp from "../components/BothView/SignUp/SignUp";
import { Link } from "react-router-dom";
import Footer from "../components/BothView/Footer/Footer.tsx";

const SignUpPage = () => {
  return (
    <div>
      <SignUp />
      <Link to="/reservation-overblik">Go to CheckoutPage</Link> //sneaky workaround when it doesn't work
      <Footer />
    </div>
  );
};

export default SignUpPage;
