package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auu_sw3_6.Himmerland_booking_software.service.BookingService;

@RestController
@RequestMapping("api/booking")

public class BookingController {

    private final BookingService BookingService;

    @Autowired
    public BookingController(BookingService BookingService) {
        this.BookingService = BookingService;
    }


}
