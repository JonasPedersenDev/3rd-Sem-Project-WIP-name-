package com.auu_sw3_6.Himmerland_booking_software.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookingController {

    @GetMapping("/api/bookings")
    public String getBookings() {
        return "Testing the test!";
    }

    @GetMapping("/api/greeting")
    public String greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        return "Hello, " + name;
    }
}
