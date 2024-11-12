package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
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

  @Operation(summary = "Delete caretaker initials", description = "Delete caretaker initials by its initials")
  @DeleteMapping(value = "/delete/{initials}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteCaretakerInitials(@PathVariable String initials) {
    caretakerInitialsService.deleteByInitials(initials);
  }

  @Operation(summary = "Get all caretaker initials", description = "Retrieve a list of all caretaker initials")
  @GetMapping(value = "/get-all", produces = "application/json")
  public ResponseEntity<List<CaretakerInitials>> getResources() {
    List<CaretakerInitials> caretakerInitials = caretakerInitialsService.getAllInitials();
    if (caretakerInitials.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    } else {
      return ResponseEntity.ok(caretakerInitials);
    }
  }

}