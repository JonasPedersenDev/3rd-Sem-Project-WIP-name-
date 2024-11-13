import React, { useState, useEffect } from 'react';
import CaretakerBookingCard from './CaretakerBookingCard';
import { Collapse, Button } from 'react-bootstrap';
import Booking from '../../modelInterfaces/Booking';
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
  status: string;
  isFutureBooking: boolean;
  isPastBooking: boolean;
}

const CaretakerBookingOverview: React.FC = () => {
  const [bookings, setBookings] = useState<CaretakerBooking[]>([]);
  const [showActive, setShowActive] = useState(true);
  const [showFuture, setShowFuture] = useState(true);
  const [showPast, setShowPast] = useState(true);
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsResponse = await ApiService.fetchData<any>("booking/get-all");
        console.log("booking response:", bookingsResponse);
  
        // Transform the API response into CaretakerBooking objects
        const transformedBookings: CaretakerBooking[] = bookingsResponse.data.map((booking: any) => ({
            id: booking.id.toString(),
            name: booking.user.name,
            resourceName: booking.resource.name,
            startDate: new Date(booking.startDate[0], booking.startDate[1] - 1, booking.startDate[2]),
            endDate: new Date(booking.endDate[0], booking.endDate[1] - 1, booking.endDate[2]),
            status: booking.status,
            pickupTime: booking.pickupTime,
            dropoffTime: booking.dropoffTime,
            phoneNumber: booking.user.mobile,
            email: booking.user.email, // Replace with address if available
            isFutureBooking: false, // This will be updated later
            isPastBooking: false, 
          })
        );
        
  
        // Update state with the transformed bookings
        setBookings(transformedBookings);
        updateFutureBookings(transformedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
  
    fetchBookings();
  }, []);


  const handleCancel = async (id: number) => {
    try {
      await ApiService.deleteBooking(id);
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  const onBookingComplete = (id: number) => {
    const updatedBookings = bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "COMPLETED", isPastBooking: true } : booking
    );
    setBookings(updatedBookings);
    updateFutureBookings(updatedBookings); 
};

  const updateFutureBookings = (bookings: CaretakerBooking[]) => {
    const updatedBookings = bookings.map((booking) => ({
        ...booking,
        isFutureBooking: booking.startDate > currentDate,
        isPastBooking: booking.endDate < currentDate || booking.status === "COMPLETED",
    }));

    setBookings(updatedBookings);
};
  
  const currentDate = new Date();

  const activeBookings = bookings.filter((booking) =>
    booking.startDate <= currentDate && booking.endDate >= currentDate && booking.status !== "COMPLETED");
  const futureBookings = bookings.filter((booking) => 
    booking.startDate > currentDate);
  const pastBookings = bookings.filter((booking) =>
    booking.endDate < currentDate || booking.status === "COMPLETED");

  return (
    <div className="container mt-4 border border-darkgrey border-4 rounded mb-3">
      <h2 className="text-center mb-5"><strong>Reservationer</strong></h2>
      {/* Active Bookings */}
      <h3>
        <Button
          variant="secondary"
          onClick={() => setShowActive(!showActive)}
          aria-controls="active-bookings-collapse"
          aria-expanded={showActive}
          className="fs-5"
        >
          Nuverænde reservationer
        </Button>
      </h3> <hr />
      <Collapse in={showActive}>
        <div id="active-bookings-collapse">
          {activeBookings.length === 0 ? (
            <p>Ingen nuværende reservationer</p>
          ) : (
            activeBookings.map((booking) => (<CaretakerBookingCard key={booking.id} booking={booking} onCancel={handleCancel} onComplete={onBookingComplete} />))
          )}
        </div>
      </Collapse>

      {/* Future Bookings */}
      <h3>
        <Button
          variant="secondary"
          onClick={() => setShowFuture(!showFuture)}
          aria-controls="future-bookings-collapse"
          aria-expanded={showFuture}
          className="fs-5"
        >
          Kommende reservationer
        </Button>
      </h3> <hr />
      <Collapse in={showFuture}>
        <div id="future-bookings-collapse">
          {futureBookings.length === 0 ? (
            <p>Ingen kommende reservationer</p>
          ) : (
            futureBookings.map((booking) => (<CaretakerBookingCard key={booking.id} booking={booking} onCancel={handleCancel} onComplete={onBookingComplete} />))
          )}
        </div>
      </Collapse>

      {/* Past Bookings */}
      <h3>
        <Button
          variant="secondary"
          onClick={() => setShowPast(!showPast)}
          aria-controls="past-bookings-collapse"
          aria-expanded={showPast}
          className="fs-5"
        >
          Tidligere reservationer
        </Button>
      </h3> <hr />
      <Collapse in={showPast}>
        <div id="past-bookings-collapse">
          {pastBookings.length === 0 ? (
            <p>Ingen tidligere reservationer</p>
          ) : (
            pastBookings.map((booking) => (<CaretakerBookingCard key={booking.id} booking={booking} onCancel={handleCancel} onComplete={onBookingComplete} />))
          )}
        </div>
      </Collapse>
    </div>
  );
};

export default CaretakerBookingOverview;
