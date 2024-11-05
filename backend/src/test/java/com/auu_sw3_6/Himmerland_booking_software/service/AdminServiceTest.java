package com.auu_sw3_6.Himmerland_booking_software.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Admin;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.AdminRepository;

@ExtendWith(MockitoExtension.class)
public class AdminServiceTest {

  @Mock
  private AdminRepository adminRepository;

  @Mock
  private PictureService profilePictureService;

  @Mock
  private PasswordEncoder passwordEncoder;

  @Mock
  private MultipartFile profileImage;

  @InjectMocks
  private AdminService adminService;

  private Admin admin;

  @BeforeEach
  public void setUp() {
    admin = new Admin();
    admin.setId(1L);
    admin.setUsername("adminBruger");
    admin.setPassword("Kodeord123");
  }

  @Test
  public void testCreateAdmin_SavesAdminWithEncryptedPasswordAndProfilePicture() throws Exception {
    // Arrange
    when(profilePictureService.saveProfilePicture(profileImage)).thenReturn("profilbillede.jpg");
    when(passwordEncoder.encode("Kodeord123")).thenReturn("krypteretKodeord123");
    when(adminRepository.save(any(Admin.class))).thenReturn(admin);

    // Act
    Admin createdAdmin = adminService.createAdmin(admin, profileImage);

    // Assert
    verify(adminRepository).save(admin);
    assertNotNull(createdAdmin);
    assertEquals("krypteretKodeord123", createdAdmin.getPassword());
    assertEquals("profilbillede.jpg", createdAdmin.getProfilePictureFileName());
  }

  @Test
  public void testCreateAdmin_ThrowsExceptionForInvalidProfilePicture() {
    // Arrange
    when(profilePictureService.saveProfilePicture(profileImage))
        .thenThrow(new IllegalArgumentException("Ikke-understøttet filtype"));

    // Act & Assert
    IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
      adminService.createAdmin(admin, profileImage);
    });
    assertEquals("Ikke-understøttet filtype", exception.getMessage());
  }
}