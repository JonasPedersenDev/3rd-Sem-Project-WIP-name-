import React, { useState } from "react";
import { Modal, Card, Button, Row, Col } from "react-bootstrap";
import CardImage from "../ResourceGrid/CardImage";
import { ResourceType } from "../../../utils/EnumSupport";

interface TenantBooking {
  id: number;
  tenantName: string;
  resourceName: string;
  resourceType: ResourceType;
  startDate: Date;
  endDate: Date;
  pickupTime: string;
  dropoffTime: string;
  imageUrl?: string;
  resourceID: number;
}

interface TenantBookingCardProps {
  booking: TenantBooking;
  onCancel: (id: number) => void
  isFuture: boolean 
}

const TenantBookingCard: React.FC<TenantBookingCardProps> = ({ booking, onCancel, isFuture }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Card className="mb-3 shadow-sm border-0">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={3} className="d-flex justify-content-center align-items-center">
            <div style={{ width: "80px", height: "80px", overflow: "hidden", borderRadius: "8px" }}>
              <CardImage
                id={booking.resourceID}
                type={booking.resourceType} 
                name={booking.resourceName} 
              />
            </div>
          </Col>

          <Col xs={6}>
            <h5 className="mb-1">
              <strong>{booking.tenantName}</strong>
            </h5>
            <p className="mb-0 text-muted">
              <strong>Ressource:</strong> {booking.resourceName}
            </p>
            <p className="mb-0">
              <strong>Start:</strong> {booking.startDate.toLocaleDateString()} - {booking.pickupTime}
            </p>
            <p>
              <strong>Slut:</strong> {booking.endDate.toLocaleDateString()} - {booking.dropoffTime}
            </p>
          </Col>

          <Col xs={3} className="d-flex justify-content-end">
            <Button variant="outline-primary" onClick={handleShow}>
              Detaljer
            </Button>
            {isFuture && (
              <>
                <Button variant="danger" className="ms-2" onClick={() => onCancel(booking.id)}>
                  Annuller
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Card.Body>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bookingdetaljer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Navn:</strong> {booking.tenantName}</p>
          <p><strong>Ressource:</strong> {booking.resourceName}</p>
          <p><strong>Startdato:</strong> {booking.startDate.toLocaleDateString()}</p>
          <p><strong>Slutdato:</strong> {booking.endDate.toLocaleDateString()}</p>
          <p><strong>Afhentning:</strong> {booking.pickupTime}</p>
          <p><strong>Aflevering:</strong> {booking.dropoffTime}</p>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default TenantBookingCard;
