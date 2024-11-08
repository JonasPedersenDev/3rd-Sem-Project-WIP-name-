package com.auu_sw3_6.Himmerland_booking_software.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Admin;
import com.auu_sw3_6.Himmerland_booking_software.api.model.Hospitality;
import com.auu_sw3_6.Himmerland_booking_software.service.AdminService;
import com.auu_sw3_6.Himmerland_booking_software.service.HospitalityService;

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

  @Bean
  public CommandLineRunner setupHospitality(HospitalityService hospitalityService) {
    return args -> {
      // Check if there are any Hospitality entries in the database
      if (hospitalityService.getAllResources().isEmpty()) {
        Hospitality hospitality = new Hospitality();
        hospitality.setId(5);
        hospitality.setName("Hospitality Name");
        hospitality.setDescription("Hospitality Description");
        hospitality.setResourcePictureFileName("Hospitality Picture");
        hospitality.setType("Hospitality");
        hospitality.setCapacity(1);
        hospitality.setStatus("available");

        hospitalityService.createHospitality(hospitality, null); // No profile pic
      }
    };
  }

}