import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Resource from '../../modelInterfaces/Resource';
import { ResourceType } from '../../../utils/EnumSupport';
import ApiService from '../../../utils/ApiService';
import BaseImage from '../../BaseImage';
import defaultImage from "../../../assets/deafultResourcePic.jpg";

interface CaretakerResourceCardProps {
  resource: Resource;
  onEdit: (updatedResource: Resource) => void;
  onToggleService: (id: number) => void;
  onDelete: (id: number, resourecType: ResourceType) => void;
}

const CaretakerResourceCard: React.FC<CaretakerResourceCardProps> = ({
  resource,
  onEdit,
  onToggleService,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedResource, setEditedResource] = useState(resource);

  const fetchImage = async () => {
    try {
      const response = await ApiService.fetchResourcePic(resource.type, resource.id);
      return response.data;
    } catch {
      return null;
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedResource({ ...editedResource, [name]: value });
  };

  const handleSave = () => {
    onEdit(editedResource);
    console.log("editedresource:", editedResource)
    setIsEditing(false);
  };

  return (
    <div className="card mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        {isEditing ? (
          <Modal show={isEditing} onHide={() => setIsEditing(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Resource</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="resourceName">
                  <Form.Label>Resource Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={editedResource.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="resourceDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={editedResource.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleSave}>
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        ) : (
          <>
            <div className="resource-info">
              <h3 className="mb-3">{resource.name}</h3>
              <p><strong>Status:</strong> {resource.status === "available" ? "Aktiv" : "Service"}</p>
              <p><strong>Beskrivelse:</strong> {resource.description}</p>
            </div>
            <BaseImage
              fetchImage={fetchImage}
              defaultImage={defaultImage}
              altText={`${resource.name} image`}
              imageStyle={{ width: "100%", height: "auto" }}
            />
            <div className="resource-actions">
              <Button variant="outline-secondary" onClick={() => setIsEditing(true)}>
                Rediger
              </Button>
              <Button
                variant={resource.status === 'maintenance' ? 'success' : 'warning'}
                onClick={() => onToggleService(resource.id)}
                className="ms-2"
              >
                {resource.status === 'maintenance' ? 'Aktiver' : 'Servicer'}
              </Button>
              <Button
                variant="danger"
                onClick={() => onDelete(resource.id, ResourceType[resource.type.toUpperCase() as keyof typeof ResourceType])}
                className="ms-2"
              >
                Slet
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CaretakerResourceCard;
