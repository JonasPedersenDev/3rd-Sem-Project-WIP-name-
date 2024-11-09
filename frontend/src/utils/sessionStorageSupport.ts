import Booking from "../components/modelInterfaces/Booking";

const getBookingList = (): Booking[] => {
  const bookingsString = sessionStorage.getItem("bookingList");
  if (!bookingsString) return [];
  
  return JSON.parse(bookingsString).map((booking: any) => ({
    ...booking,
    bookStartDate: booking.bookStartDate ? new Date(booking.bookStartDate) : null,
    bookEndDate: booking.bookEndDate ? new Date(booking.bookEndDate) : null,
  }));
};

const saveBookingList = (bookingList: Booking[]): void => {
  sessionStorage.setItem("bookingList", JSON.stringify(bookingList));
};

const dispatchBookingsUpdatedEvent = (): void => {
  const event = new Event("bookingsUpdated");
  window.dispatchEvent(event);
};

export const getBookingCount = (): number => {
  const bookings = getBookingList();
  return bookings.length;
};

export const addBookingToSessionStorage = (booking: Booking): void => {
  const bookingList = getBookingList();
  bookingList.push(booking);
  saveBookingList(bookingList);
  dispatchBookingsUpdatedEvent();
};

export const loadBookingsFromSessionStorage = (): Booking[] => {
  return getBookingList();
};

export const updateBookingInSessionStorage = (id: number, updatedBooking: Booking): void => {
  const bookingList = getBookingList();
  const updatedBookings = bookingList.map((booking) =>
    booking.id === id ? updatedBooking : booking
  );
  saveBookingList(updatedBookings);
  dispatchBookingsUpdatedEvent();
};

export const removeBookingFromSessionStorage = (id: number): void => {
  const bookingList = getBookingList();
  const updatedBookings = bookingList.filter((booking) => booking.id !== id);
  saveBookingList(updatedBookings);
  dispatchBookingsUpdatedEvent();
};
