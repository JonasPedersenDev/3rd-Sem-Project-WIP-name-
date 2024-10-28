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
    bookStartTime: Date;
    bookEndTime: Date;
    pickup: string;
    dropoff: string;
}

interface CreateBookingModalProps {
    resource: Resource
    show: boolean;
    onBookingAdded: () => void;
    onClose: () => void;
}


const CreateBookingModal: React.FC<CreateBookingModalProps> = ({resource, show, onBookingAdded, onClose }) => {
    let bookingList: Booking[] = []
    const [bookingFormData, setBookingData] = useState<Booking>({
    id: (Math.floor(Math.random() * 10000) + 1).toString(), //filler -> match object fra checkout
    resourceName: resource.name,
    bookStartTime: new Date('2024-11-01T10:00:00'),
    bookEndTime: new Date('2024-11-01T12:00:00'),
    pickup: "7:00-7:30",
    dropoff: "7:00-7:30",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setBookingData({
      ...bookingFormData,
      [name]: name.includes('Time') ? new Date(value) : value,
    });
  };


  const handleSubmit = () => {
    const bookingListString = window.sessionStorage.getItem("bookingList")
    if (bookingListString) {
        bookingList = JSON.parse(bookingListString)
    }
    console.log("object for checkout:", bookingFormData)
    bookingList.push(bookingFormData);
    console.log("bookingList: ", bookingList)
    window.sessionStorage.setItem('bookingList', JSON.stringify(bookingList));
    console.log("bookings in storage: " + window.sessionStorage.getItem("bookingList"))
    console.log("length: " + window.sessionStorage.length)
    onBookingAdded()
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reserver {resource.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center mt-3">
            <BookingModalCalendar bookedDates={resource.bookedDates}/>
          </div>
          <Form.Group controlId="bookstart">
            <Form.Label>Reservation Start:</Form.Label>
            <Form.Control
              type="datetime-local"
              name="bookStartTime"
              value={bookingFormData.bookStartTime.toISOString().substring(0, 16)}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="bookend">
            <Form.Label>Reservation Slut:</Form.Label>
            <Form.Control
              type="datetime-local"
              name="bookEndTime"
              value={bookingFormData.bookEndTime.toISOString().substring(0, 16)}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="pickup">
            <Form.Label>Afhenting:</Form.Label>
            <Form.Control
              as="select"
              name="pickup"
              value={bookingFormData.pickup.toLocaleString()}
              onChange={handleChange}
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
              onChange={handleChange}
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
