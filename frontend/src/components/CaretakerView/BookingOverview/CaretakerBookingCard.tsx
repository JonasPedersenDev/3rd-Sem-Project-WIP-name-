import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ApiService from '../../../utils/ApiService';

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
  const [showModalInitials, setShowModalInitials] = useState(false);
  const [selectedInitials, setSelectedInitials] = useState<string | null>(null);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [caretakers, setCaretakers] = useState<string[]>([]);

  useEffect(() => {
    const fetchCaretakerInitials = async () => {
      try {
        const initials = await ApiService.getAllCaretakerInitials();
        setCaretakers(initials);
      } catch (error) {
        console.error("Error fetching caretaker initials:", error);
      }
    };

    fetchCaretakerInitials();
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleCloseInitials = () => {
    setShowModalInitials(false);
    setSelectedInitials(null);
    setShowConfirmButton(false); // Hide "Bekræft" button when modal closes
  };
  const handleShowInitials = () => setShowModalInitials(true);

  const handleInitialsSelect = (initials: string) => {
    setSelectedInitials(initials);
    setShowConfirmButton(true); // Show "Bekræft" button after an initials selection
  };


  const handleConfirm = async () => {
    if (selectedInitials) {
      try {
        console.log(`Selected initials: ${selectedInitials}`);
        console.log(`Booking ID: ${booking.id}`);
        const formattedInitials = selectedInitials.replace(/['"]+/g, '');
        await ApiService.setInitialToBooking(booking.id, formattedInitials);
        alert("Initials set successfully.");
      } catch (error) {
        console.error("Error setting initials:", error);
        alert("Failed to set initials. Please try again.");
      }
      handleCloseInitials();
    } else {
      console.warn("No initials selected");
    }
  };

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
          {!booking.isFutureBooking && (
            <Button variant="success" className="ms-2" onClick={handleShowInitials}>
              Modtag
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

      {/* Modal for selecting caretaker initials */}
      <Modal show={showModalInitials} onHide={handleCloseInitials}>
        <Modal.Header closeButton>
          <Modal.Title>Vælg modtager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Medarbejder initialer:</strong></p>
          <div>
            {caretakers.map((initials, index) => (
              <Button
                key={index}
                variant="outline-primary"
                onClick={() => handleInitialsSelect(initials)}
                className="me-2 mb-2"
              >
                {initials}
              </Button>
            ))}
          </div>
          {showConfirmButton && (
            <Button variant="outline-secondary" onClick={handleConfirm} className="mt-3">
              Bekræft
            </Button>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CaretakerBookingCard;
