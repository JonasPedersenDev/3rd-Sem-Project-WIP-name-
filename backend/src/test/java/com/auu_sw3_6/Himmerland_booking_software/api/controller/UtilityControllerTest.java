/* package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.isNull;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Utility;
import com.auu_sw3_6.Himmerland_booking_software.service.UtilityService;

@ExtendWith(MockitoExtension.class)
public class UtilityControllerTest {

    @Mock
    private UtilityService utilityService;

    @InjectMocks
    private UtilityController utilityController;

    private Utility utility;

    @BeforeEach
    public void setUp() {
        utility = new Utility();
        utility.setId(1L);
        utility.setName("Test Utility");
    }

    @Test
    public void testCreateUtility_ReturnsCreatedUtility() {
        // Arrange
        MultipartFile resourcePictures = mock(MultipartFile.class);
        when(utilityService.createUtility(any(Utility.class), any(MultipartFile.class))).thenReturn(utility);

        // Act
        ResponseEntity<Utility> response = utilityController.createUtility(utility, resourcePictures);

        // Assert
        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(utility, response.getBody());
    }

    @Test
    public void testCreateUtility_CallsUtilityService() {
        // Arrange
        MultipartFile resourcePictures = mock(MultipartFile.class);
        when(utilityService.createUtility(any(Utility.class), any(MultipartFile.class))).thenReturn(utility);

        // Act
        utilityController.createUtility(utility, resourcePictures);

        // Assert
        verify(utilityService, times(1)).createUtility(utility, resourcePictures);
    }

    @Test
    public void testCreateUtility_HandlesNullFileGracefully() {
        // Arrange
        when(utilityService.createUtility(any(Utility.class), isNull())).thenReturn(utility);

        // Act
        ResponseEntity<Utility> response = utilityController.createUtility(utility, null);

        // Assert
        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(utility, response.getBody());
    }

    @Test
    public void testCreateUtility_ReturnsErrorOnServiceFailure() {
        // Arrange
        MultipartFile resourcePictures = mock(MultipartFile.class);
        when(utilityService.createUtility(any(Utility.class), any(MultipartFile.class)))
            .thenThrow(new RuntimeException("Service error"));

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            utilityController.createUtility(utility, resourcePictures);
        });
    }
}
 */