import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Resource from "../../modelInterfaces/Resource";
import { ResourceType } from "../../../utils/EnumSupport";
import ApiService from "../../../utils/ApiService";

interface AddResourceModalProps {
  show: boolean;
  onClose: () => void;
  onTrigger: () => void;
}

const AddResourceModal: React.FC<AddResourceModalProps> = ({ show, onClose, onTrigger }) => {
  const [resourceData, setResourceData] = useState<Resource>({
    id: 0,
    type: ResourceType.UTILITY,
    name: "",
    img: "",
    description: "",
    status: "available",
    capacity: 1,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (e.target.type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setImageFile(file);
      }
    } else {
      setResourceData((prevData) => ({
        ...prevData,
        [name]: name === "capacity" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (imageFile === null) {console.log("image is null"); return}
      const transformedResource = transformResourceSubmit()
      const response = await ApiService.createResource(transformedResource, imageFile, resourceData.type)
      console.log("create response:", response)

      console.log("the resource: ", resourceData)
      onClose();
      onTrigger();
      setResourceData({ //Reset form data
        id: 0,
        type: ResourceType.UTILITY,
        name: "",
        img: "",
        description: "",
        status: "available",
        capacity: 1,});
    } catch (error) {
      console.error("Error adding resource:", error);
    }
  };

  const transformResourceSubmit = () => {
    const transformedResource = {
      name: resourceData.name,
      description: resourceData.description,
      type: resourceData.type,
      capacity: resourceData.capacity,
      status: resourceData.status
    }
    return transformedResource
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Resource</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Navn:</Form.Label>
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
              as="select"
              name="type"
              value={resourceData.type}
              onChange={handleChange}
              required
            >
              <option value={ResourceType.TOOL}>Værktøj</option>
              <option value={ResourceType.HOSPITALITY}>Gæste hus</option>
              <option value={ResourceType.UTILITY}>Andet</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="imageFile">
            <Form.Label>Billede:</Form.Label>
            <Form.Control
              type="file"
              name="imageFile"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Beskrivelse:</Form.Label>
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
              required
            >
              <option value="available">Available</option>
              <option value="maintenance">Maintenance</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="capacity">
            <Form.Label>Antal:</Form.Label>
            <Form.Control
              type="number"
              name="capacity"
              value={resourceData.capacity}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            Tilføj Ressource
          </Button>
          <Button variant="secondary" onClick={onClose} className="ms-2 mt-2">
            Anuller
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddResourceModal;

