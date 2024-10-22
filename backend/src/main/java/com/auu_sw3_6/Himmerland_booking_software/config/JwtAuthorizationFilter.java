package com.auu_sw3_6.Himmerland_booking_software.config;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.auu_sw3_6.Himmerland_booking_software.service.CustomUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthorizationFilter.class);

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService; 

    public JwtAuthorizationFilter(AuthenticationManager authManager, JwtUtil jwtUtil, CustomUserDetailsService userDetailsService) {
        super(authManager);
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        String token = header.replace("Bearer ", "");
        String username = jwtUtil.extractUsername(token);

        // Log the extracted username
        logger.info("JWT parsed, extracted username: {}", username);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Validate the token
            if (jwtUtil.validateToken(token, username)) {
                // Load user details using CustomUserDetailsService
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                // Log the roles (authorities) of the user
                logger.info("User roles retrieved for username {}: {}", username, userDetails.getAuthorities());

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                // Log when the token is invalid
                logger.warn("Invalid JWT for username: {}", username);
            }
        }

        chain.doFilter(request, response);
    }
}