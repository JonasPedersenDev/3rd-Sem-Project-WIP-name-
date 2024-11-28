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
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Tool;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.ToolRepository;
import com.auu_sw3_6.Himmerland_booking_software.exception.ResourceNotFoundException;

@ExtendWith(MockitoExtension.class)
public class ToolServiceTest {

    @Mock
    private ToolRepository toolRepository;

    @Mock
    private PictureService pictureService;  // Mock the PictureService

    @Mock
    private MultipartFile resourcePictures;

    @InjectMocks
    private ToolService toolService;

    private Tool tool;

    @BeforeEach
    public void setUp() {
        tool = new Tool();
        tool.setId(1L);
        tool.setName("Test Tool");
    }

    @Test
    public void testCreateTool_shouldSaveToolAndReturnToolObject() {
        // Arrange
        when(toolRepository.save(any(Tool.class))).thenReturn(tool);
        when(pictureService.savePicture(any(MultipartFile.class), any(Boolean.class))).thenReturn("savedPicture.jpg");  // Mock savePicture

        // Act
        Tool createdTool = toolService.createTool(tool, resourcePictures);

        // Assert
        assertNotNull(createdTool);
        assertEquals("Test Tool", createdTool.getName());
        verify(toolRepository).save(tool);
        verify(pictureService).savePicture(any(MultipartFile.class), any(Boolean.class));  // Verify that savePicture was called
    }

    @Test
    public void testCreateTool_shouldThrowExceptionWhenRepositoryFails() {
        // Arrange
        when(toolRepository.save(any(Tool.class))).thenThrow(new RuntimeException("Database error"));
        when(pictureService.savePicture(any(MultipartFile.class), any(Boolean.class))).thenReturn("savedPicture.jpg");

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            toolService.createTool(tool, resourcePictures);
        });
        assertEquals("Database error", exception.getMessage());
    }


/*     @Test <-- Not implimented in the original code
    public void testCreateTool_shouldThrowExceptionForUnsupportedFileType() {
        // Arrange
        when(resourcePictures.getOriginalFilename()).thenReturn("unsupportedFile.txt");

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            toolService.createTool(tool, resourcePictures);
        });
        assertEquals("Unsupported file type", exception.getMessage());
    }
 */
/* 
    @Test  //BURDE VÆRE I RESOURCESERVICETEST, ER BARE UDKOMMENTERET SÅ TESTER OM DEN VIRKER HERINDE
        public void testUpdateResource_shouldUpdateResourceSuccessfully() {
        // Arrange
        tool.setDescription("test description");
 
        Tool updatedTool = new Tool();
        updatedTool.setName("updated tool");
        updatedTool.setDescription("updated description");
 
        when(toolRepository.findById(1L)).thenReturn(Optional.of(tool));
        when(toolRepository.save(any(Tool.class))).thenReturn(tool);
 
        // Act
        Tool result = toolService.updateResource(updatedTool, 1L);
 
        // Assert
        assertNotNull(result);
        assertEquals("updated tool", result.getName());
        assertEquals("updated description", result.getDescription());
        verify(toolRepository).findById(1L);
        verify(toolRepository).save(tool);
    }

    @Test //BURDE VÆRE I RESOURCESERVICETEST, ER BARE UDKOMMENTERET SÅ TESTER OM DEN VIRKER HERINDE
        public void testUpdateResource_shouldThrowExceptionWhenResourceNotFound() {
        // Arrange
        Tool updatedTool = new Tool();
        updatedTool.setName("Updated Tool");

        when(toolRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            toolService.updateResource(updatedTool, 1L);
        });

        assertEquals("Resource with ID 1 not found", exception.getMessage());
        verify(toolRepository).findById(1L);
        verify(toolRepository, never()).save(any(Tool.class));
    } */
}
 