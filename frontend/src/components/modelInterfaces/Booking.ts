export default interface Booking {
    id: string;
    resourceName: string;
    bookStartTime: Date | null;
    bookEndTime: Date | null;
    pickup: string;
    dropoff: string;
  }