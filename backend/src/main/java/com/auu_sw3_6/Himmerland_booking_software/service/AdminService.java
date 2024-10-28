package com.auu_sw3_6.Himmerland_booking_software.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Admin;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.AdminRepository;

@Service
public class AdminService extends UserService<Admin> {

    @Autowired
    public AdminService(AdminRepository adminRepository, PictureService profilePictureService, PasswordEncoder passwordEncoder) {
        super(adminRepository, profilePictureService, passwordEncoder);
    }

    public Admin createAdmin(Admin admin, MultipartFile profilePicture) {
        return createUser(admin, profilePicture);
    }
}