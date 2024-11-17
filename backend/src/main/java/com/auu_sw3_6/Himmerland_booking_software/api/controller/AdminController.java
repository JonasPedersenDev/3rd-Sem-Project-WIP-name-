package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;


import com.auu_sw3_6.Himmerland_booking_software.api.model.Admin;
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
}
