package com.auu_sw3_6.Himmerland_booking_software.service;

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
    private PictureService profilbilledeService;

    @Mock
    private PasswordEncoder kodeordKrypter;

    @Mock
    private MultipartFile profilbillede;

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
    public void testOpretAdmin_SkalGemAdminMedKrypteretKodeordOgProfilbillede() throws Exception {
        // Arrange
        when(profilbilledeService.saveProfilePicture(profilbillede)).thenReturn("profilbillede.jpg");
        when(kodeordKrypter.encode("Kodeord123")).thenReturn("krypteretKodeord123");
        when(adminRepository.save(any(Admin.class))).thenReturn(admin);

        // Act
        Admin oprettetAdmin = adminService.createAdmin(admin, profilbillede);

        // Assert
        verify(adminRepository).save(admin);
        assertNotNull(oprettetAdmin);
        assertEquals("krypteretKodeord123", oprettetAdmin.getPassword());
        assertEquals("profilbillede.jpg", oprettetAdmin.getProfilePictureFileName());
    }

    @Test
    public void testOpretAdmin_SkalKasteUndtagelseForUgyldigtProfilbillede() {
        // Arrange
        when(profilbilledeService.saveProfilePicture(profilbillede)).thenThrow(new IllegalArgumentException("Ikke-understøttet filtype"));

        // Act & Assert
        IllegalArgumentException undtagelse = assertThrows(IllegalArgumentException.class, () -> {
            adminService.createAdmin(admin, profilbillede);
        });
        assertEquals("Ikke-understøttet filtype", undtagelse.getMessage());
    }

    @Test
    public void testOpretAdmin_SkalKasteUndtagelseForDuplikeretBrugernavn() {
        // Arrange
        when(adminRepository.findByUsername("adminBruger")).thenReturn(Optional.of(admin));

        // Act & Assert
        IllegalArgumentException undtagelse = assertThrows(IllegalArgumentException.class, () -> {
            Admin duplikatAdmin = new Admin();
            duplikatAdmin.setUsername("adminBruger");
            duplikatAdmin.setPassword("andetKodeord");
            adminService.createAdmin(duplikatAdmin, profilbillede);
        });
        assertEquals("Brugernavn eksisterer allerede", undtagelse.getMessage());
    }
}