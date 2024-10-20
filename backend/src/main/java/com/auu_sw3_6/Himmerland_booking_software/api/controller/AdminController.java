package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Admin;
import com.auu_sw3_6.Himmerland_booking_software.service.AdminService;

@RestController
@RequestMapping("api/admin")
public class AdminController extends UserController<Admin> {

    @Autowired
    public AdminController(AdminService adminService) {
        super(adminService);
    }

}
