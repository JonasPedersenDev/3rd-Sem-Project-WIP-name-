import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <Link to="/Homepage">Go to HomePage</Link>
    </div>
  );
};

export default LoginPage;
