import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const SettingsForm: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    name: "",
    houseAddress: "",
    email: "",
    phoneNumber: "",
    password: ""
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo(prevInfo => ({ ...prevInfo, [name]: value }));
  };

  const handleSave = () => {
    console.log("Updated User Information:", userInfo);

    // Show success message modal
    setShowSuccessModal(true);

    // Clear input fields
    setUserInfo({
      username: "",
      name: "",
      houseAddress: "",
      email: "",
      phoneNumber: "",
      password: ""
    });
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Brugernavn</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={userInfo.username}
            onChange={handleInputChange}
            placeholder="Skriv nyt brugernavn"
          />
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label>Navn</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            placeholder="Skriv nyt navn"
          />
        </Form.Group>

        <Form.Group controlId="formHouseAddress">
          <Form.Label>Addresse</Form.Label>
          <Form.Control
            type="text"
            name="houseAddress"
            value={userInfo.houseAddress}
            onChange={handleInputChange}
            placeholder="Skriv ny addresse"
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            placeholder="Skriv nyt email"
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Telefon nummer</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            value={userInfo.phoneNumber}
            onChange={handleInputChange}
            placeholder="Skriv nyt telefon nummer"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Adgangskode</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={userInfo.password}
            onChange={handleInputChange}
            placeholder="Skriv ny adganskode"
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSave} className="mt-3">
          Gem ændringer
        </Button>
      </Form>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ændringer er gemt</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ændringer foretaget er opdateret!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Luk
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SettingsForm;
