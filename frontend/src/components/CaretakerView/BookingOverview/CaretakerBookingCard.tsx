import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface CaretakerBooking {
  id: number;
  name: string;
  resourceName: string;
  startDate: Date;
  endDate: Date;
  pickupTime: string;
  dropoffTime: string;
  phoneNumber: string;
  email: string;
  isFutureBooking: boolean;
}

interface CaretakerBookingCardProps {
  booking: CaretakerBooking;
  onCancel: (id: number) => void;
}

const CaretakerBookingCard: React.FC<CaretakerBookingCardProps> = ({ booking, onCancel }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="card mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <strong>{booking.name}</strong>: {booking.resourceName}
          <div>Start: {booking.startDate.toLocaleDateString()}</div>
          <div>Slut: {booking.endDate.toLocaleDateString()}</div>
        </div>
        <div>
          <Button variant="outline-secondary" onClick={handleShow}>
            Detaljer
          </Button>
          {booking.isFutureBooking && (
            <Button variant="danger" className="ms-2" onClick={() => onCancel(booking.id)}>
              Annuller
            </Button>
          )}
        </div>
      </div>

      {/* Modal for Booking Details */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Booking detaljer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Navn:</strong> {booking.name}</p>
          <p><strong>Ressource:</strong> {booking.resourceName}</p>
          <p><strong>Telefon:</strong> {booking.phoneNumber}</p>
          <p><strong>Email:</strong> {booking.email}</p>
          <p><strong>Startdato:</strong> {booking.startDate.toLocaleDateString()} kl. {booking.pickupTime}</p>
          <p><strong>Slutdato:</strong> {booking.endDate.toLocaleDateString()} kl. {booking.dropoffTime}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CaretakerBookingCard;
