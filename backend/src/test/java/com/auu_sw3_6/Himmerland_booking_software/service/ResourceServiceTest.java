/* package com.auu_sw3_6.Himmerland_booking_software.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.multipart.MultipartFile;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Resource;

@ExtendWith(MockitoExtension.class)
public class ResourceServiceTest {

    @Mock
    private JpaRepository<Resource, Long> repository;

    @Mock
    private MultipartFile resourcePicture;

    @InjectMocks
    private final ResourceService<Resource> resourceService = new ResourceService<Resource>(repository) {};

    private ConcreteResource resource;

    private static class ConcreteResource extends Resource {
        // Implement any abstract methods if there are any
    }

    @BeforeEach
    public void setUp() {
        resource = new ConcreteResource();
        resource.setId(1L);
        resource.setName("TestResource");
    }
    @Test
    public void testCreateResource_ShouldSaveResourceWithPicture() throws Exception {
        // Arrange
        when(resourcePicture.getOriginalFilename()).thenReturn("picture.jpg");
        when(resourcePicture.isEmpty()).thenReturn(false);

        String uniqueFileName = UUID.randomUUID().toString() + ".jpg";
        String directoryPath = Paths.get("src", "main", "resources", "database", "img", "resourcePicturess").toAbsolutePath().toString();
        File directory = new File(directoryPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        
        Path imagePath = Paths.get(directoryPath, uniqueFileName);
        doAnswer(invocation -> {
            Files.createFile(imagePath);  // Simulerer lagring af billedet
            return null;
        }).when(resourcePicture).transferTo(any(File.class));

        when(repository.save(any(Resource.class))).thenReturn(resource);

        // Act
        Resource createdResource = resourceService.createResource(resource, resourcePicture);

        // Assert
        assertNotNull(createdResource.getResourcePictureFileName(), "Ressourcebilledet burde være gemt med et unikt filnavn.");
        assertTrue(new File(imagePath.toString()).exists(), "Fil burde eksistere på den angivne sti.");
        
        // Cleanup
        Files.deleteIfExists(imagePath);
    }

    @Test
    public void testCreateResource_ShouldThrowExceptionWhenSavingPictureFails() throws IOException {
        // Arrange
        when(resourcePicture.isEmpty()).thenReturn(false);
        doThrow(new IOException("Disk fejl")).when(resourcePicture).transferTo(any(File.class));

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            resourceService.createResource(resource, resourcePicture);
        });
        assertEquals("Failed to save resource picture", exception.getMessage(), "Fejlbeskeden burde matche forventet besked.");
    }

    @Test
    public void testGetAllResources_ShouldReturnAllResources() {
        // Arrange
        List<Resource> resources = List.of(new ConcreteResource(), new ConcreteResource());
        when(repository.findAll()).thenReturn(resources);

        // Act
        List<Resource> result = resourceService.getAllResources();

        // Assert
        assertEquals(2, result.size(), "Skal returnere alle ressourcer fra databasen.");
    }

    @Test
    public void testGetResourceById_ShouldReturnResourceIfFound() {
        // Arrange
        when(repository.findById(1L)).thenReturn(Optional.of(resource));

        // Act
        Optional<Resource> result = resourceService.getResourceById(1L);

        // Assert
        assertTrue(result.isPresent(), "Skal returnere ressourcen hvis fundet.");
        assertEquals("TestResource", result.get().getName(), "Navnet på ressourcen skal matche.");
    }

    @Test
    public void testGetResourcePictureByResourceId_ShouldReturnPictureBytesIfExists() throws IOException {
        // Arrange
        String fileName = "resourcePicture.jpg";
        resource.setResourcePictureFileName(fileName);
        when(repository.findById(1L)).thenReturn(Optional.of(resource));

        Path picturePath = Paths.get("src", "main", "resources", "database", "img", "resourcePicturess", fileName);
        Files.write(picturePath, new byte[]{1, 2, 3, 4});  // Simulerer et eksisterende billede

        // Act
        Optional<byte[]> result = resourceService.getresourcePicturesByResourceId(1L);

        // Assert
        assertTrue(result.isPresent(), "Skal returnere byte-data hvis filen findes.");
        assertEquals(4, result.get().length, "Byte-længden skal matche den forventede størrelse.");

        // Cleanup
        Files.deleteIfExists(picturePath);
    }

    @Test
    public void testGetResourcePictureByResourceId_ShouldReturnEmptyIfPictureNotFound() {
        // Arrange
        when(repository.findById(1L)).thenReturn(Optional.of(resource));

        // Act
        Optional<byte[]> result = resourceService.getresourcePicturesByResourceId(1L);

        // Assert
        assertFalse(result.isPresent(), "Skal returnere en tom Optional hvis billedet ikke findes.");
    }

    @Test
    public void testDeleteResource_ShouldRemoveResource() {
        // Act
        resourceService.deleteResource(1L);

        // Assert
        verify(repository).deleteById(1L);
    }
}
 */