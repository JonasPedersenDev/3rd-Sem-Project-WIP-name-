package com.auu_sw3_6.Himmerland_booking_software.service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Tenant;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.TenantRepository;

@ExtendWith(MockitoExtension.class)
public class TenantServiceTest {

    @Mock
    private TenantRepository tenantRepository;

    @Mock
    private PictureService profilePictureService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private MultipartFile profilePicture;

    @Mock
    private AdminService adminService;

    @InjectMocks
    private TenantService tenantService;

    private Tenant tenant;

    @BeforeEach
    public void setUp() {
        tenant = new Tenant();
        tenant.setId(1L);
        tenant.setUsername("tenantUser");
        tenant.setPassword("password123");

        tenantService.setRestrictedUsernamesSet(new HashSet<>(Arrays.asList("administrator", "root")));
    }

    @Test
    public void testCreateTenant_CallsSaveMethodOnRepository() {
        // Arrange
        when(tenantRepository.save(any(Tenant.class))).thenReturn(tenant);
        when(adminService.getUserByUsername(tenant.getUsername())).thenReturn(Optional.empty());

        // Act
        tenantService.createTenant(tenant, profilePicture);

        // Assert - Verify that the save method was called
        verify(tenantRepository).save(tenant);
    }

    @Test
    public void testCreateTenant_ReturnsNonNullTenant() {
        // Arrange
        when(tenantRepository.save(any(Tenant.class))).thenReturn(tenant);
        when(adminService.getUserByUsername(tenant.getUsername())).thenReturn(Optional.empty());

        // Act
        Tenant createdTenant = tenantService.createTenant(tenant, profilePicture);

        // Assert
        assertNotNull(createdTenant, "Tenant should be created and not be null");
    }

    @Test
    public void testCreateTenant_SavesProfilePicture() throws Exception {
        // Arrange
        when(profilePictureService.savePicture(profilePicture, true)).thenReturn("profilePicture.jpg");
        when(tenantRepository.save(any(Tenant.class))).thenReturn(tenant);
        when(adminService.getUserByUsername(tenant.getUsername())).thenReturn(Optional.empty());

        // Act
        Tenant createdTenant = tenantService.createTenant(tenant, profilePicture);

        // Assert
        assertEquals("profilePicture.jpg", createdTenant.getProfilePictureFileName(),
                "Profile picture filename should be 'profilePicture.jpg'");
    }

    @Test
    public void testCreateTenant_EncodesPassword() {
        // Arrange
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword123");
        when(tenantRepository.save(any(Tenant.class))).thenReturn(tenant);
        when(adminService.getUserByUsername(tenant.getUsername())).thenReturn(Optional.empty());

        // Act
        Tenant createdTenant = tenantService.createTenant(tenant, profilePicture);

        // Assert
        assertEquals("encodedPassword123", createdTenant.getPassword(),
                "Password should be encoded and not the raw password");
    }

    @Test
    public void testCreateTenant_ThrowsExceptionForInvalidProfilePicture() {
        // Arrange:
        doThrow(new IllegalArgumentException("Unsupported file type")).when(profilePictureService)
                .savePicture(profilePicture, true);
        when(adminService.getUserByUsername(tenant.getUsername())).thenReturn(Optional.empty());

        // Act & Assert:
        assertThrows(IllegalArgumentException.class, () -> {
            tenantService.createTenant(tenant, profilePicture);
        });
    }

