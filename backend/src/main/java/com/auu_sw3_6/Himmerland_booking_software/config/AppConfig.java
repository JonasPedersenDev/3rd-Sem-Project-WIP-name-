package com.auu_sw3_6.Himmerland_booking_software.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Admin;
import com.auu_sw3_6.Himmerland_booking_software.api.model.Tool;
import com.auu_sw3_6.Himmerland_booking_software.service.AdminService;
import com.auu_sw3_6.Himmerland_booking_software.service.ToolService;

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
            // Check if there are any Tool entries in the database
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
}