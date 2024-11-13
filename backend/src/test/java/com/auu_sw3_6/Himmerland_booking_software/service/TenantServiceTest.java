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
}


