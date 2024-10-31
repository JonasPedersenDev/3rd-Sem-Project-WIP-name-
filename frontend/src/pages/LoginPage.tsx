import Login from "../components/BothView/Login/Login";
import Footer from "../components/BothView/Footer/Footer.tsx";

const LoginPage = () => {
  return (
    <div>
      <Login />
      <Footer style={footerStyle} />
    </div>
  );
};

export default LoginPage;
