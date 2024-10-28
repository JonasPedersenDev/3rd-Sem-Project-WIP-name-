package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auu_sw3_6.Himmerland_booking_software.api.model.ErrorResponse;
import com.auu_sw3_6.Himmerland_booking_software.api.model.User;
import com.auu_sw3_6.Himmerland_booking_software.service.UserService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("api/user")
public abstract class UserController<T extends User> {

  protected final UserService<T> userService;

  @Autowired
  public UserController(UserService<T> userService) {
    this.userService = userService;
  }

  @SecurityRequirement(name = "bearerAuth")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_TENANT')")
  @GetMapping(produces = "application/json")
  public ResponseEntity<Object> getUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String username = authentication.getName();

    Optional<T> user = userService.getUserByUsername(username);
    if (user.isPresent()) {
      return ResponseEntity.ok(user.get());
    }
    ErrorResponse errorResponse = new ErrorResponse("User not found", 404);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);

  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping("{id}")
  public ResponseEntity<Object> getUserById(@PathVariable Long id) {
    Optional<T> user = userService.getUserById(id);
    if (user.isPresent()) {
      return ResponseEntity.ok(user.get());
    }
    ErrorResponse errorResponse = new ErrorResponse("User not found", 404);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping("{id}/profilePicture")
  public ResponseEntity<Object> getProfilePictureByID(@PathVariable long id) {
    Optional<byte[]> imageBytesOptional = userService.getProfilePictureByUserId(id);
    if (imageBytesOptional.isPresent()) {
      return ResponseEntity.ok()
          .contentType(MediaType.IMAGE_JPEG)
          .body(imageBytesOptional.get());
    }
    ErrorResponse errorResponse = new ErrorResponse("Profile picture not found", 404);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
  }

  @SecurityRequirement(name = "bearerAuth")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_TENANT')")
  @GetMapping("profilePicture")
  public ResponseEntity<Object> getProfilePicture() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String username = authentication.getName();

    Optional<byte[]> imageBytesOptional = userService.getProfilePictureByUsername(username);
    if (imageBytesOptional.isPresent()) {
      return ResponseEntity.ok()
          .contentType(MediaType.IMAGE_JPEG)
          .body(imageBytesOptional.get());
    }

    ErrorResponse errorResponse = new ErrorResponse("Profile picture not found", 404);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
  }

}