    @Test
    public void testCreateTenant_ThrowsExceptionWithCorrectMessageForInvalidProfilePicture() {
        // Arrange:
        doThrow(new IllegalArgumentException("Unsupported file type")).when(profilePictureService)
                .savePicture(profilePicture, true);
        when(adminService.getUserByUsername(tenant.getUsername())).thenReturn(Optional.empty());

        // Act:
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            tenantService.createTenant(tenant, profilePicture);
        });

        // Assert:
        assertEquals("Unsupported file type", exception.getMessage(),
                "Should throw an exception with the correct message for unsupported file type");
    }

    @Test
    public void testUpdateTenant_InteractsWithDependencies() {
        // Arrange:
        when(tenantRepository.findById(1L)).thenReturn(Optional.of(tenant));
        when(profilePictureService.savePicture(profilePicture, true)).thenReturn("profilePicture.jpg");
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword123");
        when(tenantRepository.save(any(Tenant.class))).thenReturn(tenant);

        // Act:
        tenantService.update(tenant, profilePicture);

        // Assert:
        verify(tenantRepository).findById(tenant.getId());
        verify(tenantRepository).save(tenant);
        verify(profilePictureService).savePicture(profilePicture, true);
        verify(passwordEncoder).encode("password123");
    }

    @Test
    public void testUpdateTenant_ThrowsExceptionWhenTenantNotFound() {
        // Arrange:
        when(tenantRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert:
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            tenantService.update(tenant, profilePicture);
        });

        // Assert:
        assertEquals("Tenant with ID 1 not found", exception.getMessage(),
                "Should throw an exception with the correct message when tenant is not found");
    }

    @Test
    public void testUpdateTenant_RetainsExistingPasswordWhenNewPasswordIsNull() {
        // Arrange:
        tenant.setPassword(null);
        Tenant existingTenant = new Tenant();
        existingTenant.setId(1L);
        existingTenant.setPassword("existingPassword");
        when(tenantRepository.findById(1L)).thenReturn(Optional.of(existingTenant));
        when(tenantRepository.save(any(Tenant.class))).thenReturn(tenant);

        // Act:
        Tenant updatedTenant = tenantService.update(tenant, profilePicture);

        // Assert:
        assertEquals("existingPassword", updatedTenant.getPassword(),
                "Should retain the existing password when the new password is null");
        verify(tenantRepository).findById(1L);
        verify(tenantRepository).save(tenant);
    }

    @Test
    public void testUpdateTenant_UpdatesProfilePictureWhenNewProfilePictureIsNotNull() {
        // Arrange:
        Tenant existingTenant = new Tenant();
        existingTenant.setId(1L);
        existingTenant.setProfilePictureFileName("existingProfilePicture.jpg");
        when(tenantRepository.findById(1L)).thenReturn(Optional.of(existingTenant));
        when(profilePictureService.savePicture(profilePicture, true)).thenReturn("newProfilePicture.jpg");
        when(tenantRepository.save(any(Tenant.class))).thenReturn(tenant);

        // Act:
        Tenant updatedTenant = tenantService.update(tenant, profilePicture);

        // Assert:
        assertEquals("newProfilePicture.jpg", updatedTenant.getProfilePictureFileName(),
                "Should update the profile picture when the new profile picture is not null");
        verify(tenantRepository).findById(1L);
        verify(tenantRepository).save(tenant);
        verify(profilePictureService).savePicture(profilePicture, true);
    }

    @Test
    public void testgetTenantById_shouldReturnTenantIfFound() {
        // Arrange
        when(tenantRepository.findById(1L)).thenReturn(Optional.of(tenant));

        // Act
        Tenant foundTenant = tenantService.get(1L);

        // Assert
        assertEquals(tenant, foundTenant);
    }

    @Test
    public void testgetTenantById_shouldThrowExceptionIfTenantNotFound() {
        // Arrange
        when(tenantRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            tenantService.get(1L);
        });

        // Assert
        assertEquals("Tenant with id 1 does not exist.", exception.getMessage());
    }

    @Test
    public void testDeleteUser_shouldDeleteUser() {
        // Arrange
        when(tenantRepository.existsById(1L)).thenReturn(true);

        // Act
        tenantService.delete(1L);

        // Assert
        verify(tenantRepository).deleteById(1L);
    }

    @Test
    public void testDeleteUser_userNotFound() {
        // Arrange
        when(tenantRepository.existsById(2L)).thenReturn(false);

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            tenantService.delete(2L);
        });

        // Assert
        assertEquals("Tenant with ID 2 not found", exception.getMessage());
    }

}
