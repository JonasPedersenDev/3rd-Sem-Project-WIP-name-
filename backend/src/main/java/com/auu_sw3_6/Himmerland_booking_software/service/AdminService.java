// TenantService.java
package com.auu_sw3_6.Himmerland_booking_software.service;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Admin;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.AdminRepository;

@Service
public class AdminService extends UserService<Admin> {
    
    @Autowired
    public AdminService(AdminRepository adminRepository) {
        super(adminRepository);
    }

    public Admin createAdmin(Admin admin, MultipartFile profilePicture) {
        admin.setRoles(Set.of("ROLE_ADMIN"));
        return createUser(admin, profilePicture);
    }
}
