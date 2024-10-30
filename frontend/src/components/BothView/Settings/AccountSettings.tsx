import React, { useState } from "react";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import LogoutButton from "../../BothView/Logout/Logout";

const SettingsForm: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    name: "",
    houseAddress: "",
    email: "",
    phoneNumber: "",
    password: ""
  });

  const [profilePicture, setProfilePicture] = useState<string | null>("https://placehold.co/150");
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo(prevInfo => ({ ...prevInfo, [name]: value }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      console.log("Updated User Information:", userInfo);
      setShowSuccessModal(true);
    }
    setIsEditing(!isEditing);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);

      try {
        const response = await fetch("http://localhost:5173/api/upload-profile-picture", {
          method: "POST",
          body: formData,
          headers: {
            "Accept": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Assuming the backend returns the path to the uploaded image
        const imagePath = data.path;

        // Set the profile picture preview
        setProfilePicture(`http://localhost:5173/backend/src/main/resources/profilepicture/${imagePath}`);

        console.log("Image uploaded successfully:", data);
      } catch (error) {
        console.error("Error uploading the image:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="settings-container" style={{ marginLeft: '250px' }}>
      <Row>
        {/* User Information Form */}
        <Col md={9}>
          <Form>
            {/* Form fields for user info */}
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
            {/* Other fields follow the same structure */}
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
                  placeholder="Skriv ny adgangskode"
                />
              ) : (
                <p>*********</p>
              )}
            </Form.Group>

            <Button variant="primary" onClick={handleEditToggle} className="mt-3">
              {isEditing ? "Gem Ændringer" : "Ændre"}
            </Button>
            <LogoutButton />
          </Form>
        </Col>

        {/* Profile Picture Section on the Right */}
        <Col md={3} className="text-center">
          <div style={{ marginBottom: '20px' }}>
            <img
              src={profilePicture ?? "https://placehold.co/150"}
              alt="Profile"
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
            {isEditing && (
              <Form.Group controlId="formProfilePicture" className="mt-3">
                <Form.Label>Skift profilbillede</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
            )}
          </div>
        </Col>
      </Row>

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
    </div>
  );
};

export default SettingsForm;
