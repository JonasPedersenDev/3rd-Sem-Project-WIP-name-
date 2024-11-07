package com.auu_sw3_6.Himmerland_booking_software.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Booking;
import com.auu_sw3_6.Himmerland_booking_software.api.model.BookingDetails;
import com.auu_sw3_6.Himmerland_booking_software.api.model.User;
import com.auu_sw3_6.Himmerland_booking_software.exception.UserNotFoundException;
import com.auu_sw3_6.Himmerland_booking_software.security.CustomUserDetails;

public abstract class UserService<T extends User> {

  private final JpaRepository<T, Long> repository;
  private final PictureService profilePictureService;
  private final PasswordEncoder passwordEncoder;
  private final BookingService bookingService;

  @Autowired
public UserService(JpaRepository<T, Long> repository, PictureService profilePictureService,
                   PasswordEncoder passwordEncoder, BookingService bookingService) {
    this.repository = repository;
    this.profilePictureService = profilePictureService;
    this.passwordEncoder = passwordEncoder;
    this.bookingService = bookingService;
}

  public T createUser(T user, MultipartFile profilePicture) {

    if (profilePicture != null && !profilePicture.isEmpty()) {
      String uniqueFileName = profilePictureService.saveProfilePicture(profilePicture);
      user.setProfilePictureFileName(uniqueFileName);
    }
    user.setPassword(passwordEncoder.encode(user.getPassword()));
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
    return userOptional.flatMap(user -> profilePictureService.readProfilePicture(user.getProfilePictureFileName()));
  }

  public T updateUser(T updatedUser) {
    return repository.save(updatedUser);
  }

  public void deleteUser(Long id) {
    repository.deleteById(id);
  }

  public Optional<byte[]> getProfilePictureByUsername(String username) {
    Optional<T> user = getUserByUsername(username);
    return user.flatMap(u -> getProfilePictureByUserId(u.getId()));
  }

  public Optional<T> getUserByUsername(String username) {
    return repository.findAll().stream()
        .filter(u -> u.getUsername().equals(username))
        .findFirst();
  }

  public User getAuthenticatedUser() throws UserNotFoundException {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication == null || !authentication.isAuthenticated()) {
      throw new UserNotFoundException("User not authenticated");
    }

    CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
    User user = userDetails.toUser();

    if (user == null) {
      throw new UserNotFoundException("User not found");
    }

    return user;
  }

  public Booking createBooking(BookingDetails details) {
    User user = getAuthenticatedUser();
    return bookingService.bookResource(user, details);
  }

}
