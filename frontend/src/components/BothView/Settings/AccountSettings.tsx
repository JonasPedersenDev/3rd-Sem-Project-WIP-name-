import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SettingsForm: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    name: "",
    houseAddress: "",
    email: "",
    phoneNumber: "",
    password: ""
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo(prevInfo => ({ ...prevInfo, [name]: value }));
  };

  const handleSave = () => {
    console.log("Updated User Information:", userInfo);
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={userInfo.username}
          onChange={handleInputChange}
          placeholder="Enter username"
        />
      </Form.Group>

      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={userInfo.name}
          onChange={handleInputChange}
          placeholder="Enter name"
        />
      </Form.Group>

      <Form.Group controlId="formHouseAddress">
        <Form.Label>House Address</Form.Label>
        <Form.Control
          type="text"
          name="houseAddress"
          value={userInfo.houseAddress}
          onChange={handleInputChange}
          placeholder="Enter house address"
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleInputChange}
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group controlId="formPhoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          name="phoneNumber"
          value={userInfo.phoneNumber}
          onChange={handleInputChange}
          placeholder="Enter phone number"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleInputChange}
          placeholder="Enter password"
        />
      </Form.Group>

      <Button variant="primary" onClick={handleSave} className="mt-3">
        Save Changes
      </Button>
    </Form>
  );
};

export default SettingsForm;
