package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
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
  @GetMapping(value = "/{id}", produces = "application/json")
  public ResponseEntity<T> getResourceById(@PathVariable Long id) {
    Optional<T> resource = resourceService.getResourceById(id);
    return resource.map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
  }

  @GetMapping(value = "/{id}/booked-dates", produces = "application/json")
  public ResponseEntity<Map<LocalDate, Integer>> getReservedDates(@PathVariable Long id) {
    Resource resource = resourceService.getResourceById(id).orElse(null);
    Map<LocalDate, Integer> reservedDates = bookingService.getBookedDatesWithCapacity(resource);
    return ResponseEntity.ok(reservedDates);
  }

}