import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Row, Col, Container } from "react-bootstrap";
import LogoutButton from "../Logout/Logout";
import ApiService from "../../../utils/ApiService";
import DeleteUser from '../DeleteUser/DeleteUser'; // Adjust the import path as necessary

interface UserInfo {
  id: number;
  username: string;
  name: string;
  houseAddress?: string;
  email: string;
  password: string;
  mobileNumber: string;
}

const AccountSettings: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: 0,
    username: "",
    name: "",
    houseAddress: "",
    mobileNumber: "",
    password: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentView, setCurrentView] = useState("settings");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<File | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await ApiService.fetchData<UserInfo>("tenant");
        console.log("User Information:", response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo(prevInfo => ({ ...prevInfo, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedProfilePicture(file);
    }
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!userInfo.username || !userInfo.password || !userInfo.email || !userInfo.name) {
      return "Udfyld venligst alle felter.";
    }
    if (!emailRegex.test(userInfo.email)) {
      return "Indtast en gyldig email.";
    }
    if (!passwordRegex.test(userInfo.password)) {
      return "Adgangskoden skal være mindst 8 tegn lang og inkludere både store og små bogstaver samt et tal.";
    }
    return null;
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      const error = validateForm();
      if (error) {
        setValidationError(error);
        return;
      }
      try {
        await ApiService.editUser(userInfo.id, userInfo, selectedProfilePicture || undefined);
        setShowSuccessModal(true);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
    setIsEditing(!isEditing);
    setValidationError(null);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderContent = () => {
    switch (currentView) {
      case "settings":
        return (
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Brugernavn</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={userInfo.username}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Navn</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Form.Group>
            <Form.Group controlId="mobileNumber">
              <Form.Label>Telefonnummer</Form.Label>
              <Form.Control
                type="text"
                name="mobileNumber"
                value={userInfo.mobileNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Form.Group>
            <Form.Group controlId="houseAddress">
              <Form.Label>Adresse</Form.Label>
              <Form.Control
                type="text"
                name="houseAddress"
                value={userInfo.houseAddress}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Adgangskode</Form.Label>
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                name="password"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <Form.Check
                type="checkbox"
                label="Show password"
                onChange={togglePasswordVisibility}
              />
            </Form.Group>

            <Button onClick={handleEditToggle}>
              {isEditing ? "Save" : "Edit"}
            </Button>
          </Form>
        );
      case "notifications":
        return (
          <div>
            <Form.Check type="checkbox" label="Notification 1" />
            <Form.Check type="checkbox" label="Notification 2" />
            <Form.Check type="checkbox" label="Notification 3" />
          </div>
        );
      default:
        return null;
    }
  };

  const handleCloseModal = () => setShowSuccessModal(false);

  const handleDelete = (tenantId: string) => {
    // Handle the deletion logic, e.g., update state or show a success message
    console.log(`Tenant with ID ${tenantId} deleted`);
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Row style={{ width: '100%' }}>
        <Col md={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: '20px' }}>
          <Button onClick={() => setCurrentView("settings")} style={{ marginBottom: '10px' }}>Din bruger</Button>
          <Button onClick={() => setCurrentView("text")} style={{ marginBottom: '10px' }}>Samtykke</Button>
          <Button onClick={() => setCurrentView("notification")} style={{ marginBottom: '10px' }}>Notifikationer</Button>
          <LogoutButton />
          <DeleteUser tenantId={userInfo.id.toString()} onDelete={handleDelete} />
        </Col>
        <Col md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #ccc', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          {renderContent()}
        </Col>
      </Row>
      <Row>
        <Col>
          <Modal show={showSuccessModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Ændringer er gemt</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              User information updated successfully!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountSettings;
