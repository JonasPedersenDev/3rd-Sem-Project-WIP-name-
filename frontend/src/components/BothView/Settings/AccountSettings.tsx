import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Row, Col, Container, Image } from "react-bootstrap";
import LogoutButton from "../../BothView/Logout/Logout";
import ApiService from "../../../utils/ApiService";


interface UserInfo {
  username: string;
  name: string;
  houseAddress?: string;
  email: string;
  mobile_number?: string;
  password: string;
}

const SettingsForm: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo> ({
    username: "",
    name: "",
    email: "",
    password: ""
  });

  //const [profilePicture, setProfilePicture] = useState<string | null>("https://placehold.co/150");
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentView, setCurrentView] = useState("settings");
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    // Fetch authenticated user information from the backend
    const fetchUserInfo = async () => {
      try {
        const response = await ApiService.fetchData<UserInfo>("tenant");
        console.log("User Information:", response.data);
        setUserInfo(response.data);
        // Assuming the profile picture URL is part of the user data
      //   const profilePictureResponse = await ApiService.fetchData<ArrayBuffer>("user/profilePicture");
      //   const base64Image = btoa(
      //    new Uint8Array(profilePictureResponse.data).reduce(
      //      (data, byte) => data + String.fromCharCode(byte),
      //      ''
      //    )
      //  );
      //  setProfilePicture(`data:image/jpeg;base64,${base64Image}`);
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

  const handleEditToggle = () => {
    if (isEditing) {
      console.log("Updated User Information:", userInfo);
      setShowSuccessModal(true);
    }
    setIsEditing(!isEditing);
  };

  // const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append("profilePicture", file);
  //     try {
  //       const response = await axios.post("/api/user/profilePicture", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data"
  //         }
  //       });
  //       if (response.status === 200) {
  //         const base64Image = await convertFileToBase64(file);
  //         setProfilePicture(base64Image);
  //       }
  //     } catch (error) {
  //       console.error("Error uploading profile picture:", error);
  //     }
  //   }
  // };

  // const convertFileToBase64 = (file: File): Promise<string> => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result as string);
  //     reader.onerror = error => reject(error);
  //   });
  // };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderContent = () => {
    switch (currentView) {
      case "settings":
        return (
          <Row>
            <Col md={8}>
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Label>Brugernavn</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={userInfo.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder={userInfo.username}
                  />
                </Form.Group>
                <Form.Group controlId="formName">
                  <Form.Label>Navn</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder={userInfo.name}
                  />
                </Form.Group>
                <Form.Group controlId="formHouseAddress">
                  <Form.Label>Adresse</Form.Label>
                  <Form.Control
                    type="text"
                    name="houseAddress"
                    value={userInfo.houseAddress}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder={userInfo.houseAddress}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder={userInfo.email}
                  />
                </Form.Group>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label>Telefon nummer</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={userInfo.mobile_number}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder={userInfo.mobile_number}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Adgangskode</Form.Label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Control
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      value={userInfo.password}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      style={{ marginRight: '10px' }}
                      placeholder="Enter new password"
                    />
                    <Button variant="secondary" onClick={togglePasswordVisibility}>
                      {passwordVisible ? "Hide" : "Show"}
                    </Button>
                  </div>
                </Form.Group>
                <Button variant="primary" onClick={handleEditToggle}>
                  {isEditing ? "Save Changes" : "Edit"}
                </Button>
              </Form>
            </Col>
            <Col md={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* //<Image src={profilePicture || "https://placehold.co/150"} roundedCircle style={{ width: '150px', height: '150px' }} /> */}
              <Form.Group controlId="formProfilePicture" style={{ marginTop: '20px', display: isEditing ? 'block' : 'none' }}>
                <Form.Label>Upload Profil billede</Form.Label>
                <Form.Control
                  type="file"
                  // onChange={handleFileChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
          </Row>
        );
      case "text":
        return <div>"Et eller andet tekst IDK"</div>;
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

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Row style={{ width: '100%' }}>
        <Col md={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: '20px' }}>
          <Button onClick={() => setCurrentView("settings")} style={{ marginBottom: '10px' }}>Din bruger</Button>
          <Button onClick={() => setCurrentView("text")} style={{ marginBottom: '10px' }}>Samtykke</Button>
          <Button onClick={() => setCurrentView("notifications")} style={{ marginBottom: '10px' }}>Notifikationer</Button>
          <LogoutButton />
        </Col>
        <Col md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #ccc', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          {renderContent()}
        </Col>
      </Row>
      <Row>
        <Col>
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
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsForm;