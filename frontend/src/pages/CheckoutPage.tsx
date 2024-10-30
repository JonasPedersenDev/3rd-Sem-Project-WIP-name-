import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/BothView/NavBar/NavBar.tsx";
import Checkout from "../components/TenantView/Checkout/Checkout.tsx";


const CheckoutPage = () => {
  return (
    <div>
      <NavBar />
      <Checkout /> <br />
      <Link to="/Hjem">Go to HomePage</Link>
    </div>
  );
};

export default CheckoutPage;
