package com.auu_sw3_6.Himmerland_booking_software.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Admin;
import com.auu_sw3_6.Himmerland_booking_software.api.model.GuestHouse;
import com.auu_sw3_6.Himmerland_booking_software.api.model.Tool;
import com.auu_sw3_6.Himmerland_booking_software.api.model.Utility;
import com.auu_sw3_6.Himmerland_booking_software.service.AdminService;
import com.auu_sw3_6.Himmerland_booking_software.service.GuestHouseService;
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
    public CommandLineRunner setupTool(ToolService toolService) {
        return args -> {
            if (toolService.getAllResources().isEmpty()) {
                Tool tool = new Tool();
                tool.setName("Boremaskine");
                tool.setDescription("Det er en elektrisk boremaskine");
                tool.setId(1);
                tool.setResourcePictureFileName("boremaskine.jpg");
                tool.setType("Tool");
                tool.setCapacity(3);
                tool.setStatus("Available");
                
                toolService.createTool(tool, null);
            }
        };
    }

    @Bean
    public CommandLineRunner setupGuestHouse(GuestHouseService guesthouseService) {
        return args -> {
            if (guesthouseService.getAllResources().isEmpty()) {
                GuestHouse guestHouse = new GuestHouse();
                guestHouse.setName("GuestHouse1");
                guestHouse.setDescription("This is a guesthouse");
                guestHouse.setId(1);
                guestHouse.setResourcePictureFileName("guesthouse.jpg");
                guestHouse.setType("GuestHouse");
                guestHouse.setCapacity(1);
                guestHouse.setStatus("Available");

                guesthouseService.createGuestHouse(guestHouse, null);
            }
        };

    };

    @Bean
    public CommandLineRunner setupUtility(UtilityService utilityService) {
        return args -> {
            if (utilityService.getAllResources().isEmpty()) {
                Utility utility = new Utility();
                utility.setName("Trailer");
                utility.setDescription("This is a trailer");
                utility.setId(1);
                utility.setResourcePictureFileName("trailer.jpg");
                utility.setType("Utility");
                utility.setCapacity(3);
                utility.setStatus("Available");

                utilityService.createUtility(utility, null);
            }
        };

    };
}