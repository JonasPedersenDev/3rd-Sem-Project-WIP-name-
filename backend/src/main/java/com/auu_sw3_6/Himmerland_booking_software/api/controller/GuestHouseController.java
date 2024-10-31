package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auu_sw3_6.Himmerland_booking_software.service.GuestHouseService;

@RestController
@RequestMapping("api/guesthouse")
public class GuestHouseController extends ResourceController {

    @Autowired
    public GuestHouseController(GuestHouseService GuestHouseService) {
        super(GuestHouseService);
    }

}
