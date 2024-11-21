package com.auu_sw3_6.Himmerland_booking_software.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Booking;
import com.auu_sw3_6.Himmerland_booking_software.api.model.Resource;
import com.auu_sw3_6.Himmerland_booking_software.api.model.User;
import com.auu_sw3_6.Himmerland_booking_software.api.model.modelEnum.BookingStatus;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.BookingRepository;
import com.auu_sw3_6.Himmerland_booking_software.exception.ResourceNotFoundException;

@ExtendWith(MockitoExtension.class)
public class BookingServiceTest {

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private ResourceServiceFactory resourceServiceFactory;

    @Mock
    private ResourceService<Resource> resourceService;

    @InjectMocks
    private BookingService bookingService;

    private Booking booking;
    private Resource resource;
    private User user;

    private static class TestUser extends User {
        
    }

    private static class TestResource extends Resource {
        
    }

    @BeforeEach
    public void setUp() {
        user = new TestUser();
        user.setId(1L);

        resource = new TestResource();
        resource.setId(1L);
        resource.setCapacity(5);

        booking = new Booking();
        booking.setId(1L);
        booking.setUser(user);
        booking.setResource(resource);
        booking.setStartDate(LocalDate.now().plusDays(1));
        booking.setEndDate(LocalDate.now().plusDays(3));
        booking.setStatus(BookingStatus.PENDING);
    }

    @Test
    public void testCreateBooking_shouldSaveAndReturnBooking() {
        // Arrange
        when(bookingRepository.save(any(Booking.class))).thenReturn(booking);

        // Act
        Booking result = bookingService.createBooking(booking);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(bookingRepository).save(booking);
    }

    @Test
    public void testGetAllBookings_shouldReturnListOfBookings() {
        // Arrange
        List<Booking> bookings = List.of(booking);
        when(bookingRepository.findAll()).thenReturn(bookings);

        // Act
        List<Booking> result = bookingService.getAllBookings();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(bookingRepository).findAll();
    }

    @Test
    public void testGetBookingById_shouldReturnBooking() {
        // Arrange
        when(bookingRepository.findById(1L)).thenReturn(Optional.of(booking));

        // Act
        Booking result = bookingService.getBookingById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(bookingRepository).findById(1L);
    }

    @Test
    public void testGetBookingById_shouldReturnNullWhenBookingNotFound() {
        // Arrange
        when(bookingRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        Booking result = bookingService.getBookingById(1L);

        // Assert
        assertNull(result);
        verify(bookingRepository).findById(1L);
    }

    @Test
    public void testDeleteBooking_shouldReturnTrueWhenDeleted() {
        // Arrange
        when(bookingRepository.existsById(1L)).thenReturn(true);

        // Act
        boolean result = bookingService.deleteBooking(1L);

        // Assert
        assertTrue(result);
        verify(bookingRepository).existsById(1L);
        verify(bookingRepository).deleteById(1L);
    }

    @Test
    public void testDeleteBooking_shouldReturnFalseWhenBookingNotFound() {
        // Arrange
        when(bookingRepository.existsById(1L)).thenReturn(false);

        // Act
        boolean result = bookingService.deleteBooking(1L);

        // Assert
        assertFalse(result);
        verify(bookingRepository).existsById(1L);
        verify(bookingRepository, never()).deleteById(anyLong());
    }

    @Test
    public void testSetReceiverName_shouldUpdateReceiverName() {
        // Arrange
        when(bookingRepository.findById(1L)).thenReturn(Optional.of(booking));

        // Act
        bookingService.setReceiverName(1L, "Receiver Name");

        // Assert
        assertEquals("Receiver Name", booking.getReceiverName());
        assertEquals(BookingStatus.COMPLETED, booking.getStatus());
        verify(bookingRepository).save(booking);
    }

    @Test
    public void testSetReceiverName_shouldThrowExceptionForInvalidName() {
        // Arrange
        when(bookingRepository.findById(1L)).thenReturn(Optional.of(booking));
        
        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            bookingService.setReceiverName(1L, ""); // Invalid receiver name
        });

        assertEquals("Receiver name cannot be null or empty.", exception.getMessage());
        verify(bookingRepository, never()).save(any());
    }

    @Test
        public void testSetReceiverName_shouldThrowResourceNotFoundExceptionWhenBookingNotFound() {
        // Arrange
        when(bookingRepository.findById(1L)).thenReturn(Optional.empty()); // Mock repository to return empty Optional

        // Act & Assert
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            bookingService.setReceiverName(1L, "Valid Name"); // Use a valid receiver name
        });

        assertEquals("Booking not found with ID: 1", exception.getMessage());
        verify(bookingRepository, never()).save(any());
    }
}

