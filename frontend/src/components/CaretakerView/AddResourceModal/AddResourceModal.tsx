import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Resource from "../../modelInterfaces/Resource";
import { ResourceType } from "../../../utils/EnumSupport";
import ApiService from "../../../utils/ApiService";
import { validateImage, getCroppedImage } from "../../../utils/pictureSupport";

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
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (e.target.type === "file") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0];
      if (file) {
        const validImage = await validateImage(file);
        if (validImage) {
          setImageFile(file);
          const imageSrc = URL.createObjectURL(file);
          setImageSrc(imageSrc);
        } else {
          alert("Ugyldig fil type eller for små dimensioner. Billedet skal være PNG/JPG og skal være minimum 300x300 pixels");
          fileInput.value = "";
        }
      }
    } else {
      setResourceData((prevData) => ({
        ...prevData,
        [name]: name === "capacity" ? Number(value) : value,
      }));
    }
  };

  const handleCropComplete = async (crop: Crop) => {
    if (crop.width && crop.height && imgRef.current) {
      const croppedBlob = await getCroppedImage(imgRef.current, crop, `${resourceData.name}-cropped.jpg`);
      if (croppedBlob) {
        setImageFile(new File([croppedBlob], "cropped-image.jpg", { type: "image/jpeg" }));
      }
    }
  };

  const resetData = () => {
    onClose()
    setResourceData({
      id: 0,
      type: ResourceType.UTILITY,
      name: "",
      img: "",
      description: "",
      status: "available",
      capacity: 1,
    });
    setImageSrc(null);
    setImageFile(null);
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (imageFile === null) {
        console.log("image is null");
        return;
      }
      const transformedResource = transformResourceSubmit();
      const response = await ApiService.createResource(transformedResource, imageFile, resourceData.type);
      console.log("create response:", response);

      console.log("the resource: ", resourceData);
      resetData();
      onTrigger();
    } catch (error) {
      console.error("Error adding resource:", error);
    }
  };

  const transformResourceSubmit = () => {
    return {
      name: resourceData.name,
      description: resourceData.description,
      type: resourceData.type,
      capacity: resourceData.capacity,
      status: resourceData.status,
    };
  };

  return (
    <Modal show={show} onHide={resetData}>
      <Modal.Header closeButton>
        <Modal.Title>Tilføj Ny Ressource</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Navn:</Form.Label>
            <Form.Control type="text" name="name" value={resourceData.name} onChange={handleChange} required />
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
            <Form.Control type="file" name="imageFile" onChange={handleChange} required />
            {imageSrc && (   
              <ReactCrop
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                aspect={1}
                onComplete={handleCropComplete}
              >
                <img
                  ref={imgRef}
                  src={imageSrc}
                  alt="Upload"
                  onLoad={(e) => (imgRef.current = e.currentTarget)}
                />
              </ReactCrop>
            )}
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
          <Button variant="secondary" onClick={resetData} className="ms-2 mt-2">
            Anuller
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddResourceModal;
