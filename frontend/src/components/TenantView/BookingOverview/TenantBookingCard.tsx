import React, { useState } from "react";
import { Modal, Card, Button, Row, Col } from "react-bootstrap";
import CardImage from "../ResourceGrid/CardImage";
import CreateBookingModal from "../CreateBookingModal/CreateBookingModal";
import Resource from "../../modelInterfaces/Resource";

interface TenantBooking {
  id: number;
  tenantName: string;
  resource: Resource;
  startDate: Date;
  endDate: Date;
  pickupTime: string;
  dropoffTime: string;
  imageUrl?: string;
  status: string;
}

interface TenantBookingCardProps {
  booking: TenantBooking;
  onCancel: (id: number) => void;
  isFuture?: boolean;
  isDone?: boolean;
  fetchBookings?: () => void;
}

const TenantBookingCard: React.FC<TenantBookingCardProps> = ({
  booking,
  onCancel,
  isFuture,
  isDone,
  fetchBookings,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleCreateBookingModalOpen = () => setIsCreateModalOpen(true);
  const handleCreateBookingModalClose = () => setIsCreateModalOpen(false);

  return (
    <Card className="mb-3 shadow-sm border-0">
      <Card.Body>
        <Row className="align-items-center">
          <Col
            xs={3}
            className="d-flex justify-content-center align-items-center"
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                overflow: "hidden",
                borderRadius: "8px",
              }}
            >
              <CardImage
                id={booking.resource.id}
                type={booking.resource.type}
                name={booking.resource.name}
              />
            </div>
          </Col>

          <Col xs={6}>
            <h5 className="mb-1">
              <strong>{booking.tenantName}</strong>
            </h5>
            <p className="mb-0 text-muted">
              <strong>Ressource:</strong> {booking.resource.name}
            </p>
            <p className="mb-0">
              <strong>Start:</strong> {booking.startDate.toLocaleDateString()} -{" "}
              {booking.pickupTime}
            </p>
            <p>
              <strong>Slut:</strong> {booking.endDate.toLocaleDateString()} -{" "}
              {booking.dropoffTime}
            </p>
          </Col>

          <Col xs={3} className="d-flex justify-content-end">
            <Button variant="outline-primary" onClick={handleShow}>
              Detaljer
            </Button>
            {!isDone && (
              <>
                <Button
                  variant="warning"
                  onClick={handleCreateBookingModalOpen}
                >
                  Rediger
                </Button>
              </>
            )}

            {isFuture && (
              <>
                <Button
                  variant="danger"
                  className="ms-2"
                  onClick={() => onCancel(booking.id)}
                >
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
          <p>
            <strong>Navn:</strong> {booking.tenantName}
          </p>
          <p>
            <strong>Ressource:</strong> {booking.resource.name}
          </p>
          <p>
            <strong>Startdato:</strong> {booking.startDate.toLocaleDateString()}
          </p>
          <p>
            <strong>Slutdato:</strong> {booking.endDate.toLocaleDateString()}
          </p>
          <p>
            <strong>Afhentning:</strong> {booking.pickupTime}
          </p>
          <p>
            <strong>Aflevering:</strong> {booking.dropoffTime}
          </p>
        </Modal.Body>
      </Modal>

      {isCreateModalOpen && (
        <CreateBookingModal
          resource={booking.resource}
          show={isCreateModalOpen}
          booking={{
            id: booking.id,
            resourceID: booking.resource.id,
            resourceType: booking.resource.type,
            resourceName: booking.resource.name,
            startDate: booking.startDate,
            endDate: booking.endDate,
            pickupTime: booking.pickupTime,
            dropoffTime: booking.dropoffTime,
            status: booking.status,
          }}
          editBooking={true}
          onBookingAdded={() => {
            fetchBookings && fetchBookings();
            console.log("Booking updated");
            setIsCreateModalOpen(false);
          }}
          onClose={handleCreateBookingModalClose}
        />
      )}
    </Card>
  );
};

export default TenantBookingCard;
