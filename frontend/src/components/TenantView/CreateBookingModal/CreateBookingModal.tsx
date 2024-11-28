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
  booking: Booking | null;
  show: boolean;
  onBookingAdded: () => void;
  onClose: () => void;
  editBooking?: boolean;
}

const CreateBookingModal: React.FC<CreateBookingModalProps> = ({
  resource,
  booking,
  show,
  onBookingAdded,
  onClose,
  editBooking,
}) => {
  const [bookedDates, setBookedDates] = useState<BookingDate[]>([]);
  const [bookingFormData, setBookingData] = useState<Booking>(booking ? booking : {
    id: 0,
    resourceID: resource.id,
    resourceName: resource.name,
    resourceType: resource.type,
    startDate: null,
    endDate: null,
    pickupTime: TimeRange.EARLY,
    dropoffTime: TimeRange.EARLY,
    status: null
   });

   const fetchBookedDates = async () => {
    try {
      const response = await ApiService.fetchBookings(resource.type, resource.id);
      console.log("Booked dates response:", response);
      setBookedDates(response.data);
    } catch (error) {
      console.error("Failed to fetch booked dates:", error);
    }
  };

  useEffect(() => {
    const fetchDates = async () => {
      await fetchBookedDates();
    };
    fetchDates();
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
      let response;
      if (editBooking && booking) {
        response = await ApiService.updateData(`tenant/editBooking/${booking.id}`, transformedBooking);
      } else {
        response = await ApiService.createBooking(transformedBooking);
      }
  
      if (response.status === 200) {
        await fetchBookedDates();
        onBookingAdded();
        onClose();
      } else {
        console.error("Failed to process booking", transformedBooking);
      }
    } catch (error) {
      console.error("Error during booking creation/update:", error);
    }
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

  const isBookingInProgress = (booking: Booking | null) => {
    if (!booking) return undefined;
    return ( booking.status === "CONFIRMED" || booking.status === "LATE");
  }

  const isBookingCompleted = (booking: Booking | null) => {
    if (!booking) return undefined;
    return ( booking.status === "COMPLETED" || booking.status === "CANCELLED");
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
              initialStartDate={booking ? booking.startDate : null}
              initialEndDate={booking ? booking.endDate : null}
              inProgress={isBookingInProgress(booking)}
              isDone={isBookingCompleted(booking)}
            />
          </div>

          <Form.Group controlId="bookstart">
            <Form.Label>Reservation Start:</Form.Label>
            <Form.Control
              type="text"
              readOnly
              disabled
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
              disabled
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
              disabled={isBookingInProgress(booking)}
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
              disabled={isBookingCompleted(booking)}
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
