package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.auu_sw3_6.Himmerland_booking_software.api.model.CaretakerInitials;
import com.auu_sw3_6.Himmerland_booking_software.service.CaretakerInitialsService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/caretaker-initials")
public class CaretakerInitialsController {

  private final CaretakerInitialsService caretakerInitialsService;

  @Autowired
  public CaretakerInitialsController(CaretakerInitialsService caretakerInitialsService) {
    this.caretakerInitialsService = caretakerInitialsService;
  }

  @Operation(summary = "Create new caretaker initials", description = "Add new caretaker initials to the system")
  @PostMapping(value = "/create", consumes = "application/json", produces = "application/json")
  public ResponseEntity<CaretakerInitials> createCaretakerInitials(@RequestBody CaretakerInitials caretakerInitials) {
    CaretakerInitials createdCaretakerInitials = caretakerInitialsService.save(caretakerInitials);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdCaretakerInitials);
  }

}