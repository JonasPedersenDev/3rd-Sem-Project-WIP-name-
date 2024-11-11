import React from 'react';

// booking structure + image of the ressource
interface Booking {
  id: string;
  resourceName: string;
  bookStartTime: Date;
  bookEndTime: Date;
  pickup: string;
  dropoff: string;
  imageUrl?: string; 
}

interface BookingOverviewProps {
  currentBookings: Booking[];
  upcomingBookings: Booking[];
  pastBookings: Booking[];
  onRemove: (id: string) => void;
}

// renders each booking, displays its details + cancel button
const BookingCard: React.FC<{ booking: Booking; onRemove: (id: string) => void }> = ({ booking, onRemove }) => (
  <div className="card mb-3">
    <div className="card-body">
      <h5 className="card-title">{booking.resourceName}</h5>
      {booking.imageUrl && <img src={booking.imageUrl} alt={booking.resourceName} style={{ width: '100px', height: '100px' }} className="mb-2" />}
      <p className="card-text">Afhentningstidspunkt: {booking.bookStartTime.toLocaleString()}</p>
      <p className="card-text">Afleveringsdato: {booking.bookEndTime.toLocaleString()}</p>
      <p className="card-text">Afhenting: {booking.pickup}</p>
      <p className="card-text">Aflevering: {booking.dropoff}</p>
      <button onClick={() => onRemove(booking.id)} className="btn btn-danger">Annuller</button>
    </div>
  </div>
);

// upcoming, current and past bookings otherwise a message is displayed
const BookingOverview: React.FC<BookingOverviewProps> = ({ currentBookings, upcomingBookings, pastBookings, onRemove }) => (
  <div>
    <h2>Dine Bookings</h2>

    <section>
      <h3>Nuværende bookings</h3>
      {currentBookings.length > 0 ? (
        currentBookings.map((booking) => <BookingCard key={booking.id} booking={booking} onRemove={onRemove} />)
      ) : (
        <p>Ingen nuværende bookings.</p>
      )}
    </section>

    <section>
      <h3>Kommende bookings</h3>
      {upcomingBookings.length > 0 ? (
        upcomingBookings.map((booking) => <BookingCard key={booking.id} booking={booking} onRemove={onRemove} />)
      ) : (
        <p>Ingen kommende bookings.</p>
      )}
    </section>

    <section>
      <h3>Tidligere bookings</h3>
      {pastBookings.length > 0 ? (
        pastBookings.map((booking) => <BookingCard key={booking.id} booking={booking} onRemove={onRemove} />)
      ) : (
        <p>Ingen tidligere bookings.</p>
      )}
    </section>
  </div>
);

export default BookingOverview;
