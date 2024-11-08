import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import BookingDate from "../../modelInterfaces/BookingDate";

interface BookingModalCalendarProps {
  bookedDates: BookingDate[];
  onDateChange: (start: Date | null, end: Date | null) => void;
  resourceCapacity: number;
}

const BookingModalCalendar: React.FC<BookingModalCalendarProps> = ({
  bookedDates,
  onDateChange,
  resourceCapacity,
}) => {
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isBooked = (date: Date) => {
    const booked = bookedDates.find(
      (booked) => new Date(booked.date).toDateString() === date.toDateString()
    );
    return booked ? booked.amount >= resourceCapacity : false;
  };

  const isWeekend = (date: Date) => {
    return date.getDay() === 0 || date.getDay() === 6;
  };

  const isBeforeToday = (date: Date) => {
    return date < today;
  };

  const isInRange = (date: Date) => {
    return (
      selectedStart &&
      selectedEnd &&
      date >= selectedStart &&
      date < selectedEnd
    );
  };

  const handleDateClick = (date: Date) => {
    if (!selectedStart || (selectedStart && selectedEnd)) {
      // Set start date if none selected, or if both start and end are selected
      setSelectedStart(date);
      setSelectedEnd(null);
      onDateChange(date, null); // Notify parent component of start date selection
    } else {
      // Set end date if start date is already selected
      if (date > selectedStart) {
        setSelectedEnd(date);
        onDateChange(selectedStart, date); // Notify parent component of start and end date selection
      } else {
        // If selected end date is before start, reset start and end
        setSelectedStart(date);
        setSelectedEnd(null);
        onDateChange(date, null);
      }
    }
  };

  return (
    <div className="calendar-wrapper">
      <Calendar
        tileClassName={({ date }) => {
          if (isWeekend(date)) {
            return "weekend-tile";
          }
          if (isBeforeToday(date)) {
            return 'unavailable-tile';
          }
          if (isBooked(date)) {
            return "booked-tile";
          }
          if (isInRange(date)) {
            return "range-tile"; // Apply blue color for dates in the range
          }
          return "free-tile";
        }}
        onClickDay={handleDateClick} // Handle date clicks to set start and end dates
        tileDisabled={({ date }) => isBeforeToday(date)}
      />
      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-color booked-color"></span>
          <span>Reserveret</span>
        </div>
        <div className="legend-item">
          <span className="legend-color range-color"></span>
          <span>Valgt periode</span>
        </div>
        <div className="legend-item">
          <span className="legend-color currentday-color"></span>
          <span> Dags dato</span>
        </div>
        <div className="legend-item">
          <span className="legend-color unavailable-color"></span>
          <span>Weekend (Kan ikke reserveres)</span>
        </div>
      </div>
    </div>
  );
};

export default BookingModalCalendar;
