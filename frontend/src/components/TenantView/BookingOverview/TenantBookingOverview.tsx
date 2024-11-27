import React, { useState, useEffect } from 'react';
import TenantBookingCard from './TenantBookingCard';
import { Collapse, Button } from 'react-bootstrap';
import ApiService from '../../../utils/ApiService';
import { ResourceType } from "../../../utils/EnumSupport";

interface TenantBooking {
  id: number;
  tenantName: string;
  resourceName: string;
  resourceType: ResourceType;
  startDate: Date;
  endDate: Date;
  status: string;
  contactNumber: string;
  apartmentAddress: string;
  resourceID: number;
  pickupTime: string;
  dropoffTime: string;
}

const TenantBookingOverview: React.FC = () => {
  const [bookings, setBookings] = useState<TenantBooking[]>([]);
  const [showActive, setShowActive] = useState(true);
  const [showFuture, setShowFuture] = useState(true);
  const [showPast, setShowPast] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await ApiService.fetchData<any>('tenant/getOwnBookings');
        const transformedBookings: TenantBooking[] = response.data.map((booking: any) => ({
          id: booking.id,
          tenantName: booking.user.name,
          resourceName: booking.resource.name,
          startDate: new Date(booking.startDate),
          endDate: new Date(booking.endDate),
          status: booking.status,
          contactNumber: booking.user.mobileNumber,
          apartmentAddress: booking.user.houseAddress,
          resourceType: booking.resource.type,
          resourceID: booking.resource.id,
          pickupTime: booking.pickupTime,
          dropoffTime: booking.dropoffTime
        }));

        setBookings(transformedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const currentDate = new Date();

  const activeBookings = bookings.filter(
    (booking) =>
        booking.startDate <= currentDate &&
        booking.endDate >= currentDate &&
        booking.status === "CONFIRMED" ||
        booking.status === "CONFIRMED"
);

const futureBookings = bookings.filter(
    (booking) =>
        booking.startDate > currentDate &&
        booking.status === "PENDING" ||
        booking.status === "PENDING"
);

const pastBookings = bookings.filter(
    (booking) =>
        booking.endDate < currentDate &&
        booking.status === "COMPLETED" ||
        booking.status === "COMPLETED"
);

const handleCancel = async (id: number) => {
  try {
    await ApiService.cancelBooking(id);
    setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
  } catch (error) {
    console.error('Error canceling resource:', error);
  }
}


  return (
    <div className="container mt-4 border border-dark rounded mb-3">
      <h2 className="text-center mb-5">
        <strong>Reservationsoversigt</strong>
      </h2>

      {/* Current Bookings */}
      <h3>
        <Button
          variant="secondary"
          onClick={() => setShowActive(!showActive)}
          aria-controls="active-bookings-collapse"
          aria-expanded={showActive}
        >
          Nuværende Reservationer
        </Button>
      </h3>
      <hr />
      <Collapse in={showActive}>
        <div id="active-bookings-collapse">
          {activeBookings.length === 0 ? (
            <p>Ingen nuværende reservationer</p>
          ) : (
            activeBookings.map((booking) => (
              <TenantBookingCard key={booking.id} booking={booking} onCancel={handleCancel} isFuture={false} />
            ))
          )}
        </div>
      </Collapse>

      {/* Future Bookings */}
      <h3>
        <Button
          variant="secondary"
          onClick={() => setShowFuture(!showFuture)}
          aria-controls="future-bookings-collapse"
          aria-expanded={showFuture}
        >
          Fremtidige Reservationer
        </Button>
      </h3>
      <hr />
      <Collapse in={showFuture}>
        <div id="future-bookings-collapse">
          {futureBookings.length === 0 ? (
            <p>Ingen fremtidige reservationer</p>
          ) : (
            futureBookings.map((booking) => (
              <TenantBookingCard key={booking.id} booking={booking} onCancel={handleCancel} isFuture={true} />
            ))
          )}
        </div>
      </Collapse>

      {/* Past Bookings */}
      <h3>
        <Button
          variant="secondary"
          onClick={() => setShowPast(!showPast)}
          aria-controls="past-bookings-collapse"
          aria-expanded={showPast}
        >
          Tidligere Reservationer
        </Button>
      </h3>
      <hr />
      <Collapse in={showPast}>
        <div id="past-bookings-collapse">
          {pastBookings.length === 0 ? (
            <p>Ingen tidligere reservationer</p>
          ) : (
            pastBookings.map((booking) => (
              <TenantBookingCard key={booking.id} booking={booking} onCancel={handleCancel} isFuture={false}/>
            ))
          )}
        </div>
      </Collapse>
    </div>
  );
};

export default TenantBookingOverview;
