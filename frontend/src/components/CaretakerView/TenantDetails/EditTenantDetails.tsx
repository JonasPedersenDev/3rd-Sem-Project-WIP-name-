import React, { useState, useEffect } from "react";
import ApiService from "../../../utils/ApiService";
import Tenant from "../../modelInterfaces/Tenant";
import { Modal, Button, Form } from "react-bootstrap";

interface EditTenantDetailsProps {
  tenantId: string;
  onClose: () => void;
  onUpdate: (updatedTenant: Tenant) => void;
}

const EditTenantDetails: React.FC<EditTenantDetailsProps> = ({ tenantId, onClose, onUpdate }) => {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const response = await ApiService.fetchData(`admin/getTenant/${tenantId}`);
        setTenant(response.data as Tenant);
      } catch (err) {
        console.error("Error fetching tenant:", err);
        setError("Failed to fetch tenant.");
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, [tenantId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTenant((prevTenant) => (prevTenant ? { ...prevTenant, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (tenant) {
        const response = await ApiService.editUserAdmin(Number(tenantId), tenant);
        onUpdate(response.data);
        onClose();
      } else {
        setError("Tenant data is missing.");
      }
    } catch (err) {
      console.error("Error updating tenant:", err);
      setError("Failed to update tenant.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ændre beboer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {tenant && (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTenantName">
              <Form.Label>Navn</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={tenant.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formTenantUsername">
              <Form.Label>Brugernavn</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={tenant.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formTenantAddress">
              <Form.Label>Adresse</Form.Label>
              <Form.Control
                type="text"
                name="houseAddress"
                value={tenant.houseAddress}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formTenantPhone">
              <Form.Label>Telefonnummer</Form.Label>
              <Form.Control
                type="text"
                name="mobileNumber"
                value={tenant.mobileNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formTenantEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={tenant.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Gem ændringer
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditTenantDetails;