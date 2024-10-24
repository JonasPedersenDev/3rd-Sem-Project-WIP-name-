import React, { useState } from 'react';

interface Booking {
  id: string;
  resourceName: string;
  bookStartTime: Date;
  bookEndTime: Date;
  pickupTime: Date;
  dropoffTime: Date;
}

interface BookingCardProps {
  booking: Booking;
  onEdit: (id: string, updatedBooking: Booking) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBooking, setEditedBooking] = useState<Booking>(booking);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedBooking({
      ...editedBooking,
      [name]: name.includes('Time') ? new Date(value) : value,
    });
  };

  const handleSave = () => {
    onEdit(booking.id, editedBooking);
    setIsEditing(false);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        {isEditing ? (
          <div>
            <input
              value={editedBooking.resourceName}
              className="form-control mb-2"
              disabled
            />
            <input
              type="datetime-local"
              name="bookStartTime"
              value={editedBooking.bookStartTime.toISOString().substring(0, 16)}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="datetime-local"
              name="bookEndTime"
              value={editedBooking.bookEndTime.toISOString().substring(0, 16)}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="datetime-local"
              name="pickupTime"
              value={editedBooking.pickupTime.toISOString().substring(0, 16)}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="datetime-local"
              name="dropoffTime"
              value={editedBooking.dropoffTime.toISOString().substring(0, 16)}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <button onClick={handleSave} className="btn btn-success me-2">
              Gem
            </button>
            <button onClick={() => setIsEditing(false)} className="btn btn-danger">
              Anuller
            </button>
          </div>
        ) : (
          <div>
            <h5 className="card-title">{booking.resourceName}</h5>
            <p className="card-text">Booking Start: {booking.bookStartTime.toLocaleString()}</p>
            <p className="card-text">Booking Slut: {booking.bookEndTime.toLocaleString()}</p>
            <p className="card-text">Afhenting: {booking.pickupTime.toLocaleString()}</p>
            <p className="card-text">Aflevering: {booking.dropoffTime.toLocaleString()}</p>
            <button onClick={() => setIsEditing(true)} className="btn btn-secondary">
              Rediger
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
