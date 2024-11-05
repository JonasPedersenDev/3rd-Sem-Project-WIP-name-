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
import com.auu_sw3_6.Himmerland_booking_software.exception.RestrictedUsernameException;
import com.auu_sw3_6.Himmerland_booking_software.exception.UserAlreadyExistsException;

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
    tenant.setPassword("rawPassword123");

    // Initialize the restricted user names set
    tenantService.setRestrictedUsernamesSet(new HashSet<>(Arrays.asList("admin", "root")));
  }

  @Test
  public void testCreateTenant_CallsSaveMethodOnRepository() {
    // Arrange
    when(tenantRepository.save(any(Tenant.class))).thenReturn(tenant);

    // Act
    tenantService.createTenant(tenant, profilePicture);

    // Assert
    verify(tenantRepository).save(tenant);
  }

  @Test
  public void testCreateTenant_ReturnsNonNullTenant() {
    // Arrange
    when(tenantRepository.save(any(Tenant.class))).thenReturn(tenant);

    // Act
    Tenant createdTenant = tenantService.createTenant(tenant, profilePicture);

    // Assert
    assertNotNull(createdTenant, "Tenant should be created and not null");
  }

  @Test
  public void testCreateTenant_SavesProfilePicture() throws Exception {
    // Arrange
    when(profilePictureService.saveProfilePicture(profilePicture)).thenReturn("profilePicture.jpg");
    when(tenantRepository.save(any(Tenant.class))).thenReturn(tenant);

    // Act
    Tenant createdTenant = tenantService.createTenant(tenant, profilePicture);

    // Assert
    assertEquals("profilePicture.jpg", createdTenant.getProfilePictureFileName(),
        "Profile picture file name should be 'profilePicture.jpg'");
  }

  @Test
  public void testCreateTenant_EncodesPassword() {
    // Arrange
    when(passwordEncoder.encode("rawPassword123")).thenReturn("encodedPassword123");
    when(tenantRepository.save(any(Tenant.class))).thenReturn(tenant);

    // Act
    Tenant createdTenant = tenantService.createTenant(tenant, profilePicture);

    // Assert
    assertEquals("encodedPassword123", createdTenant.getPassword(),
        "Password should be encoded and not the raw password");
  }

  @Test
  public void testCreateTenant_ThrowsExceptionForInvalidProfilePicture() {
    // Arrange
    doThrow(new IllegalArgumentException("Unsupported file type")).when(profilePictureService)
        .saveProfilePicture(profilePicture);

    // Act & Assert
    IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
      tenantService.createTenant(tenant, profilePicture);
    });
    assertEquals("Unsupported file type", exception.getMessage(),
        "Should throw exception for unsupported file type");
  }

/*   @Test <-- Doesn't work, fix
  public void testCreateTenant_ThrowsExceptionForDuplicateUsername() {
      // Arrange
      when(tenantRepository.findByUsername("tenantUser")).thenReturn(Optional.of(tenant));
    
      // Act & Assert
      UserAlreadyExistsException exception = assertThrows(UserAlreadyExistsException.class, () -> {
          Tenant duplicateTenant = new Tenant();
          duplicateTenant.setUsername("tenantUser");
          duplicateTenant.setPassword("somePassword123");
          tenantService.createTenant(duplicateTenant, null);
      });
    
      assertEquals("User already exists", exception.getMessage());
  }
 */
  @Test
  public void testCreateTenant_ThrowsExceptionForRestrictedUsername() {
      // Arrange
      // when(tenantRepository.findByUsername("tenantUser")).thenReturn(Optional.of(tenant));
    
      // Act & Assert
      RestrictedUsernameException exception = assertThrows(RestrictedUsernameException.class, () -> {
          Tenant testTenant = new Tenant();
          testTenant.setUsername("root");
          testTenant.setPassword("somePassword123");
          tenantService.createTenant(testTenant, null);
      });
    
      assertEquals("root", exception.getMessage());
  }
    
}
