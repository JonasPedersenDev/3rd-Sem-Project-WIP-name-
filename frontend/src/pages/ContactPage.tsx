import NavBar from "../components/BothView/NavBar/NavBar.tsx";
import Contact from "../components/TenantView/Contact/Contact.tsx";
import Footer from "../components/BothView/Footer/Footer.tsx";

const ContactPage = () => {


  return (
    <div>
      <NavBar />
      <Contact />
      <Footer style={footerStyle} />
    </div>
  );
};

export default ContactPage;
