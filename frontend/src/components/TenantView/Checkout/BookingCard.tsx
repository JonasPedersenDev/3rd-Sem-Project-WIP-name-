import React, { useState } from 'react';

interface Booking {
  id: string;
  resourceName: string;
  bookStartTime: Date;
  bookEndTime: Date;
  pickup: string;
  dropoff: string;
}

interface BookingCardProps {
  booking: Booking;
  onEdit: (id: string, updatedBooking: Booking) => void;
  onRemove: (id: string) => void; 
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onEdit, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBooking, setEditedBooking] = useState<Booking>(booking);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
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
            <select
              name="pickup"
              value={editedBooking.pickup}
              className="form-control mb-2"
              onChange= {handleChange}
            >
              <option value="7:00-7:30">7:00 - 7:30</option>
              <option value="11:00-12:00">11:00 - 12:00</option>
            </select>
            <select
              name="dropoff"
              value={editedBooking.dropoff}
              className="form-control mb-2"
              onChange= {handleChange}
            >
              <option value="7:00-7:30">7:00 - 7:30</option>
              <option value="11:00-12:00">11:00 - 12:00</option>
            </select>
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
            <p className="card-text">Afhenting: {booking.pickup}</p>
            <p className="card-text">Aflevering: {booking.dropoff}</p>
            <button onClick={() => setIsEditing(true)} className="btn btn-secondary">
              Rediger
            </button>
            <button onClick={() => onRemove(booking.id)} className="btn btn-danger">
              Fjern
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
