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

  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo(prevInfo => ({ ...prevInfo, [name]: value }));
  };

const handleEditToggle = () => {
  if (isEditing) {
    console.log("Opdatered Bruger Information:", userInfo);
    setShowSuccessModal(true);
  }
  setIsEditing(!isEditing);
}

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
          {isEditing ? (
            <Form.Control
            type="text"
            name="username"
            value={userInfo.username}
            onChange={handleInputChange}
            placeholder="Skriv nyt brugernavn"
          />
        ) : (
          <p>{userInfo.username}</p>
        )}
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label>Navn</Form.Label>
          {isEditing ? (
            <Form.Control
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            placeholder="Skriv nyt navn"
          />
          ) : (
            <p>{userInfo.name}</p>
          )}
        </Form.Group>

        <Form.Group controlId="formHouseAddress">
          <Form.Label>Addresse</Form.Label>
          {isEditing ? (
             <Form.Control
            type="text"
            name="houseAddress"
            value={userInfo.houseAddress}
            onChange={handleInputChange}
            placeholder="Skriv ny addresse"
          />
          ) : (
            <p>{userInfo.houseAddress}</p>
          )}
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          {isEditing ? (
            <Form.Control
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            placeholder="Skriv nyt email"
          /> 
          ) : (
            <p>{userInfo.email}</p>
          )}
        </Form.Group>

        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Telefon nummer</Form.Label>
          {isEditing ? (
            <Form.Control
            type="text"
            name="phoneNumber"
            value={userInfo.phoneNumber}
            onChange={handleInputChange}
            placeholder="Skriv nyt telefon nummer"
          />
          ) : (
            <p>{userInfo.phoneNumber}</p>
          )}
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Adgangskode</Form.Label>
          {isEditing ? (
            <Form.Control
            type="password"
            name="password"
            value={userInfo.password}
            onChange={handleInputChange}
            placeholder="Skriv ny adganskode"
          />
          ) : (
            <p>*********</p>
          )}
        </Form.Group>

        <Button variant="primary" onClick={handleEditToggle} className="mt-3">
          {isEditing ? "Gem Ændringer" : "Ændre"}
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
