package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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

  @PutMapping(value = "/updateUser/{id}", produces = "application/json")
  @Operation(summary = "Update user", description = "This endpoint updates a user.")
  public ResponseEntity<Tenant> updateTenant(@PathVariable Long id, @RequestBody Tenant tenant) {
    Tenant updatedTenant = tenantService.update(id, tenant);
    return ResponseEntity.ok(updatedTenant);
  }

  @GetMapping(value = "/getUser/{id}", produces = "application/json")
  @Operation(summary = "Get user", description = "This endpoint returns a user.")
  public ResponseEntity<Tenant> getTenant(@PathVariable Long id) {
    Tenant tenant = tenantService.get(id);
    return ResponseEntity.ok(tenant);
  }

  @DeleteMapping(value = "/deleteUser/{id}")
  @Operation(summary = "Delete user", description = "This endpoint deletes a user.")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    tenantService.delete(id);
    return ResponseEntity.noContent().build();
  }

}
