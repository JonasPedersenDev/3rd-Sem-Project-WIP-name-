import React from 'react';
import Calendar from 'react-calendar';

const BookingModalCalendar: React.FC<{ bookedDates: Date[] }> = ({ bookedDates }) => {
  const isBooked = (date: Date) =>
    bookedDates.some(
      (bookedDate) =>
        bookedDate.toDateString() === date.toDateString()
    );

  const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

  return (
    <Calendar
      tileClassName={({ date }) => {
        if (isWeekend(date)) {
          return 'weekend-tile';
        }
        return isBooked(date) ? 'booked-tile' : 'free-tile';
      }}
    />
  );
};

export default BookingModalCalendar;