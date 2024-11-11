import React, { useState } from "react";
import Booking from "../../modelInterfaces/Booking";
import { TimeRange } from "../../modelInterfaces/TimeRange";

interface BookingCardProps {
  booking: Booking;
  onEdit: (id: number, updatedBooking: Booking) => void;
  onRemove: (id: number) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onEdit,
  onRemove,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBooking, setEditedBooking] = useState<Booking>(booking);

  const parseDate = (date: string | Date | null): string => {
    return date ? new Date(date).toLocaleDateString() : "N/A";
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedBooking({
      ...editedBooking,
      [name]: name.includes("Time") ? new Date(value) : value,
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
            <label
              htmlFor={`resourceName-${booking.id}`}
              className="form-label"
            >
              Resource Name
            </label>
            <input
              id={`resourceName-${booking.id}`}
              value={editedBooking.resourceName}
              className="form-control mb-2"
              disabled
              aria-label="Resource Name"
            />

            <label
              htmlFor={`bookStartTime-${booking.id}`}
              className="form-label"
            >
              Reservation Start Dato
            </label>
            <input
              type="date"
              id={`bookStartTime-${booking.id}`}
              name="bookStartTime"
              value={parseDate(booking.startDate)}
              onChange={handleChange}
              className="form-control mb-2"
              aria-label="Booking Start Time"
            />

            <label htmlFor={`bookEndTime-${booking.id}`} className="form-label">
              Reservation Slut Dato
            </label>
            <input
              type="date"
              id={`bookEndTime-${booking.id}`}
              name="bookEndTime"
              value={parseDate(booking.endDate)}
              onChange={handleChange}
              className="form-control mb-2"
              aria-label="Booking End Time"
            />

            <label htmlFor={`pickup-${booking.id}`} className="form-label">
              Afhentningstid
            </label>
            <select
              id={`pickup-${booking.id}`}
              name="pickup"
              value={editedBooking.pickupTime.toString()}
              className="form-control mb-2"
              onChange={handleChange}
              aria-label="Pickup Time"
            >
              <option value={TimeRange.EARLY}>{TimeRange.EARLY}</option>
              <option value={TimeRange.LATE}>{TimeRange.LATE}</option>
            </select>

            <label htmlFor={`dropoff-${booking.id}`} className="form-label">
              Afleveringstid
            </label>
            <select
              id={`dropoff-${booking.id}`}
              name="dropoff"
              value={editedBooking.dropoffTime.toString()}
              className="form-control mb-2"
              onChange={handleChange}
              aria-label="Dropoff Time"
            >
              <option value={TimeRange.EARLY}>{TimeRange.EARLY}</option>
              <option value={TimeRange.LATE}>{TimeRange.LATE}</option>
            </select>

            <button onClick={handleSave} className="btn btn-success me-2">
              Gem
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-danger"
            >
              Anuller
            </button>
          </div>
        ) : (
          <div>
            <h5 className="card-title">{booking.resourceName}</h5>
            <p className="card-text">
              Reservation Start: {parseDate(booking.startDate)}
            </p>
            <p className="card-text">
              Reservation Slut: {parseDate(booking.endDate)}
            </p>
            <p className="card-text">Afhentningstid: {booking.pickupTime.toString()}</p>
            <p className="card-text">Afleveringstid: {booking.dropoffTime.toString()}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-secondary"
            >
              Rediger
            </button>
            <button
              onClick={() => onRemove(booking.id)}
              className="btn btn-danger"
            >
              Fjern
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default BookingCard;
