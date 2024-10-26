import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/BothView/NavBar/NavBar.tsx";

const AccountPage = () => {
  // State to hold user input
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform update actions (send data to server, validation, etc.)
    console.log("Updated Data:", formData);
    alert("Account settings updated successfully!");
  };

  return (
    <>
    <NavBar />
    <div className="container mt-5">
      <h2 className="mb-4">Account Settings</h2>
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter new username"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter new email"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter new phone number"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
            required
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary">
          Update Account
        </button>
      </form>
    </div>
    </>
  );
};

export default AccountPage;
