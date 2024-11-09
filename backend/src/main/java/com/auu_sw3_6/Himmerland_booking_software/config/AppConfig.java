package com.auu_sw3_6.Himmerland_booking_software.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Admin;
import com.auu_sw3_6.Himmerland_booking_software.api.model.Hospitality;
import com.auu_sw3_6.Himmerland_booking_software.api.model.Tool;
import com.auu_sw3_6.Himmerland_booking_software.api.model.Utility;
import com.auu_sw3_6.Himmerland_booking_software.service.AdminService;
import com.auu_sw3_6.Himmerland_booking_software.service.HospitalityService;
import com.auu_sw3_6.Himmerland_booking_software.service.ToolService;
import com.auu_sw3_6.Himmerland_booking_software.service.UtilityService;

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
        hospitality.setId(1L);
        hospitality.setName("Festlokale");
        hospitality.setDescription("Festlokale med minibar");
        hospitality.setResourcePictureFileName("festlokale.jpg");
        hospitality.setType("Hospitality");
        hospitality.setCapacity(1L);
        hospitality.setStatus("available");

        hospitalityService.createHospitality(hospitality, null); // No profile pic
      }
    };
  }

  @Bean
  public CommandLineRunner setupTool(ToolService toolService) {
    return args -> {
      if (toolService.getAllResources().isEmpty()) {
        Tool tool = new Tool();
        tool.setId(2L);
        tool.setName("Boremaskine");
        tool.setDescription("En elektrisk boremaskine, i modsætning til en benzin drevet boremaskine");
        tool.setResourcePictureFileName("boremaskine.jpg");
        tool.setType("Tool");
        tool.setCapacity(3L);
        tool.setStatus("available");

        toolService.createTool(tool, null);
      }
    };
  }


  @Bean
  public CommandLineRunner setupUtility(UtilityService utilityService) {
    return args -> {
      if (utilityService.getAllResources().isEmpty()) {
        Utility utility = new Utility();
        utility.setId(3L);
        utility.setName("Trailer");
        utility.setDescription("Havetrailer med en vægtkapacitet på 500 Kg.");
        utility.setResourcePictureFileName("trailer.jpg");
        utility.setType("Utility");
        utility.setCapacity(2L);
        utility.setStatus("available");

        utilityService.createUtility(utility, null);
      }
    };
  }


}