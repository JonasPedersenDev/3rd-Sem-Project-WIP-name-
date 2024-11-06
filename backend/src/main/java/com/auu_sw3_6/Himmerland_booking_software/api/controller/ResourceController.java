package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Resource;
import com.auu_sw3_6.Himmerland_booking_software.service.BookingService;
import com.auu_sw3_6.Himmerland_booking_software.service.ResourceService;

import jakarta.annotation.security.PermitAll;

@RestController
@RequestMapping("api/resource")
public abstract class ResourceController<T extends Resource> {

  protected final ResourceService<T> resourceService;
  protected final BookingService bookingService;

  @Autowired
  public ResourceController(ResourceService<T> resourceService, BookingService bookingService) {
    this.resourceService = resourceService;
    this.bookingService = bookingService;
  }

  @PermitAll
  @GetMapping("/api/resource")
  public ResponseEntity<T> getResourceById(@RequestParam Long id) {
    Optional<T> resource = resourceService.getResourceById(id);
    return resource.map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
  }

  @PermitAll
  @GetMapping("/api/resources")
  public ResponseEntity<List<T>> getResources() {
    List<T> resources = resourceService.getAllResources();
    if (resources.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    } else {
      return ResponseEntity.ok(resources);
    }
  }

  @PermitAll
  @PostMapping("/api/resource")
  public ResponseEntity<T> addResource(@RequestBody T resource) {
    resourceService.createResource(resource, null);
    return ResponseEntity.status(HttpStatus.CREATED).body(resource);
  }

  @GetMapping(value = "/api/resource/booked-dates/{resourceId}", produces = "application/json")
  public ResponseEntity<List<LocalDate>> getReservedDates(@PathVariable long resourceID) {
    Resource resource = resourceService.getResourceById(resourceID).orElse(null);
    List<LocalDate> reservedDates = bookingService.getBookedDates(resource);
    return ResponseEntity.ok(reservedDates);
  }

}
