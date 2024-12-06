package com.auu_sw3_6.Himmerland_booking_software.service;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;

import com.auu_sw3_6.Himmerland_booking_software.api.model.*;
import com.auu_sw3_6.Himmerland_booking_software.api.model.modelEnum.*;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.BookingRepository;
import com.auu_sw3_6.Himmerland_booking_software.exception.IllegalBookingException;
import com.auu_sw3_6.Himmerland_booking_software.exception.BookingError;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class BookingServiceIntegrationTest {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ToolService toolService;

    @Test
public void testBookResource_ConfirmBookingLink() {
    // Arrange:
    Tenant user = new Tenant();
    user.setId(1L);
    user.setName("John Doe");
    user.setEmail("johndoe@example.com");
    user.setMobileNumber("+123456789");
    user.setUsername("johndoe");
    user.setPassword("password123");
    user.setHouseAddress("123 Main Street");

    Tool tool = new Tool();
    tool.setName("Drill");
    tool.setDescription("High-quality electric drill");
    tool.setType(ResourceType.TOOL);
    tool.setCapacity(5);
    tool.setStatus("active");

    Tool savedTool = toolService.createTool(tool, null);

    LocalDate startDate = LocalDate.now().with(java.time.DayOfWeek.MONDAY).plusWeeks(1);
    LocalDate endDate = startDate.plusDays(2);
    BookingDetails bookingDetails = new BookingDetails();
    bookingDetails.setResourceID(savedTool.getId());
    bookingDetails.setResourceType(ResourceType.TOOL);
    bookingDetails.setStartDate(startDate);
    bookingDetails.setEndDate(endDate);
    bookingDetails.setPickupTime(TimeRange.EARLY);
    bookingDetails.setDropoffTime(TimeRange.LATE);
    bookingDetails.setReceiverName("Jane Doe");
    bookingDetails.setHandoverName("Mark Smith");

    // Act:
    Booking booking = bookingService.bookResource(user, bookingDetails);

    // Assert:
    assertNotNull(booking);
    assertEquals(user.getId(), booking.getUser().getId());
    assertEquals(savedTool.getId(), booking.getResource().getId());
    assertEquals(BookingStatus.PENDING, booking.getStatus());
    assertEquals(bookingDetails.getReceiverName(), booking.getReceiverName());
    assertEquals(bookingDetails.getHandoverName(), booking.getHandoverName());
    assertTrue(bookingRepository.existsById(booking.getId()));
}

    
@Test
public void testBookResource_unavailableResource() {
    // Arrange:
    Tenant user = new Tenant();
    user.setId(1L);
    user.setName("John Doe");
    user.setEmail("johndoe@example.com");
    user.setMobileNumber("+123456789");
    user.setUsername("johndoe");
    user.setPassword("password123");
    user.setHouseAddress("123 Main Street");

    Tool tool = new Tool();
    tool.setName("Drill");
    tool.setDescription("A high-quality electric drill");
    tool.setType(ResourceType.TOOL);
    tool.setCapacity(0);
    tool.setStatus("active");

    Tool savedTool = toolService.createTool(tool, null);

    LocalDate startDate = LocalDate.now().with(java.time.DayOfWeek.TUESDAY).plusWeeks(1);
    LocalDate endDate = startDate.plusDays(1);

    BookingDetails bookingDetails = new BookingDetails();
    bookingDetails.setResourceID(savedTool.getId());
    bookingDetails.setResourceType(ResourceType.TOOL);
    bookingDetails.setStartDate(startDate);
    bookingDetails.setEndDate(endDate);
    bookingDetails.setPickupTime(TimeRange.EARLY);
    bookingDetails.setDropoffTime(TimeRange.LATE);

    // Act & Assert:
    IllegalBookingException exception = assertThrows(IllegalBookingException.class, () -> {
        bookingService.bookResource(user, bookingDetails);
    });

    // Assert: 
    assertEquals(BookingError.TOO_MANY_BOOKINGS.getErrorMessage(), exception.getMessage());
}
}