import React, { useState, useEffect } from 'react';
import CaretakerBookingCard from './CaretakerBookingCard';
import { Collapse, Button } from 'react-bootstrap';

interface CaretakerBooking {
  id: string;
  name: string;
  resourceName: string;
  startDate: Date;
  endDate: Date;
  pickupTime: string;
  dropoffTime: string;
  phoneNumber: string;
  address: string;
  isFutureBooking: boolean;
}

const CaretakerBookingOverview: React.FC = () => {
  const [bookings, setBookings] = useState<CaretakerBooking[]>([]);
  const [showActive, setShowActive] = useState(true);
  const [showFuture, setShowFuture] = useState(true);
  const [showPast, setShowPast] = useState(true);
  const bookingsData: CaretakerBooking[] = [
    // Sample indtil backend kompatibel
    {
      id: '1',
      name: 'John Vestergaard Pedersen',
      resourceName: 'Boremaskine 1',
      startDate: new Date('2024-11-05'),
      endDate: new Date('2024-11-09'),
      pickupTime: '07:00 - 07:30',
      dropoffTime: '11:00 - 12:00',
      phoneNumber: '12345678',
      address: 'Den hemmelige hule',
      isFutureBooking: false,
    },
    {
      id: '2',
      name: 'Camilla Kirkegaard Jensen',
      resourceName: 'Trailer 2',
      startDate: new Date('2024-12-12'),
      endDate: new Date('2024-12-13'),
      pickupTime: '07:00 - 07:30',
      dropoffTime: '11:00 - 12:00',
      phoneNumber: '87654321',
      address: 'En tilfældig kælder',
      isFutureBooking: false,
    },
    {
      id: '3',
      name: 'Hans-Jørgen Nielsen',
      resourceName: 'Stige 1',
      startDate: new Date('2024-10-01'),
      endDate: new Date('2024-10-03'),
      pickupTime: '07:00 - 07:30',
      dropoffTime: '11:00 - 12:00',
      phoneNumber: '11111111',
      address: 'Den firkantede by',
      isFutureBooking: false,
    },
  ];

  useEffect(() => {
    setBookings(bookingsData);
    updateFutureBookings()
  }, []);

  const handleCancel = (id: string) => {
    //Logic for deleting booking in db
    setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
  };

  const updateFutureBookings = () => {
    const updatedBookings = bookingsData.map((booking) =>
      booking.startDate > currentDate ? { ...booking, isFutureBooking: true } : booking
    );
  
    setBookings(updatedBookings);
  };
  
  const currentDate = new Date();

  const activeBookings = bookings.filter((booking) => booking.startDate <= currentDate && booking.endDate >= currentDate);
  const futureBookings = bookings.filter((booking) => booking.startDate > currentDate);
  const pastBookings = bookings.filter((booking) => booking.endDate < currentDate);

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
            activeBookings.map((booking) => (<CaretakerBookingCard key={booking.id} booking={booking} onCancel={handleCancel} />))
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
            futureBookings.map((booking) => (<CaretakerBookingCard key={booking.id} booking={booking} onCancel={handleCancel} />))
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
            pastBookings.map((booking) => (<CaretakerBookingCard key={booking.id} booking={booking} onCancel={handleCancel} />))
          )}
        </div>
      </Collapse>
    </div>
  );
};

export default CaretakerBookingOverview;
