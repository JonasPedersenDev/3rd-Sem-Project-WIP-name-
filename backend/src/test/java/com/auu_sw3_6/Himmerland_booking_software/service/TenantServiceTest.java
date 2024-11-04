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

    @InjectMocks
    private TenantService tenantService;

    private Tenant tenant;

    @BeforeEach
    public void setUp() {
        tenant = new Tenant();
        tenant.setId(1L);
        tenant.setUsername("tenantUser");
        tenant.setPassword("rawPassword123");
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
        assertNotNull(createdTenant, "Tenant burde være oprettet og ikke null");
    }

    @Test
    public void testCreateTenant_SavesProfilePicture() throws Exception {
        // Arrange
        when(profilePictureService.saveProfilePicture(profilePicture)).thenReturn("profilePicture.jpg");
        when(tenantRepository.save(any(Tenant.class))).thenReturn(tenant);

        // Act
        Tenant createdTenant = tenantService.createTenant(tenant, profilePicture);

        // Assert
        assertEquals("profilePicture.jpg", createdTenant.getProfilePictureFileName(), "Profilbillede filnavn burde være 'profilePicture.jpg'");
    }

    @Test
    public void testCreateTenant_EncodesPassword() {
        // Arrange
        when(passwordEncoder.encode("rawPassword123")).thenReturn("encodedPassword123");
        when(tenantRepository.save(any(Tenant.class))).thenReturn(tenant);

        // Act
        Tenant createdTenant = tenantService.createTenant(tenant, profilePicture);

        // Assert
        assertEquals("encodedPassword123", createdTenant.getPassword(), "Kodeordet burde være krypteret og ikke det rå kodeord");
    }

    @Test
    public void testCreateTenant_ThrowsExceptionForInvalidProfilePicture() {
        // Arrange
        doThrow(new IllegalArgumentException("Ikke-understøttet filtype")).when(profilePictureService).saveProfilePicture(profilePicture);

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            tenantService.createTenant(tenant, profilePicture);
        });
        assertEquals("Ikke-understøttet filtype", exception.getMessage(), "Skulle kaste undtagelse for ikke-understøttet filtype");
    }
}
