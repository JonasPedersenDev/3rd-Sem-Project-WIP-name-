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
  mobileNumber: string;
  houseAddress: string;
  email: string;
  status: string;
  receiverInitials: string;
  handoverInitials: string;
  isFutureBooking: boolean;
  isPastBooking: boolean;
}

interface CaretakerBookingCardProps {
  booking: CaretakerBooking;
  onCancel: (id: number) => void;
  onComplete: (id: number) => void;
}

const CaretakerBookingCard: React.FC<CaretakerBookingCardProps> = ({ booking, onCancel, onComplete }) => {
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
    setShowConfirmButton(false);
  };
  const handleShowInitials = () => setShowModalInitials(true);

  const handleInitialsSelect = (initials: string) => {
    setSelectedInitials(initials);
    setShowConfirmButton(true);
  };

  const handleConfirm = async () => {
    if (selectedInitials) {
      try {
        const formattedInitials = selectedInitials.replace(/['"]+/g, '');

        if (booking.status === "CONFIRMED") {
          await ApiService.setInitialToBooking(booking.id, formattedInitials);
        } else {
          await ApiService.setHandoverInitialToBooking(booking.id, formattedInitials);
        }

        onComplete(booking.id);
      } catch (error) {
        console.error("Error handling initials:", error);
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
          {(booking.isFutureBooking || (booking.startDate.toDateString() === new Date().toDateString() && booking.status === "PENDING")) && (
            <>
              <Button variant="danger" className="ms-2" onClick={() => onCancel(booking.id)}>
                Annuller
              </Button>
              <Button variant="success" className="ms-2" onClick={handleShowInitials}>
                Udlever
              </Button>
            </>
          )}

          {!booking.isFutureBooking && !booking.isPastBooking && booking.status === "CONFIRMED" && (
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
          <h4>Beboer information:</h4>
          <p><strong>Navn:</strong> {booking.name}</p>
          <p><strong>Adresse:</strong> {booking.houseAddress}</p>
          <p><strong>Telefon:</strong> {booking.mobileNumber}</p>
          <p><strong>Email:</strong> {booking.email}</p>
          <br />
          <h4>Reservation information:</h4>
          <p><strong>Ressource:</strong> {booking.resourceName}</p>
          <p><strong>Startdato:</strong> {booking.startDate.toLocaleDateString()} kl. {booking.pickupTime}</p>
          <p><strong>Slutdato:</strong> {booking.endDate.toLocaleDateString()} kl. {booking.dropoffTime}</p>
          <p><strong>Udlevering:</strong> {booking.handoverInitials}</p>
          <p><strong>Modtagelse:</strong> {booking.receiverInitials}</p>
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
              <Button key={index} variant="outline-primary" onClick={() => handleInitialsSelect(initials)} className="me-2 mb-2">
                {initials}
              </Button>
            ))}
          </div>
          {showConfirmButton && (
            <Button variant="success" onClick={handleConfirm} className="mt-3">
              Bekræft
            </Button>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CaretakerBookingCard;
