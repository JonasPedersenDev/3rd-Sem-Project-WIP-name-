import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import BookingModalCalendar from "./BookingModalCalendar";
import ApiService from "../../../utils/ApiService";
import Resource from "../../modelInterfaces/Resource";
import Booking from "../../modelInterfaces/Booking";
import BookingDate from "../../modelInterfaces/BookingDate";
import { isValidDateRange } from "../../../utils/BookingSupport";
import { TimeRange } from "../../modelInterfaces/TimeRange";

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
    resourceID: resource.id,
    resourceName: resource.name,
    resourceType: resource.type,
    startDate: null,
    endDate: null,
    pickupTime: TimeRange.EARLY,
    dropoffTime: TimeRange.EARLY,
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
      startDate: start,
      endDate: end,
    });
  };

  const handleSubmit = async () => {
    const transformedBooking = transformBooking(bookingFormData);
    try {
        const response = await ApiService.createBooking(transformedBooking);
        if (response.status === 200) {

        } else {
          console.error("Failed to create booking", transformedBooking);
        }
      } catch (error) {
        console.error("Error during booking creation:", error);
      }
    
    onBookingAdded();
    onClose();
  };
  

  const transformBooking = (booking: any) => {
    const formatDate = (date: string) => {
      const newDate = new Date(date);
      return newDate.toLocaleDateString("en-CA");
    };

    return {
      resourceID: booking.resourceID,
      resourceType: booking.resourceType.toUpperCase(),
      startDate: formatDate(booking.startDate!),
      endDate: formatDate(booking.endDate!),
      pickupTime: booking.pickupTime,
      dropoffTime: booking.dropoffTime,
    };
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reserver {resource.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => e.preventDefault()}>
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
                bookingFormData.startDate
                  ? bookingFormData.startDate.toDateString()
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
                bookingFormData.endDate
                  ? bookingFormData.endDate.toDateString()
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
              value={bookingFormData.pickupTime.toString()}
              onChange={(e) =>
                setBookingData({
                  ...bookingFormData,
                  pickupTime: e.target.value as TimeRange,
                })
              }
              title="Choose Pickup Time"
            >
              <option value={TimeRange.EARLY}>{TimeRange.EARLY}</option>
              <option value={TimeRange.LATE}>{TimeRange.LATE}</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="dropoff">
            <Form.Label id="dropoff-label">Aflevering:</Form.Label>
            <Form.Control
              as="select"
              name="dropoff"
              aria-labelledby="dropoff-label"
              value={bookingFormData.dropoffTime.toString()}
              onChange={(e) =>
                setBookingData({
                  ...bookingFormData,
                  dropoffTime: e.target.value as TimeRange,
                })
              }
              title="Choose Dropoff Time"
            >
              <option value={TimeRange.EARLY}>{TimeRange.EARLY}</option>
              <option value={TimeRange.LATE}>{TimeRange.LATE}</option>
            </Form.Control>
          </Form.Group>

          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={
              !isValidDateRange(
                bookingFormData.startDate,
                bookingFormData.endDate,
                bookedDates,
                resource.capacity
              )
            }
          >
            Tilføj og Bekræft
          </Button>
          <Button variant="secondary" onClick={onClose} className="ms-2">
            Annuller
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateBookingModal;
