/* package com.auu_sw3_6.Himmerland_booking_software.api.model;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.mock;

import com.auu_sw3_6.Himmerland_booking_software.api.model.modelEnum.BookingStatus;

public class BookingTest {

    private Booking booking;
    private Resource resource;
    private User user;

    @BeforeEach
    public void setUp() {
        resource = mock(Resource.class);
        user = mock(User.class);

        booking = new Booking(resource, user, LocalDate.of(2024, 1, 1), LocalDate.of(2024, 1, 3),
                LocalTime.of(9, 0), LocalTime.of(17, 0), BookingStatus.CONFIRMED);
    }

    @Test
    public void testConstructor_ShouldInitializeFields() {
        // Act & Assert
        assertNotNull(booking);
        assertEquals(resource, booking.getResource(), "Resource should match the expected resource.");
        assertEquals(user, booking.getUser(), "User should match the expected user.");
        assertEquals(LocalDate.of(2024, 1, 1), booking.getStartDate(), "Start date should be January 1, 2024.");
        assertEquals(LocalDate.of(2024, 1, 3), booking.getEndDate(), "End date should be January 3, 2024.");
        assertEquals(LocalTime.of(9, 0), booking.getPickupTime(), "Pickup time should be 09:00.");
        assertEquals(LocalTime.of(17, 0), booking.getDropoffTime(), "Dropoff time should be 17:00.");
        assertEquals(BookingStatus.CONFIRMED, booking.getStatus(), "Booking status should be CONFIRMED.");
    }

    @Test
    public void testSetters_ShouldUpdateFields() {
        // Arrange
        Resource newResource = mock(Resource.class);
        User newUser = mock(User.class);

        // Act
        booking.setResource(newResource);
        booking.setUser(newUser);
        booking.setStartDate(LocalDate.of(2024, 2, 1));
        booking.setEndDate(LocalDate.of(2024, 2, 5));
        booking.setPickupTime(LocalTime.of(10, 0));
        booking.setDropoffTime(LocalTime.of(18, 0));
        booking.setStatus(BookingStatus.CANCELED);

        // Assert
        assertEquals(newResource, booking.getResource(), "Resource should be updated.");
        assertEquals(newUser, booking.getUser(), "User should be updated.");
        assertEquals(LocalDate.of(2024, 2, 1), booking.getStartDate(), "Start date should be updated to February 1, 2024.");
        assertEquals(LocalDate.of(2024, 2, 5), booking.getEndDate(), "End date should be updated to February 5, 2024.");
        assertEquals(LocalTime.of(10, 0), booking.getPickupTime(), "Pickup time should be updated to 10:00.");
        assertEquals(LocalTime.of(18, 0), booking.getDropoffTime(), "Dropoff time should be updated to 18:00.");
        assertEquals(BookingStatus.CANCELED, booking.getStatus(), "Booking status should be updated to CANCELLED.");
    }
}
 */