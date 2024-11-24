package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Tenant;
import com.auu_sw3_6.Himmerland_booking_software.service.TenantService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;


@RestController
@RequestMapping("api/tenant")
public class TenantController extends UserController<Tenant> {

  private final TenantService tenantService;

  @Autowired
  public TenantController(TenantService tenantService) {
    super(tenantService);
    this.tenantService = tenantService;
  }

  @PermitAll
  @PostMapping(value = "register", consumes = { "multipart/form-data" })
  @Operation(summary = "Register a new user", description = "This endpoint allows you to add a new user to the system. "
      +
      "You must provide the user's name, email, and mobile number. " +
      "The id and profile picture path will be handled automatically.")
  public ResponseEntity<Object> createUser(
      @Parameter(description = "User details") @RequestPart("user") @Valid Tenant user,
      @Parameter(description = "User's profile picture (optional)") @RequestPart(value = "profilePicture", required = false) MultipartFile profilePicture) {

    Tenant createdUser = tenantService.createTenant(user, profilePicture);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
  }

  @DeleteMapping(value = "/deleteTenant/{id}")
  @Operation(summary = "Delete tenant", description = "This endpoint deletes a tenant.")
  public ResponseEntity<Void> deleteTenant(@PathVariable Long id, HttpServletResponse response) {
    tenantService.delete(id);

    // Clear the JWT cookie
    ResponseCookie jwtCookie = ResponseCookie.from("jwt", "")
        .httpOnly(true)
        .secure(true)
        .path("/")
        .maxAge(0) // Expire the cookie immediately
        .sameSite("none") // only for development, maybe
        .build();

    response.addHeader("Set-Cookie", jwtCookie.toString());

    return ResponseEntity.noContent().build();
  }

  @PutMapping(value = "/updateUser/{id}", produces = "application/json")
  @Operation(summary = "Update user", description = "This endpoint updates a user.")
  public ResponseEntity<Tenant> updateTenant(@PathVariable Long id, @RequestBody Tenant tenant) {
    Tenant updatedTenant = tenantService.update(id, tenant);
    return ResponseEntity.ok(updatedTenant);
  }
  
}
  