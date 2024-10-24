import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <form className="w-25 p-4 border rounded shadow">
          <h4 className="text-center mb-4">Login</h4>
          <div className="mb-3 mt-5">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="username"
              placeholder="Enter username"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="exampleInputPassword1"
              placeholder="Password"
            />
            <Link to="/forgot-password" className="form-text text-muted mt-2 d-block">Forgot password?</Link>
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block mt-4">
            Login
          </button>
          <div className="text-center mt-3">
            <Link to="/sign-up" className="form-text text-muted">Don't have an account?</Link>
          </div>
        </form>
      </div>
    );
  };
  
  export default Login;