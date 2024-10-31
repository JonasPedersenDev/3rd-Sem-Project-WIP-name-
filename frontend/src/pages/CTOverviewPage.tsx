import { Link } from "react-router-dom";
import NavBar from "../components/BothView/NavBar/NavBar.tsx";
import Footer from "../components/BothView/Footer/Footer.tsx";

const CToverviewPage = () => {
  return (
    <>
    <NavBar />
    <div>
      <h1>CToverviewPage</h1>
      <Link to="/Hjem">Go to HomePage</Link>
      <Footer />
    </div>
    </>
  );
};

export default CToverviewPage;
