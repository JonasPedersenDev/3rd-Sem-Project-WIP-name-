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
    tenant.setUsername("lejerBruger");
    tenant.setPassword("kodeord123");

    tenantService.setRestrictedUsernamesSet(new HashSet<>(Arrays.asList("administrator", "rod")));
  }

  @Test
  public void testCreateTenant_CallsSaveMethodOnRepository() {
    // Arrange 
    when(tenantRepository.save(any(Tenant.class))).thenReturn(tenant);
    when(adminService.getUserByUsername(tenant.getUsername())).thenReturn(Optional.empty());

    // Act 
    tenantService.createTenant(tenant, profilePicture);

    // Assert - Bekræft at save-metoden blev kaldt
    verify(tenantRepository).save(tenant);
  }

  @Test
  public void testCreateTenant_ReturnsNonNullTenant() {
    // Arrange
    when(tenantRepository.save(any(Tenant.class))).thenReturn(tenant);
    when(adminService.getUserByUsername(tenant.getUsername())).thenReturn(Optional.empty());

    // Act
    Tenant oprettetLejer = tenantService.createTenant(tenant, profilePicture);

    // Assert - Bekræft at lejer blev oprettet og ikke er null
    assertNotNull(oprettetLejer, "Lejer skal oprettes og ikke være null");
  }

  @Test
  public void testCreateTenant_SavesProfilePicture() throws Exception {
    // Arrange
    when(profilePictureService.saveProfilePicture(profilePicture)).thenReturn("profilbillede.jpg");
    when(tenantRepository.save(any(Tenant.class))).thenReturn(tenant);
    when(adminService.getUserByUsername(tenant.getUsername())).thenReturn(Optional.empty());

    // Act 
    Tenant oprettetLejer = tenantService.createTenant(tenant, profilePicture);

    // Assert - Bekræft at profilbillede blev gemt korrekt
    assertEquals("profilbillede.jpg", oprettetLejer.getProfilePictureFileName(),
        "Profilbillede filnavn skal være 'profilbillede.jpg'");
  }

  @Test
  public void testCreateTenant_EncodesPassword() {
    // Arrange 
    when(passwordEncoder.encode("kodeord123")).thenReturn("kodetKodeord123");
    when(tenantRepository.save(any(Tenant.class))).thenReturn(tenant);
    when(adminService.getUserByUsername(tenant.getUsername())).thenReturn(Optional.empty());

    // Act 
    Tenant oprettetLejer = tenantService.createTenant(tenant, profilePicture);

    // Assert - Bekræft at kodeordet blev kodet korrekt
    assertEquals("kodetKodeord123", oprettetLejer.getPassword(),
        "Kodeord skal være kodet og ikke det rå kodeord");
  }

  @Test
  public void testCreateTenant_ThrowsExceptionForInvalidProfilePicture() {
    // Arrange 
    doThrow(new IllegalArgumentException("Ikke-understøttet filtype")).when(profilePictureService)
        .saveProfilePicture(profilePicture);
    when(adminService.getUserByUsername(tenant.getUsername())).thenReturn(Optional.empty());

    // Act & Assert - Bekræft at IllegalArgumentException bliver kastet
    IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
      tenantService.createTenant(tenant, profilePicture);
    });
    assertEquals("Ikke-understøttet filtype", exception.getMessage(),
        "Bør kaste en exception for ikke-understøttet filtype");
  }
/* 
  @Test
  void createTenant_shouldThrowUserAlreadyExistsException_whenUsernameExists() {
      // Arrange 
      String duplikeretBrugernavn = "eksisterendeBruger";
      Tenant nyLejer = new Tenant();
      nyLejer.setUsername(duplikeretBrugernavn);
      when(tenantRepository.findByUsername(duplikeretBrugernavn)).thenReturn(Optional.of(nyLejer));
      when(adminService.getUserByUsername(duplikeretBrugernavn)).thenReturn(Optional.empty());

      // Act & Assert 
      UserAlreadyExistsException exception = assertThrows(UserAlreadyExistsException.class, () -> {
          tenantService.createTenant(nyLejer, profilePicture);
      });
      
      assertEquals("Bruger med brugernavn 'eksisterendeBruger' findes allerede", exception.getMessage());
  }
*/

  @Test
  public void testCreateTenant_ThrowsExceptionForRestrictedUsername() {
      // Arrange
      RestrictedUsernameException exception = assertThrows(RestrictedUsernameException.class, () -> {
          Tenant testLejer = new Tenant();
          testLejer.setUsername("rod");
          testLejer.setPassword("etKodeord123");
          tenantService.createTenant(testLejer, null);
      });
    
      // assert
      assertEquals("rod", exception.getMessage());
  }

}
