package com.auu_sw3_6.Himmerland_booking_software.service;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.Mock;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import com.auu_sw3_6.Himmerland_booking_software.api.model.User;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.UserBaseRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    static class ConcreteUser extends User {
        // Additional properties or methods as needed
    }

    @Mock
    private UserBaseRepository<ConcreteUser> repository;
    @Mock
    private PictureService profilePictureService;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private MultipartFile profilePicture;

    private UserService<ConcreteUser> userService;

    private ConcreteUser user;

    @BeforeEach
    public void setUp() {
        userService = new UserService<ConcreteUser>(repository, profilePictureService, passwordEncoder) {};
        user = new ConcreteUser();
        user.setId(1L);
        user.setName("Tester");
        user.setMobileNumber("+4588888888");
        user.setEmail("testEmail@gmail.com");
        user.setUsername("testuser");
        user.setPassword("rawPassword123");

        // Mark profilePicture mock as lenient to avoid issues in tests that don't use it
        lenient().when(profilePicture.getOriginalFilename()).thenReturn("profile.jpg");
    }

    @Test
    public void testCreateUser_withProfilePicture_shouldSaveUserWithEncodedPassword() throws Exception {
        // Arrange
        when(profilePictureService.saveProfilePicture(profilePicture)).thenReturn("uniqueProfile.jpg");
        when(passwordEncoder.encode("rawPassword123")).thenReturn("encodedPassword123");
        when(repository.save(any(ConcreteUser.class))).thenReturn(user);

        // Act
        ConcreteUser createdUser = userService.createUser(user, profilePicture);

        // Assert
        verify(repository).save(user);
        assertNotNull(createdUser.getPassword());
        assertNotEquals("rawPassword123", createdUser.getPassword());
        assertEquals("encodedPassword123", createdUser.getPassword());
        
        // Ensure the profile picture filename is correctly set
        assertNotNull(createdUser.getProfilePictureFileName());
        assertTrue(createdUser.getProfilePictureFileName().endsWith(".jpg")
                || createdUser.getProfilePictureFileName().endsWith(".png"));
    }

    @Test
    public void testGetUserById_shouldReturnUserIfFound() {
        // Arrange
        when(repository.findById(1L)).thenReturn(Optional.of(user));

        // Act
        Optional<ConcreteUser> foundUser = userService.getUserById(1L);

        // Assert
        assertTrue(foundUser.isPresent());
        assertEquals("testuser", foundUser.get().getUsername());
    }

    @Test
    public void testDeleteUser_shouldDeleteUser() {
        // Act
        userService.deleteUser(1L);

        // Assert
        verify(repository).deleteById(1L);
    }

    // Add more tests as necessary...
}
