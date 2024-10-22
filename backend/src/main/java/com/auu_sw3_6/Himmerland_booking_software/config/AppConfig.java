package com.auu_sw3_6.Himmerland_booking_software.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Admin;
import com.auu_sw3_6.Himmerland_booking_software.service.AdminService;

@Configuration
public class AppConfig {

    @Bean
    public CommandLineRunner setupAdmin(AdminService adminService) {
        return args -> {
            // Check if there are any Admin entries in the database
            if (adminService.getAllUsers().isEmpty()) {
                Admin admin = new Admin();
                admin.setUsername("admin");
                admin.setPassword("adminPassword");
                admin.setName("Admin Name");
                admin.setEmail("admin@example.com");
                
                adminService.createAdmin(admin, null); // No profile pic
            }
        };
    }
}
