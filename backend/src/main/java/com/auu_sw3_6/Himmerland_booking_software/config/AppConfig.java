package com.auu_sw3_6.Himmerland_booking_software.config;

import java.util.Set;

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
            if (adminService.getAllUsers().stream().noneMatch(u -> u.getRoles().contains("ROLE_ADMIN"))) {
                Admin admin = new Admin();
                admin.setUsername("admin");
                admin.setPassword("adminPassword");
                admin.setRoles(Set.of("ROLE_ADMIN"));
                admin.setName("Admin Name");
                admin.setEmail("admin@example.com");
                adminService.createAdmin(admin, null); // Pass null for profilePicture if not needed
            }
        };
    }
    }

