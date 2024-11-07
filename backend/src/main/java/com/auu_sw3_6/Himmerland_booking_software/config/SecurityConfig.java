package com.auu_sw3_6.Himmerland_booking_software.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auu_sw3_6.Himmerland_booking_software.security.JwtAuthorizationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Autowired
  private JwtAuthorizationFilter jwtAuthorizationFilter;

  @Autowired
  private UserDetailsService userDetailsService;

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(authz -> authz
            .requestMatchers("/api/tenant/register", "/api/login", "/api/logout").permitAll()
            .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-resources/**").permitAll()
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            .requestMatchers("/api/tenant/**").hasRole("TENANT")
            .requestMatchers("/api/tool/**", "/api/guestHouse/**", "/api/utility/**").hasAnyRole("TENANT", "ADMIN")
            .anyRequest().authenticated()
        // Require JWT for all other requests: .authenticated()
        // Allow access for all other requests: .permitAll()
        )
        .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  public AuthenticationManager authManager(HttpSecurity http) throws Exception {
    AuthenticationManagerBuilder authenticationManagerBuilder = http
        .getSharedObject(AuthenticationManagerBuilder.class);
    authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    return authenticationManagerBuilder.build();
  }
}
