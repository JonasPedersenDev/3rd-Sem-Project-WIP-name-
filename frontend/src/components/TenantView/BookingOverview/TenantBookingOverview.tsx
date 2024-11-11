import React, { useState, useEffect } from 'react';
import TenantBookingCard from './TenantBookingCard';
import { Collapse, Button } from 'react-bootstrap';

interface TenantBooking {
  id: number;
  tenantName: string;
  resourceName: string;
  startDate: Date;
  endDate: Date;
  contactNumber: string;
  apartmentAddress: string;
  isCurrentTenant: boolean;
  imageUrl: string;
}

const TenantBookingOverview: React.FC = () => {
  const [bookings, setBookings] = useState<TenantBooking[]>([
    {
      id: 1,
      tenantName: 'Mikkel Hansen',
      resourceName: 'Boremaskine', 
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-02'),
      contactNumber: '31234567',
      apartmentAddress: 'Kanalvej 12, 9000 Aalborg',
      isCurrentTenant: new Date() < new Date('2024-01-02'),
      imageUrl: 'https://github.com/JonasPedersenDev/Himmerland-booking-system/blob/main/backend/src/main/resources/database/img/resourcePictures/Skruetr%C3%A6kker.jpg?raw=true'
    },
    {
      id: 2,
      tenantName: 'Sofie Jensen',
      resourceName: 'Boremaskine', 
      startDate: new Date('2024-02-15'),
      endDate: new Date('2024-02-16'),
      contactNumber: '87654321',
      apartmentAddress: 'Kanalvej 58, 9000 Aalborg',
      isCurrentTenant: new Date() < new Date('2024-02-16'),
      imageUrl: 'https://github.com/JonasPedersenDev/Himmerland-booking-system/blob/main/backend/src/main/resources/database/img/resourcePictures/Skruetr%C3%A6kker.jpg?raw=true'
    }
  ]);
  const [showActive, setShowActive] = useState(true);
  const [showFuture, setShowFuture] = useState(true);
  const [showPast, setShowPast] = useState(true);

  useEffect(() => {
    // Assume bookings are fetched and then sorted
    const updatedBookings = bookings.map(booking => ({
      ...booking,
      isCurrentTenant: new Date() >= booking.startDate && new Date() <= booking.endDate
    }));
    setBookings(updatedBookings);
  }, []);

  const handleTerminate = (id: number) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
  };

  const handleExtend = (id: number, newEndDate: Date) => {
    setBookings(prev => prev.map(booking => booking.id === id ? {...booking, endDate: newEndDate} : booking));
  };

  return (
    <div className="container mt-4 border border-dark rounded mb-3">
      <h2 className="text-center mb-5"><strong>Lejeres Reservationsoversigt</strong></h2>
      {/* Current Reservations */}
      <h3>
        <Button
          variant="secondary"
          onClick={() => setShowActive(!showActive)}
          aria-controls="active-bookings-collapse"
          aria-expanded={showActive}
        >
          Nuværende Reservationer
        </Button>
      </h3>
      <hr />
      <Collapse in={showActive}>
        <div id="active-bookings-collapse">
          {bookings.filter(booking => booking.isCurrentTenant).length === 0 ? <p>Ingen nuværende reservationer</p> :
            bookings.filter(booking => booking.isCurrentTenant).map(booking => (
              <TenantBookingCard key={booking.id} booking={booking} onTerminate={handleTerminate} onExtend={handleExtend} />
            ))
          }
        </div>
      </Collapse>

      {/* Future Reservations */}
      <h3>
        <Button
          variant="secondary"
          onClick={() => setShowFuture(!showFuture)}
          aria-controls="future-bookings-collapse"
          aria-expanded={showFuture}
        >
          Fremtidige Reservationer
        </Button>
      </h3>
      <hr />
      <Collapse in={showFuture}>
        <div id="future-bookings-collapse">
          {bookings.filter(booking => new Date() < booking.startDate).length === 0 ? <p>Ingen fremtidige reservationer</p> :
            bookings.filter(booking => new Date() < booking.startDate).map(booking => (
              <TenantBookingCard key={booking.id} booking={booking} onTerminate={handleTerminate} onExtend={handleExtend} />
            ))
          }
        </div>
      </Collapse>

      {/* Past Reservations */}
      <h3>
        <Button
          variant="secondary"
          onClick={() => setShowPast(!showPast)}
          aria-controls="past-bookings-collapse"
          aria-expanded={showPast}
        >
          Tidligere Reservationer
        </Button>
      </h3>
      <hr />
      <Collapse in={showPast}>
        <div id="past-bookings-collapse">
          {bookings.filter(booking => new Date() > booking.endDate).length === 0 ? <p>Ingen tidligere reservationer</p> :
            bookings.filter(booking => new Date() > booking.endDate).map(booking => (
              <TenantBookingCard key={booking.id} booking={booking} onTerminate={handleTerminate} onExtend={handleExtend} />
            ))
          }
        </div>
      </Collapse>
    </div>
  );
};

export default TenantBookingOverview;
