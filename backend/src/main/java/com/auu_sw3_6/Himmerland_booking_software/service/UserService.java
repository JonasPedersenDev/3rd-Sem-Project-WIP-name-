package com.auu_sw3_6.Himmerland_booking_software.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import com.auu_sw3_6.Himmerland_booking_software.api.model.User;

public abstract class UserService<T extends User> {

    private final JpaRepository<T, Long> repository;
    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public UserService(JpaRepository<T, Long> repository) {
        this.repository = repository;
    }

    public T createUser(T user, MultipartFile profilePicture) {
        // Handle profile picture upload
        if (profilePicture != null && !profilePicture.isEmpty()) {
            String directoryPath = Paths.get("src", "main", "resources", "database", "img", "profilePictures")
                .toAbsolutePath().toString();

            File directory = new File(directoryPath);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            String fileName = profilePicture.getOriginalFilename();
            File imageFile = new File(directory, fileName);
            try {
                profilePicture.transferTo(imageFile);
                user.setProfilePicturePath("src/main/resources/database/img/profilePictures/" + fileName);
            } catch (IOException e) {
                log.error("Failed to save profile picture: {}", e.getMessage());
                throw new RuntimeException("Failed to save profile picture", e);
            }
        }

        String rawPassword = user.getPassword();
        String encodedPassword = passwordEncoder.encode(rawPassword);
        user.setPassword(encodedPassword);

        return repository.save(user);
    }

    public List<T> getAllUsers() {
        return repository.findAll();
    }

    public Optional<T> getUserById(Long id) {
        return repository.findById(id);
    }

    public Optional<byte[]> getProfilePictureByUserId(long userId) {
        Optional<T> userOptional = repository.findById(userId);
        if (userOptional.isPresent() && userOptional.get().getProfilePicturePath() != null) {
            String picturePath = userOptional.get().getProfilePicturePath();
            try {
                Path path = Paths.get(picturePath);
                return Optional.of(Files.readAllBytes(path));
            } catch (IOException e) {
                log.error("Error reading profile picture: {}", e.getMessage());
            }
        }
        return Optional.empty();
    }

    public T updateUser(T updatedUser) {
        return repository.save(updatedUser);
    }

    public void deleteUser(Long id) {
        repository.deleteById(id);
    }
}
