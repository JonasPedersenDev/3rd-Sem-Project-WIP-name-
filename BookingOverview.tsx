import React from 'react';
import BookingItem from './BookingItem';

function BookingsOverview({ bookings }) {
  return (
    <div>
      <h2>Your Bookings</h2>
      <section>
        <h3>Current Bookings</h3>
        {bookings.current.map(booking => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </section>
      <section>
        <h3>Upcoming Bookings</h3>
        {bookings.upcoming.map(booking => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </section>
      <section>
        <h3>Past Bookings</h3>
        {bookings.past.map(booking => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </section>
    </div>
  );
}

export default BookingsOverview;
