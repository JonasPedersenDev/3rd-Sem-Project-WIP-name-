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
import org.springframework.web.multipart.MultipartFile;

import com.auu_sw3_6.Himmerland_booking_software.api.model.GuestHouse;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.GuestHouseRepository;

@ExtendWith(MockitoExtension.class)
public class GuestHouseServiceTest {

    @Mock
    private GuestHouseRepository guestHouseRepository;

    @Mock
    private MultipartFile resourcePictures;

    @InjectMocks
    private GuestHouseService guestHouseService;

    private GuestHouse guestHouse;

    @BeforeEach
    public void setUp() {
        guestHouse = new GuestHouse();
        guestHouse.setId(1L);
        guestHouse.setName("Test Guest House");
    }

    @Test
    public void testCreateGuestHouse_WithValidName_ShouldCreateGuestHouse() {
        // Arrange
        when(guestHouseRepository.save(any(GuestHouse.class))).thenReturn(guestHouse);

        // Act
        GuestHouse createdGuestHouse = guestHouseService.createGuestHouse(guestHouse, resourcePictures);

        // Assert
        assertNotNull(createdGuestHouse, "GuestHouse burde være oprettet og ikke null");
        assertEquals("Test Guest House", createdGuestHouse.getName(), "Navnet på GuestHouse burde være 'Test Guest House'");
    }

    @Test
    public void testCreateGuestHouse_WithNullName_ShouldThrowException() {
        // Arrange
        guestHouse.setName(null);

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            guestHouseService.createGuestHouse(guestHouse, resourcePictures);
        });
        assertEquals("Name cannot be null or empty.", exception.getMessage(), "Skulle kaste undtagelse for null navn");
    }

    @Test
    public void testCreateGuestHouse_WithEmptyName_ShouldThrowException() {
        // Arrange
        guestHouse.setName("");

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            guestHouseService.createGuestHouse(guestHouse, resourcePictures);
        });
        assertEquals("Name cannot be null or empty.", exception.getMessage(), "Skulle kaste undtagelse for tomt navn");
    }

    @Test
    public void testDeleteGuestHouse_ShouldCallDeleteResource() {
        // Act
        guestHouseService.deleteGuestHouse(1L);

        // Assert
        verify(guestHouseRepository).deleteById(1L);
    }
}
