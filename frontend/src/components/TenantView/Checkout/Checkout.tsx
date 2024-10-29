import React, { useState, useEffect } from 'react';
import BookingCard from './BookingCard';

interface Booking {
  id: string;
  resourceName: string;
  bookStartTime: Date;
  bookEndTime: Date;
  pickup: string;
  dropoff: string;
}

const Checkout: React.FC = () => {

  
  let [bookings, setBookings] = useState<Booking[]>([]);
  
  //Load bookings from session storage
  useEffect(() => {
    const bookingsString = window.sessionStorage.getItem("bookingList");
    if (bookingsString) {
      const loadedBookings: Booking[] = JSON.parse(bookingsString).map((booking: any) => ({
        ...booking,
        bookStartTime: new Date(booking.bookStartTime), // Convert back to Date
        bookEndTime: new Date(booking.bookEndTime),     // Convert back to Date
      }));
      setBookings(loadedBookings);
    }
  }, []); // Empty, so it only loads once

  console.log(bookings.length)

  const handleEdit = (id: string, updatedBooking: Booking) => {
    setBookings(prevBookings => {
      const updatedBookings = prevBookings.map(booking => 
        booking.id === id ? updatedBooking : booking
      );
      window.sessionStorage.setItem("bookingList", JSON.stringify(updatedBookings));
      return updatedBookings; 
    });
  };

  const handleRemove = (id: string) => {
    setBookings(prevBookings => {
      const updatedBookings = prevBookings.filter(booking => booking.id !== id);
      window.sessionStorage.setItem("bookingList", JSON.stringify(updatedBookings));
      return updatedBookings;
    });
  };

  const handleFinalize = () => {
    //Logic to verify with database 
    console.log('Bookings finalized:', bookings);
  };

  return (
    <div className="container mt-4 border border-darkgrey border-4 rounded">
      <h2 className="text-center mb-4">Dine Ubekræftede Reservationer</h2> {/*Bad name, need to change */}
      {bookings.length === 0 ? (
        <p>Ingen reservationer endnu</p>
      ) :
        bookings.map(booking => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onEdit={handleEdit}
          onRemove={handleRemove}
        />
      ))}
      {bookings.length !== 0 && (
        <button onClick={handleFinalize} className="btn btn-primary w-100 mt-3">
        Bekræft
        </button>
      )}
    </div>
  );
};

export default Checkout;