import React, { useState } from 'react';
import { Modal, Button, Card, Image } from 'react-bootstrap';

interface TenantBooking {
  id: number;
  tenantName: string;
  resourceName: string;
  startDate: Date;
  endDate: Date;
  contactNumber: string;
  apartmentAddress: string;
  isCurrentTenant: boolean;
  imageUrl: string;
}
// tenant booking card
interface TenantBookingCardProps {
  booking: TenantBooking;
  onTerminate: (id: number) => void; // booking cancellation
  onExtend: (id: number, newEndDate: Date) => void; // booking extension
}

const TenantBookingCard: React.FC<TenantBookingCardProps> = ({ booking, onTerminate, onExtend }) => {
  const [showModal, setShowModal] = useState(false);

  const handleExtension = () => {
    const newEndDate = new Date(booking.endDate.getTime() + 86400000 * 1); // extend the booking by a day
    onExtend(booking.id, newEndDate);
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Card className="mb-3">
      <Card.Header>
        <strong>{booking.tenantName}</strong> - {booking.resourceName}
      </Card.Header>
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <Image src={booking.imageUrl} thumbnail onError={(e) => e.currentTarget.src = 'default-image-url.jpg'} />
          <div>Start: {booking.startDate.toLocaleDateString()}</div>
          <div>End: {booking.endDate.toLocaleDateString()}</div>
        </div>
        <div>
          <Button variant="outline-secondary" onClick={handleShow} aria-label="Show details">
            Details
          </Button>
          {booking.isCurrentTenant && (
            <>
              <Button variant="primary" onClick={handleExtension} aria-label="Extend booking">
                Extend
              </Button>
              <Button variant="danger" onClick={() => onTerminate(booking.id)} aria-label="Terminate booking">
                Terminate
              </Button>
            </>
          )}
        </div>
      </Card.Body>
      <Modal show={showModal} onHide={handleClose} aria-labelledby="tenant-details-modal">
        <Modal.Header closeButton>
          <Modal.Title>Tenant Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Name:</strong> {booking.tenantName}</p>
          <p><strong>Resource:</strong> {booking.resourceName}</p>
          <p><strong>Contact Number:</strong> {booking.contactNumber}</p>
          <p><strong>Address:</strong> {booking.apartmentAddress}</p>
          <p><strong>Start Date:</strong> {booking.startDate.toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {booking.endDate.toLocaleDateString()}</p>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default TenantBookingCard;