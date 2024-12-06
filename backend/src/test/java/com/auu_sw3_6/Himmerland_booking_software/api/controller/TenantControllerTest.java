package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Booking;
import com.auu_sw3_6.Himmerland_booking_software.api.model.BookingDetails;
import com.auu_sw3_6.Himmerland_booking_software.api.model.Tenant;
import com.auu_sw3_6.Himmerland_booking_software.api.model.modelEnum.BookingStatus;
import com.auu_sw3_6.Himmerland_booking_software.service.TenantService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.mock.web.MockMultipartFile;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TenantControllerTest {

  @Mock
  private TenantService tenantService;

  @InjectMocks
  private TenantController tenantController;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void createUser_ShouldReturnCreatedUser() {
    Tenant tenant = new Tenant();
    MockMultipartFile profilePicture = new MockMultipartFile("profilePicture", new byte[0]);

    when(tenantService.createTenant(tenant, profilePicture)).thenReturn(tenant);

    ResponseEntity<Object> response = tenantController.createUser(tenant, profilePicture);

    assertEquals(HttpStatus.CREATED, response.getStatusCode());
    assertEquals(tenant, response.getBody());
  }

  @Test
  void deleteTenant_ShouldReturnNoContent() {
    Long tenantId = 1L;
    MockHttpServletResponse httpResponse = new MockHttpServletResponse();

    ResponseEntity<Void> response = tenantController.deleteTenant(tenantId, httpResponse);

    assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    verify(tenantService).softDeleteTenant(tenantId);
    assertTrue(httpResponse.getHeader("Set-Cookie").contains("jwt="));
  }

  @Test
  void updateTenant_ShouldReturnUpdatedTenant() {
    Tenant tenant = new Tenant();
    MockMultipartFile profilePicture = new MockMultipartFile("profilePicture", new byte[0]);
    MockHttpServletResponse httpResponse = new MockHttpServletResponse();

    when(tenantService.updateUser(tenant, profilePicture)).thenReturn(tenant);

    ResponseEntity<Tenant> response = tenantController.updateTenant(tenant, profilePicture, httpResponse);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(tenant, response.getBody());
    assertTrue(httpResponse.getHeader("Set-Cookie").contains("jwt="));
  }

  @Test
  void editBooking_ShouldReturnUpdatedBooking() {
    Long bookingId = 1L;
    BookingDetails bookingDetails = new BookingDetails();
    Booking updatedBooking = new Booking();

    when(tenantService.editBooking(bookingId, bookingDetails)).thenReturn(updatedBooking);

    ResponseEntity<Booking> response = tenantController.editBooking(bookingId, bookingDetails);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(updatedBooking, response.getBody());
  }

  @Test
  void getOwnBookings_ShouldReturnListOfBookings() {
    List<Booking> expectedBookings = Arrays.asList(new Booking(), new Booking());
    when(tenantService.getOwnBookings()).thenReturn(expectedBookings);

    ResponseEntity<List<Booking>> response = tenantController.getOwnBookings();

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(expectedBookings, response.getBody());
  }

  @Test
  void setBookingStatusAsCanceled_ShouldReturnOk() {
    long bookingId = 1L;

    ResponseEntity<Void> response = tenantController.setBookingStatusAsCanceled(bookingId);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    verify(tenantService).setBookingStatus(bookingId, BookingStatus.CANCELED);
  }
}