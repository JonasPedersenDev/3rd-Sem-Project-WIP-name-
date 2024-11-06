package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.auu_sw3_6.Himmerland_booking_software.api.model.LoginRequest;
import com.auu_sw3_6.Himmerland_booking_software.security.JwtUtil;

import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletResponse;

@RestController
public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final JwtUtil jwtUtil;

  @Autowired
  public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
    this.authenticationManager = authenticationManager;
    this.jwtUtil = jwtUtil;
  }

  @PermitAll
  @PostMapping(value = "/api/login", produces = "application/json")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
    try {
      Authentication authentication = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

      SecurityContextHolder.getContext().setAuthentication(authentication);

      String role = authentication.getAuthorities().stream().findFirst().get().getAuthority();
      String token = jwtUtil.generateToken(loginRequest.getUsername());

      ResponseCookie jwtCookie = ResponseCookie.from("jwt", token)
          .httpOnly(true)
          .secure(true)
          .path("/")
          .maxAge(60 * 60 * 5) // 5 hours
          .sameSite("none") // only for development, maybe
          .build();

      ResponseCookie authIndicatorCookie = ResponseCookie.from("authIndicator", role)
          .httpOnly(false)
          .secure(true)
          .path("/")
          .maxAge(60 * 60 * 5) // 5 hours
          .sameSite("none") // only for development, maybe
          .build();

          response.addHeader("Set-Cookie", jwtCookie.toString());
          response.addHeader("Set-Cookie", authIndicatorCookie.toString());
    
      return ResponseEntity.ok(Map.of("message", "Login successful"));

    } catch (AuthenticationException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
    }
  }
}
