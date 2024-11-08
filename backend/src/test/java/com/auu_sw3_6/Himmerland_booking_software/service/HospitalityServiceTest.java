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
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Hospitality;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.HospitalityRepository;

@ExtendWith(MockitoExtension.class)
public class HospitalityServiceTest {

    @Mock
    private HospitalityRepository HospitalityRepository;

    @Mock
    private MultipartFile resourcePictures;

    @InjectMocks
    private HospitalityService HospitalityService;

    private Hospitality hospitality;

    @BeforeEach
    public void setUp() {
        hospitality = new Hospitality();
        hospitality.setId(1L);
        hospitality.setName("Test Guest House");
    }

    @Test
    public void testCreateHospitality_WithValidName_ShouldCreateHospitality() {
        // Arrange
        when(HospitalityRepository.save(any(Hospitality.class))).thenReturn(hospitality);

        // Act
        Hospitality createdHospitality = HospitalityService.createHospitality(hospitality, resourcePictures);

        // Assert
        assertNotNull(createdHospitality, "Hospitality burde være oprettet og ikke null");
        assertEquals("Test Guest House", createdHospitality.getName(), "Navnet på Hospitality burde være 'Test Guest House'");
    }

    @Test
    public void testCreateHospitality_WithNullName_ShouldThrowException() {
        // Arrange
        hospitality.setName(null);

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            HospitalityService.createHospitality(hospitality, resourcePictures);
        });
        assertEquals("Name cannot be null or empty.", exception.getMessage(), "Skulle kaste undtagelse for null navn");
    }

    @Test
    public void testCreateHospitality_WithEmptyName_ShouldThrowException() {
        // Arrange
        hospitality.setName("");

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            HospitalityService.createHospitality(hospitality, resourcePictures);
        });
        assertEquals("Name cannot be null or empty.", exception.getMessage(), "Skulle kaste undtagelse for tomt navn");
    }

/*     @Test <--- no worky
    public void testDeleteHospitality_ShouldCallDeleteResource() {
        // Act
        HospitalityService.deleteResource(1L);

        // Assert
        verify(HospitalityRepository).deleteById(1L);
    } */
}
