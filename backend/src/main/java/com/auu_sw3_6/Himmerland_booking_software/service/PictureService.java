package com.auu_sw3_6.Himmerland_booking_software.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class PictureService {

  // @Value("${profile.picture.directory}") <- Lavede problemer med tests, så hardcoded
  private String profilePictureDirectory = "src/main/resources/database/img/profilePictures/";

  // Hardcoded for now, should properly be changed to a more dynamic solution,
  // maybe
  protected static final String DIRECTORY_PATH = Paths
      .get("src", "main", "resources", "database", "img", "profilePictures").toAbsolutePath().toString();

  public PictureService() {
  }

  public String saveProfilePicture(MultipartFile profilePicture) {
    try {
      File directory = new File(DIRECTORY_PATH);
      if (!directory.exists()) {
        directory.mkdirs();
      }

      String originalFileName = profilePicture.getOriginalFilename();
      String extension = "";
      if (originalFileName != null) {
        int index = originalFileName.lastIndexOf('.');
        if (index > 0) {
          extension = originalFileName.substring(index);
        }
      }

      String uniqueFileName = UUID.randomUUID().toString() + extension;
      Path imagePath = Paths.get(DIRECTORY_PATH, uniqueFileName);
      profilePicture.transferTo(imagePath.toFile());

      return uniqueFileName;
    } catch (IOException e) {
      throw new RuntimeException("Failed to save profile picture", e);
    }
  }

  public Optional<byte[]> readProfilePicture(String fileName) {
    if (fileName != null) {
      File file = new File(profilePictureDirectory, fileName);
      if (!file.exists()) {
        return Optional.empty();
      }
      try {
        byte[] pictureBytes = Files.readAllBytes(file.toPath());
        return Optional.of(pictureBytes);
      } catch (IOException e) {
        throw new RuntimeException("Failed to read profile picture", e);
      }
    }
    return Optional.empty();
  }

  public void setProfilePictureDirectory(String profilePictureDirectory) {
    this.profilePictureDirectory = profilePictureDirectory;
  }

  public String getProfilePictureDirectory() {
    return profilePictureDirectory;
  }

}
