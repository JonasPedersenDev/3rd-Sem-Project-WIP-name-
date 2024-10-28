/* package com.auu_sw3_6.Himmerland_booking_software.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.Mock;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

@ExtendWith(MockitoExtension.class)
public class PictureServiceTest {

  private PictureService pictureService;

  @Mock
  private MultipartFile profilePicture;

  @BeforeEach
  public void setUp() {
    pictureService = new PictureService();
    pictureService.setProfilePictureDirectory("src/main/resources/database/img/profilePictures/");
  }

  @Test
  public void testSaveProfilePicture_shouldSavePictureAndReturnUniqueFileName() throws Exception {
    // Arrange
    String originalFileName = "testProfile.jpg";
    when(profilePicture.getOriginalFilename()).thenReturn(originalFileName);
    when(profilePicture.isEmpty()).thenReturn(false);

    // Act
    String savedFileName = pictureService.saveProfilePicture(profilePicture);

    // Assert
    assertNotNull(savedFileName);
    assertTrue(savedFileName.endsWith(".jpg") || savedFileName.endsWith(".png"));

    // Check if the file was saved
    System.out.println("savedFileName: " + savedFileName);
    System.out.println("profilePictureDirectory: " + pictureService.profilePictureDirectory);
    File savedFile = new File(Paths.get(pictureService.profilePictureDirectory, savedFileName).toString());
    System.out.println("savedFile: " + savedFile);
    assertTrue(savedFile.exists());

    // Cleanup
    Files.delete(savedFile.toPath());
  }

  @Test
  public void testReadProfilePicture_shouldReturnBytesIfFileExists() throws IOException {
    // Arrange
    String fileName = "existingPicture.jpg";
    // Create a temporary file to simulate an existing picture
    File tempFile = new File(pictureService.profilePictureDirectory, fileName);
    Files.write(tempFile.toPath(), new byte[] { 1, 2, 3, 4 }); // Dummy bytes

    // Act
    Optional<byte[]> pictureBytes = pictureService.readProfilePicture(fileName);

    // Assert
    assertTrue(pictureBytes.isPresent());
    assertEquals(4, pictureBytes.get().length);

    // Cleanup
    Files.delete(tempFile.toPath());
  }

  @Test
  public void testReadProfilePicture_shouldReturnEmptyOptionalIfFileDoesNotExist() {
    // Arrange
    String nonExistentFileName = "nonExistentPicture.jpg";

    // Act
    Optional<byte[]> pictureBytes = pictureService.readProfilePicture(nonExistentFileName);

    // Assert
    assertFalse(pictureBytes.isPresent());
  }

  @Test
  public void testSaveProfilePicture_shouldThrowExceptionWhenIOExceptionOccurs() throws Exception {
    // Arrange
    when(profilePicture.getOriginalFilename()).thenReturn("testProfile.jpg");
    when(profilePicture.isEmpty()).thenReturn(false);
    doThrow(new IOException("Disk error")).when(profilePicture).transferTo(any(File.class));

    // Act & Assert
    RuntimeException exception = assertThrows(RuntimeException.class, () -> {
      pictureService.saveProfilePicture(profilePicture);
    });
    assertEquals("Failed to save profile picture", exception.getMessage());
  }
}
 */