import { Link } from "react-router-dom";
import Footer from "../components/BothView/Footer/Footer.tsx";

const OwnBookingsPage = () => {
  return (
    <div>
      <h1>OwnBookingsPage</h1>
      <Link to="/Hjem">Go to HomePage</Link>
      <Footer style={footerStyle} />
    </div>
  );
};

export default OwnBookingsPage;
