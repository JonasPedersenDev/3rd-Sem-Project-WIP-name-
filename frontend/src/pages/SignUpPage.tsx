import SignUp from "../components/BothView/SignUp/SignUp";
import { Link } from "react-router-dom";


const SignUpPage = () => {
  return (
    <div>
      <SignUp />
      <Link to="/reservation-overblik">Go to CheckoutPage</Link> //sneaky workaround when it doesn't work
    </div>
  );
};

export default SignUpPage;