package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auu_sw3_6.Himmerland_booking_software.api.model.User;
import com.auu_sw3_6.Himmerland_booking_software.service.UserService;


@RestController
@RequestMapping("api/user")
public abstract class UserController<T extends User> {

    protected final UserService<T> userService;

    @Autowired
    public UserController(UserService<T> userService) {
        this.userService = userService;
    }

    @GetMapping("{id}")
    public ResponseEntity<T> getUserById(@PathVariable Long id) {
        Optional<T> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("{id}/profilePicture")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable long id) {
        Optional<byte[]> imageBytesOptional = userService.getProfilePictureByUserId(id);
        if (imageBytesOptional.isPresent()) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imageBytesOptional.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

}
