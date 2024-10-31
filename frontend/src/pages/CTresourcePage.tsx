import { Link } from "react-router-dom";
import NavBar from "../components/BothView/NavBar/NavBar.tsx";
import Footer from "../components/BothView/Footer/Footer.tsx";

const CTresourcePage = () => {
  return (
    <>
    <NavBar />
    <div>
      <h1>CTresourcePage</h1>
      <Link to="/Hjem">Go to HomePage</Link>
      <Footer style={footerStyle} />
    </div>
    </>
  );
};

export default CTresourcePage;
