package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Admin;
import com.auu_sw3_6.Himmerland_booking_software.api.model.Booking;
import com.auu_sw3_6.Himmerland_booking_software.api.model.BookingDetails;
import com.auu_sw3_6.Himmerland_booking_software.api.model.Tenant;
import com.auu_sw3_6.Himmerland_booking_software.service.AdminService;
import com.auu_sw3_6.Himmerland_booking_software.service.TenantService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.mock.web.MockMultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AdminControllerTest {

    @Mock
    private AdminService adminService;

    @Mock
    private TenantService tenantService;

    @InjectMocks
    private AdminController adminController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllTenants_ShouldReturnListOfTenants() {
        List<Tenant> expectedTenants = Arrays.asList(new Tenant(), new Tenant());
        when(tenantService.getAllTenants()).thenReturn(expectedTenants);

        ResponseEntity<List<Tenant>> response = adminController.getAllTenants();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedTenants, response.getBody());
    }

    @Test
    void deleteTenant_ShouldReturnNoContent() {
        Long tenantId = 1L;

        ResponseEntity<Void> response = adminController.deleteTenant(tenantId);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(tenantService).softDeleteTenant(tenantId);
    }

    @Test
    void updateAdmin_ShouldReturnUpdatedAdmin() {
        Admin admin = new Admin();
        MockMultipartFile profilePicture = new MockMultipartFile("profilePicture", new byte[0]);
        MockHttpServletResponse httpResponse = new MockHttpServletResponse();

        when(adminService.updateUser(admin, profilePicture)).thenReturn(admin);

        ResponseEntity<Admin> response = adminController.updateAdmin(admin, profilePicture, httpResponse);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(admin, response.getBody());
        assertTrue(httpResponse.getHeader("Set-Cookie").contains("jwt="));
    }

    @Test
    void updateTenant_ShouldReturnUpdatedTenant() {
        Tenant tenant = new Tenant();
        MockMultipartFile profilePicture = new MockMultipartFile("profilePicture", new byte[0]);

        when(tenantService.updateUser(tenant, profilePicture)).thenReturn(tenant);

        ResponseEntity<Tenant> response = adminController.updateTenant(tenant, profilePicture);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(tenant, response.getBody());
    }

    @Test
    void getTenant_ShouldReturnTenant() {
        Long tenantId = 1L;
        Tenant expectedTenant = new Tenant();
        when(tenantService.get(tenantId)).thenReturn(expectedTenant);

        ResponseEntity<Tenant> response = adminController.getTenant(tenantId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedTenant, response.getBody());
    }

    @Test
    void getProfilePictureByID_ShouldReturnProfilePicture() {
        long tenantId = 1L;
        byte[] expectedImage = new byte[] { 1, 2, 3 };
        when(tenantService.getProfilePictureByUserId(tenantId)).thenReturn(Optional.of(expectedImage));

        ResponseEntity<Object> response = adminController.getProfilePictureByID(tenantId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(MediaType.IMAGE_JPEG, response.getHeaders().getContentType());
        assertArrayEquals(expectedImage, (byte[]) response.getBody());
    }

    @Test
    void getProfilePictureByID_ShouldReturnNotFound_WhenProfilePictureNotExists() {
        long tenantId = 1L;
        when(tenantService.getProfilePictureByUserId(tenantId)).thenReturn(Optional.empty());

        ResponseEntity<Object> response = adminController.getProfilePictureByID(tenantId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void addCaretakerName_ShouldReturnOk() {
        String caretakerName = "John Doe";

        ResponseEntity<Void> response = adminController.addCaretakerName(caretakerName);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(adminService).addCaretakerName(caretakerName);
    }

    @Test
    void getAllCaretakerNames_ShouldReturnListOfNames() {
        List<String> expectedNames = Arrays.asList("John Doe", "Jane Smith");
        when(adminService.getAllCaretakerNames()).thenReturn(expectedNames);

        ResponseEntity<List<String>> response = adminController.getAllCaretakerNames();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedNames, response.getBody());
    }

    @Test
    void removeCaretakerName_ShouldReturnOk() {
        String caretakerName = "John Doe";

        ResponseEntity<Void> response = adminController.removeCaretakerName(caretakerName);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(adminService).removeCaretakerName(caretakerName);
    }

    @Test
    void createBookingForTenant_ShouldReturnCreatedBooking() {
        Long tenantId = 1L;
        BookingDetails bookingDetails = new BookingDetails();
        Tenant tenant = new Tenant();
        Booking expectedBooking = new Booking();

        when(tenantService.get(tenantId)).thenReturn(tenant);
        when(adminService.bookResourceForTenant(tenant, bookingDetails)).thenReturn(expectedBooking);

        ResponseEntity<Object> response = adminController.createBookingForTenant(bookingDetails, tenantId);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(expectedBooking, response.getBody());
    }

    // @Test
    // void createBookingForTenant_ShouldReturnErrorResponse_WhenExceptionOccurs() {
    // Long tenantId = 1L;
    // BookingDetails bookingDetails = new BookingDetails();
    // Tenant tenant = new Tenant();

    // when(tenantService.get(tenantId)).thenReturn(tenant);
    // when(adminService.bookResourceForTenant(tenant, bookingDetails))
    // .thenThrow(new RuntimeException("Booking failed"));

    // ResponseEntity<Object> response =
    // adminController.createBookingForTenant(bookingDetails, tenantId);

    // assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    // assertTrue(response.getBody().toString().contains("Failed to create
    // booking"));
    // }
}