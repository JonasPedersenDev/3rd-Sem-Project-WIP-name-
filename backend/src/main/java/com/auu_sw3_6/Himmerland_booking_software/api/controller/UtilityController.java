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

import com.auu_sw3_6.Himmerland_booking_software.api.model.Utility;
import com.auu_sw3_6.Himmerland_booking_software.service.BookingService;
import com.auu_sw3_6.Himmerland_booking_software.service.UtilityService;

@RestController
@RequestMapping("api/utility")
public class UtilityController extends ResourceController<Utility> {

    private final UtilityService utilityService;
    private final BookingService bookingService;

    @Autowired
    public UtilityController(UtilityService utilityService, BookingService bookingService) {
        super(utilityService, bookingService);
        this.utilityService = utilityService;
        this.bookingService = bookingService;
    }

    @GetMapping(value = "/all", produces = "application/json")
    public ResponseEntity <List<Utility>> getAllUtilities() {
        return ResponseEntity.ok(utilityService.getAllResources());
    }

    @DeleteMapping(value = "/{id}/delete")
    public ResponseEntity<Void> deleteUtility(@PathVariable Long id) {
        utilityService.deleteUtility(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/create", consumes = {"multipart/form-data"})
    public ResponseEntity<Utility> createUtility(@RequestPart("utility") Utility utility, @RequestPart("resourcePictures") MultipartFile resourcePictures) {
        Utility createdUtility = utilityService.createUtility(utility, resourcePictures);
        return ResponseEntity.ok(createdUtility);
    }
}