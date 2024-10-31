import React from 'react';
import BookingItem from './BookingItem';

function BookingsOverview({ bookings }) {
  return (
    <div>
      <h2>Dine Bookings</h2>
      <section>
        <h3>Nuværende Bookings</h3>
        {bookings.nuværende.map(booking => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </section>
      <section>
        <h3>Kommende Bookings</h3>
        {bookings.kommende.map(booking => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </section>
      <section>
        <h3>Tidligere Bookings</h3>
        {bookings.tidligere.map(booking => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </section>
    </div>
  );
}

export default BookingsOverview;
