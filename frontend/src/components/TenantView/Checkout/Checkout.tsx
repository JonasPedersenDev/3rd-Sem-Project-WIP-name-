import React, { useState, useEffect } from "react";
import BookingCard from "./BookingCard";
import { Link } from "react-router-dom";
import Booking from "../../modelInterfaces/Booking";
import {
  loadBookingsFromSessionStorage,
  updateBookingInSessionStorage,
  removeBookingFromSessionStorage,
} from "../../../utils/sessionStorageSupport";

const Checkout: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load bookings from session storage on mount
  useEffect(() => {
    setBookings(loadBookingsFromSessionStorage());
  }, []);

  const handleEdit = (id: number, updatedBooking: Booking) => {
    updateBookingInSessionStorage(id, updatedBooking);
    setBookings(loadBookingsFromSessionStorage());
  };

  const handleRemove = (id: number) => {
    removeBookingFromSessionStorage(id);
    setBookings(loadBookingsFromSessionStorage());
  };

  const handleFinalize = () => {
    console.log("Bookings finalized:", bookings);
  };

  return (
    <div className="container mt-4 border border-darkgrey border-4 rounded">
      <h2 className="text-center mb-4"><strong>Dine Ubekræftede Reservationer</strong></h2>
      {bookings.length === 0 ? (
        <p>Ingen reservationer endnu</p>
      ) : (
        bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onEdit={handleEdit}
            onRemove={handleRemove}
          />
        ))
      )}
      {bookings.length !== 0 && (
        <button onClick={handleFinalize} className="btn btn-primary w-100 mt-3">
          Bekræft
        </button>
      )}
      <Link to="/ressource-overblik">Go to Admin</Link>
      <Link to="/admin-overblik">Go to Admin</Link>
    </div>
  );
};

export default Checkout;
