package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Booking;
import com.auu_sw3_6.Himmerland_booking_software.service.BookingService;

import io.swagger.v3.oas.annotations.Operation;


@RestController
@RequestMapping("api/booking")

public class BookingController {

  private final BookingService bookingService;

  @Autowired
  public BookingController(BookingService bookingService) {
    this.bookingService = bookingService;
  }

  @Operation(summary = "Get all bookings", description = "Retrieve a list of all bookings")
  @GetMapping(value = "/get-all", produces = "application/json")
  public ResponseEntity<List<Booking>> getBookings() {
    List<Booking> bookings = bookingService.getAllBookings();
    if (bookings.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    } else {
      return ResponseEntity.ok(bookings);
    }
  }

  @Operation(summary = "Delete a booking", description = "Remove a booking from the system by its ID")
  @DeleteMapping("/delete/{bookingId}")
  public ResponseEntity<Void> deleteBooking(@PathVariable long bookingId) {
    boolean isDeleted = bookingService.deleteBooking(bookingId);
    if (isDeleted) {
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @Operation(summary = "Get all initials", description = "Retrieve a list of all initials from bookings")
  @GetMapping(value = "/get-all-initials", produces = "application/json")
  public ResponseEntity<List<String>> getAllInitials() {
    List<String> initials = bookingService.getAllInitials();
    if (initials.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    } else {
      return ResponseEntity.ok(initials);
    }
  }

  @Operation(summary = "Set initial to a booking", description = "Add an initial to a specific booking by its ID")
  @PostMapping(value = "/set-initials/{bookingId}", consumes = "application/json")
  public ResponseEntity<Void> setInitialToBooking(@PathVariable long bookingId, @RequestBody String initials) {
    System.out.println("Received request to set initials for booking with ID: " + bookingId);
    boolean isAdded = bookingService.setInitialToBooking(bookingId, initials);
    if (isAdded) {
      return ResponseEntity.ok().build();
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }
}
