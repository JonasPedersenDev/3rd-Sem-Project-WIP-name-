package com.auu_sw3_6.Himmerland_booking_software.api.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.auu_sw3_6.Himmerland_booking_software.api.model.modelEnum.ResourceType;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

public class BookingDetailsTest {

    private BookingDetails bookingDetails;
    private Validator validator;

    @BeforeEach
    public void setUp() {
        bookingDetails = new BookingDetails(1L, ResourceType.UTILITY, LocalDate.of(2024, 11, 7),
                LocalDate.of(2024, 11, 7), LocalTime.of(14, 0), LocalTime.of(16, 0));

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    public void testConstructor_ShouldInitializeFields() {
        // Act & Assert
        assertNotNull(bookingDetails);
        assertEquals(1L, bookingDetails.getResourceID(), "Resource ID should be 1.");
        assertEquals(ResourceType.UTILITY, bookingDetails.getResourceType(), "Resource type should be UTILITY.");
        assertEquals(LocalDate.of(2024, 11, 7), bookingDetails.getStartDate(), "Start date should be 2024-11-07.");
        assertEquals(LocalDate.of(2024, 11, 7), bookingDetails.getEndDate(), "End date should be 2024-11-07.");
        assertEquals(LocalTime.of(14, 0), bookingDetails.getPickupTime(), "Start time should be 14:00.");
        assertEquals(LocalTime.of(16, 0), bookingDetails.getDropoffTime(), "End time should be 16:00.");
    }

    @Test
    public void testSetters_ShouldUpdateFields() {
        // Act
        bookingDetails.setResourceID(2L);
        bookingDetails.setResourceType(ResourceType.TOOL);
        bookingDetails.setStartDate(LocalDate.of(2024, 12, 1));
        bookingDetails.setEndDate(LocalDate.of(2024, 12, 3));
        bookingDetails.setPickupTime(LocalTime.of(10, 0));
        bookingDetails.setDropoffTime(LocalTime.of(18, 0));

        // Assert
        assertEquals(2L, bookingDetails.getResourceID(), "Resource ID should be updated to 2.");
        assertEquals(ResourceType.TOOL, bookingDetails.getResourceType(), "Resource type should be updated to TOOL.");
        assertEquals(LocalDate.of(2024, 12, 1), bookingDetails.getStartDate(), "Start date should be updated to 2024-12-01.");
        assertEquals(LocalDate.of(2024, 12, 3), bookingDetails.getEndDate(), "End date should be updated to 2024-12-03.");
        assertEquals(LocalTime.of(10, 0), bookingDetails.getPickupTime(), "Start time should be updated to 10:00.");
        assertEquals(LocalTime.of(18, 0), bookingDetails.getDropoffTime(), "End time should be updated to 18:00.");
    }

    @Test
    public void testValidation_ValidBookingDetails() {
        // Act
        Set<ConstraintViolation<BookingDetails>> violations = validator.validate(bookingDetails);

        // Assert
        assertTrue(violations.isEmpty(), "There should be no validation violations for valid BookingDetails.");
    }

    @Test
    public void testValidation_InvalidBookingDetails() {
        // Arrange
        bookingDetails.setResourceID(null);
        bookingDetails.setStartDate(null);
        bookingDetails.setEndDate(null);
        bookingDetails.setPickupTime(null);
        bookingDetails.setDropoffTime(null);

        // Act
        Set<ConstraintViolation<BookingDetails>> violations = validator.validate(bookingDetails);

        // Assert
        assertTrue(violations.size() > 0, "There should be validation violations for invalid BookingDetails.");
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().equals("Resource ID cannot be null")),
                "Violation should indicate that Resource ID cannot be null.");
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().equals("Start date cannot be null")),
                "Violation should indicate that Start date cannot be null.");
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().equals("End date cannot be null")),
                "Violation should indicate that End date cannot be null.");
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().equals("Start time cannot be null")),
                "Violation should indicate that Start time cannot be null.");
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().equals("End time cannot be null")),
                "Violation should indicate that End time cannot be null.");
    }

    @Test
    public void testResourceType_ShouldAcceptValidResourceTypes() {
        // Act & Assert for different resource types
        bookingDetails.setResourceType(ResourceType.HOSPITALITY);
        assertEquals(ResourceType.HOSPITALITY, bookingDetails.getResourceType(), "Resource type should be HOSPITALITY.");

        bookingDetails.setResourceType(ResourceType.TOOL);
        assertEquals(ResourceType.TOOL, bookingDetails.getResourceType(), "Resource type should be TOOL.");

        bookingDetails.setResourceType(ResourceType.UTILITY);
        assertEquals(ResourceType.UTILITY, bookingDetails.getResourceType(), "Resource type should be UTILITY.");
    }
}
