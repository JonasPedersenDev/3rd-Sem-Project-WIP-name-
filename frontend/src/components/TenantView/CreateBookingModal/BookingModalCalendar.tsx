import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BookingModalCalendar: React.FC<{ bookedDates: Date[] }> = ({ bookedDates }) => {
  const isBooked = (date: Date) => bookedDates.some(
      (bookedDate) => bookedDate.toDateString() === date.toDateString());

  const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;


  return (
    <div className='calendar-wrapper'>
      <Calendar
        tileClassName={({ date }) => {
          if (isWeekend(date)) {
            return 'weekend-tile';
          }
          return isBooked(date) ? 'booked-tile' : 'free-tile';
        }}
      />
      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-color booked-color"></span>
          <span>Reserveret</span>
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