import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from 'react-bootstrap';

interface AddResourceModalProps {
  onResourceAdded: () => void;
  onClose: () => void;
}

interface AddResourceModalProps {
  show: boolean;
  onResourceAdded: () => void;
  onClose: () => void;
}

const AddResourceModal: React.FC<AddResourceModalProps> = ({ show, onResourceAdded, onClose }) => {
  const [resourceData, setResourceData] = useState({
    name: "",
    type: "",
    img: "",
    description: "",
    status: "available",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setResourceData({
      ...resourceData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/resources", resourceData);
      onResourceAdded();
    } catch (error) {
      console.error("Error adding resource:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Resource</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={resourceData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="type">
            <Form.Label>Type:</Form.Label>
            <Form.Control
              type="text"
              name="type"
              value={resourceData.type}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="img">
            <Form.Label>Image:</Form.Label>
            <Form.Control
              type="text"
              name="img"
              value={resourceData.img}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={resourceData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Status:</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={resourceData.status}
              onChange={handleChange}
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
              <option value="maintenance">Maintenance</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Resource
          </Button>
          <Button variant="secondary" onClick={onClose} className="ms-2">
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddResourceModal;
