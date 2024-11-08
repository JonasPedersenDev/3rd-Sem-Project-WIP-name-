package com.auu_sw3_6.Himmerland_booking_software.config;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.springframework.boot.CommandLineRunner;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Admin;
import com.auu_sw3_6.Himmerland_booking_software.service.AdminService;

public class AppConfigTest {

    private AdminService adminService;
    private AppConfig appConfig;

    @BeforeEach
    public void setUp() {
        adminService = mock(AdminService.class);
        appConfig = new AppConfig();
    }

    @Test
    public void testSetupAdmin_CreatesAdminWhenDatabaseIsEmpty() throws Exception {
        // Arrange
        when(adminService.getAllUsers()).thenReturn(List.of()); 
        CommandLineRunner runner = appConfig.setupAdmin(adminService);

        // Act
        runner.run();

        // Assert
        verify(adminService, times(1)).createAdmin(any(Admin.class), eq(null));
    }

    @Test
    public void testSetupAdmin_DoesNotCreateAdminWhenDatabaseIsNotEmpty() throws Exception {
        // Arrange
        when(adminService.getAllUsers()).thenReturn(List.of(new Admin())); 
        CommandLineRunner runner = appConfig.setupAdmin(adminService);

        // Act
        runner.run();

        // Assert
        verify(adminService, never()).createAdmin(any(Admin.class), eq(null));
    }
}
