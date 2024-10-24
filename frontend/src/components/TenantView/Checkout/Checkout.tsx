import React, { useState } from 'react';
import BookingCard from './BookingCard';

interface Booking {
  id: string;
  resourceName: string;
  bookStartTime: Date;
  bookEndTime: Date;
  pickupTime: Date;
  dropoffTime: Date;
}

const Checkout: React.FC = () => {

  //Sample Data
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      resourceName: 'Boremaskine',
      bookStartTime: new Date('2024-11-01T10:00:00'),
      bookEndTime: new Date('2024-11-01T12:00:00'),
      pickupTime: new Date('2024-11-01T09:30:00'),
      dropoffTime: new Date('2024-11-01T12:30:00'),
    },
    {
      id: '2',
      resourceName: 'Gæstehus',
      bookStartTime: new Date('2024-12-01T14:00:00'),
      bookEndTime: new Date('2024-12-02T10:00:00'),
      pickupTime: new Date('2024-12-01T13:00:00'),
      dropoffTime: new Date('2024-12-02T11:00:00'),
    },
  ]);

  const handleEdit = (id: string, updatedBooking: Booking) => {
    setBookings(prevBookings =>
      prevBookings.map(booking => (booking.id === id ? updatedBooking : booking))
    );
  };

  const handleFinalize = () => {
    //Logic to verify with database 
    console.log('Bookings finalized:', bookings);
  };

  return (
    <div className="container mt-4 border border-darkgrey border-4 rounded">
      <h2 className="text-center mb-4">Dine Bookings</h2> {/*Bad name, need to change */}
      {bookings.map(booking => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onEdit={handleEdit}
        />
      ))}
      <button onClick={handleFinalize} className="btn btn-primary w-100 mt-3">
        Bekræft
      </button>
    </div>
  );
};

export default Checkout;