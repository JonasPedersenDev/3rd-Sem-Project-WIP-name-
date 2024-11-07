package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.auu_sw3_6.Himmerland_booking_software.api.model.GuestHouse;
import com.auu_sw3_6.Himmerland_booking_software.service.BookingService;
import com.auu_sw3_6.Himmerland_booking_software.service.GuestHouseService;

@RestController
@RequestMapping("api/guestHouse")
public class GuestHouseController extends ResourceController<GuestHouse> {

  private final GuestHouseService guestHouseService;
  private final BookingService bookingService;

  @Autowired
  public GuestHouseController(GuestHouseService guestHouseService, BookingService bookingService) {
    super(guestHouseService, bookingService);
    this.guestHouseService = guestHouseService;
    this.bookingService = bookingService;
  }

  @GetMapping(value = "/all", produces = "application/json")
  public ResponseEntity<List<GuestHouse>> getAllGuestHouses() {
    return ResponseEntity.ok(guestHouseService.getAllResources());
  }

  @DeleteMapping(value = "/{id}")
  public ResponseEntity<Void> deleteGuestHouse(@PathVariable Long id) {
    guestHouseService.deleteGuestHouse(id);
    return ResponseEntity.noContent().build();
  }

  @PostMapping(value = "/create", consumes = { "multipart/form-data" })
  public ResponseEntity<GuestHouse> createGuestHouse(@RequestPart("guestHouse") GuestHouse guestHouse,
      @RequestPart("resourcePictures") MultipartFile resourcePictures) {
    GuestHouse createdGuestHouse = guestHouseService.createGuestHouse(guestHouse, resourcePictures);
    return ResponseEntity.ok(createdGuestHouse);
  }

}