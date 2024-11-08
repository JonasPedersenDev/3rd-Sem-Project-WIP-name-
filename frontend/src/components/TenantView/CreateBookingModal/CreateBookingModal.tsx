import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import BookingModalCalendar from "./BookingModalCalendar";
import ApiService from "../../../utils/ApiService";
import Resource from "../../modelInterfaces/Resource";
import Booking from "../../modelInterfaces/Booking";
import BookingDate from "../../modelInterfaces/BookingDate";

interface CreateBookingModalProps {
  resource: Resource;
  show: boolean;
  onBookingAdded: () => void;
  onClose: () => void;
}

const CreateBookingModal: React.FC<CreateBookingModalProps> = ({
  resource,
  show,
  onBookingAdded,
  onClose,
}) => {
  const [bookedDates, setBookedDates] = useState<BookingDate[]>([]);
  const [bookingFormData, setBookingData] = useState<Booking>({
    id: (Math.floor(Math.random() * 10000) + 1).toString(),
    resourceName: resource.name,
    bookStartTime: null,
    bookEndTime: null,
    pickup: "7:00-7:30",
    dropoff: "7:00-7:30",
  });

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await ApiService.fetchBookings(
          resource.type,
          resource.id
        );
        
        console.log("Booked dates response:", response);

        setBookedDates(response.data);

      } catch (error) {
        console.error("Failed to fetch booked dates:", error);
      }
    };

    fetchBookedDates();
  }, [resource.type, resource.id]);

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setBookingData({
      ...bookingFormData,
      bookStartTime: start,
      bookEndTime: end,
    });
  };

  const handleSubmit = () => {
    const bookingListString = window.sessionStorage.getItem("bookingList");
    let bookingList: Booking[] = bookingListString
      ? JSON.parse(bookingListString)
      : [];
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
              bookedDates={bookedDates}
              onDateChange={handleDateChange}
              resourceCapacity={resource.capacity}
            />
          </div>

          <Form.Group controlId="bookstart">
            <Form.Label>Reservation Start:</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={
                bookingFormData.bookStartTime
                  ? bookingFormData.bookStartTime.toDateString()
                  : ""
              }
              placeholder="Vælg en afhentingsdato"
            />
          </Form.Group>

          <Form.Group controlId="bookend">
            <Form.Label>Reservation Slut:</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={
                bookingFormData.bookEndTime
                  ? bookingFormData.bookEndTime.toDateString()
                  : ""
              }
              placeholder="Vælg en afleveringsdato"
            />
          </Form.Group>

          <Form.Group controlId="pickup">
            <Form.Label id="pickup-label">Afhenting:</Form.Label>
            <Form.Control
              as="select"
              name="pickup"
              aria-labelledby="pickup-label"
              value={bookingFormData.pickup}
              onChange={(e) =>
                setBookingData({ ...bookingFormData, pickup: e.target.value })
              }
            >
              <option value="7:00-7:30">7:00 - 7:30</option>
              <option value="11:00-12:00">11:00 - 12:00</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="dropoff">
            <Form.Label id="dropoff-label">Aflevering:</Form.Label>
            <Form.Control
              as="select"
              name="dropoff"
              aria-labelledby="dropoff-label"
              value={bookingFormData.dropoff}
              onChange={(e) =>
                setBookingData({ ...bookingFormData, dropoff: e.target.value })
              }
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
