package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseCookie;

@RestController
public class LogoutController {

    @PostMapping("/api/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        // Invalidate the session if it exists
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        // Clear the authentication
        SecurityContextHolder.clearContext();

        // Clear the JWT cookie
        ResponseCookie jwtCookie = ResponseCookie.from("jwt", "")
            .httpOnly(true)
            .secure(true)
            .path("/")
            .maxAge(0) // Expire the cookie immediately
            .sameSite("none") // only for development, maybe
            .build();

        response.addHeader("Set-Cookie", jwtCookie.toString());

        return "User has been logged out successfully.";
    }
}