import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import BookingModalCalendar from "./BookingModalCalendar";

interface Resource {
  name: string;
  img: string;
  description: string;
  status: string;
  bookedDates: Date[];
}

interface Booking {
  id: string;
  resourceName: string;
  bookStartTime: Date | null;
  bookEndTime: Date | null;
  pickup: string;
  dropoff: string;
}

interface CreateBookingModalProps {
  resource: Resource;
  show: boolean;
  onBookingAdded: () => void;
  onClose: () => void;
}

const CreateBookingModal: React.FC<CreateBookingModalProps> = ({ resource, show, onBookingAdded, onClose }) => {
  let bookingList: Booking[] = [];

  const [bookingFormData, setBookingData] = useState<Booking>({
    id: (Math.floor(Math.random() * 10000) + 1).toString(),
    resourceName: resource.name,
    bookStartTime: null,
    bookEndTime: null,
    pickup: "7:00-7:30",
    dropoff: "7:00-7:30",
  });

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setBookingData({
      ...bookingFormData,
      bookStartTime: start,
      bookEndTime: end,
    });
  };

  const handleSubmit = () => {
    const bookingListString = window.sessionStorage.getItem("bookingList");
    if (bookingListString) {
      bookingList = JSON.parse(bookingListString);
    }
    bookingList.push(bookingFormData);
    window.sessionStorage.setItem("bookingList", JSON.stringify(bookingList));
    onBookingAdded();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reserver {resource.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center mt-3">
            <BookingModalCalendar
              bookedDates={resource.bookedDates}
              onDateChange={handleDateChange}
            />
          </div>
          
          <Form.Group controlId="bookstart">
            <Form.Label>Reservation Start:</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={bookingFormData.bookStartTime ? bookingFormData.bookStartTime.toDateString() : ""}
              placeholder="Vælg en afhentingsdato"
            />
          </Form.Group>

          <Form.Group controlId="bookend">
            <Form.Label>Reservation Slut:</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={bookingFormData.bookEndTime ? bookingFormData.bookEndTime.toDateString() : ""}
              placeholder="Vælg en afleveringsdato"
            />
          </Form.Group>

          <Form.Group controlId="pickup">
            <Form.Label>Afhenting:</Form.Label>
            <Form.Control
              as="select"
              name="pickup"
              value={bookingFormData.pickup}
              onChange={(e) => setBookingData({ ...bookingFormData, pickup: e.target.value })}
            >
              <option value="7:00-7:30">7:00 - 7:30</option>
              <option value="11:00-12:00">11:00 - 12:00</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="dropoff">
            <Form.Label>Aflevering:</Form.Label>
            <Form.Control
              as="select"
              name="dropoff"
              value={bookingFormData.dropoff}
              onChange={(e) => setBookingData({ ...bookingFormData, dropoff: e.target.value })}
            >
              <option value="7:00-7:30">7:00 - 7:30</option>
              <option value="11:00-12:00">11:00 - 12:00</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Tilføj Booking
          </Button>
          <Button variant="secondary" onClick={onClose} className="ms-2">
            Anuller
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateBookingModal;
