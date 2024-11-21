package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Admin;
import com.auu_sw3_6.Himmerland_booking_software.api.model.ErrorResponse;
import com.auu_sw3_6.Himmerland_booking_software.api.model.Tenant;
import com.auu_sw3_6.Himmerland_booking_software.service.AdminService;
import com.auu_sw3_6.Himmerland_booking_software.service.TenantService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/admin")
public class AdminController extends UserController<Admin> {

  private final TenantService tenantService;

  @Autowired
  public AdminController(AdminService adminService, TenantService tenantService) {
    super(adminService);
    this.tenantService = tenantService;
  }

  @GetMapping(value = "/getAllTenants", produces = "application/json")
  @Operation(summary = "Get all tenants", description = "This endpoint returns all tenants except the admin.")
  public ResponseEntity<List<Tenant>> getAllTenants() {
    List<Tenant> tenants = tenantService.getAllTenants();
    return ResponseEntity.ok(tenants);
  }

  @DeleteMapping(value = "/deleteTenant/{id}")
  @Operation(summary = "Delete tenant", description = "This endpoint deletes a tenant.")
  public ResponseEntity<Void> deleteTenant(@PathVariable Long id) {
    tenantService.delete(id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping(value = "/updateTenant/{id}", produces = "application/json")
  @Operation(summary = "Update tenant", description = "This endpoint updates a tenant.")
  public ResponseEntity<Tenant> updateTenant(@PathVariable Long id, @RequestBody Tenant tenant) {
    Tenant updatedTenant = tenantService.update(id, tenant);
    return ResponseEntity.ok(updatedTenant);
  }

  @GetMapping(value = "/getTenant/{id}", produces = "application/json")
  @Operation(summary = "Get tenant", description = "This endpoint returns a tenant.")
  public ResponseEntity<Tenant> getTenant(@PathVariable Long id) {
    Tenant tenant = tenantService.get(id);
    return ResponseEntity.ok(tenant);
  }

  @GetMapping(value = "/getTenant/{id}/profilePicture", produces = "application/json")
  @Operation(summary = "Get tenant profilepicture", description = "This endpoint returns a tenants profilepicture from an user id.")
  public ResponseEntity<Object> getProfilePictureByID(@PathVariable long id) {
    Optional<byte[]> imageBytesOptional = tenantService.getProfilePictureByUserId(id);
    if (imageBytesOptional.isPresent()) {
      return ResponseEntity.ok()
          .contentType(MediaType.IMAGE_JPEG)
          .body(imageBytesOptional.get());
    }
    return new ErrorResponse("Profile picture not found", HttpStatus.NOT_FOUND).send();
  }

  @PutMapping("/addCaretakerName")
  public ResponseEntity<Void> addCaretakerName(@RequestBody String caretakerName) {
    ((AdminService) userService).addCaretakerName(caretakerName);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/getAllCaretakerNames")
  public ResponseEntity<List<String>> getAllCaretakerNames() {
    List<String> caretakerNames = ((AdminService) userService).getAllCaretakerNames();
    return ResponseEntity.ok(caretakerNames);
  }

  @DeleteMapping("/removeCaretakerName")
  public ResponseEntity<Void> removeCaretakerName(@RequestBody String caretakerName) {
    ((AdminService) userService).removeCaretakerName(caretakerName);
    return ResponseEntity.ok().build();
  }
}
