package com.auu_sw3_6.Himmerland_booking_software.service;

import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.auu_sw3_6.Himmerland_booking_software.api.model.User;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.AdminRepository;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.TenantRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final TenantRepository tenantRepository;
    private final AdminRepository adminRepository;

    @Autowired
    public CustomUserDetailsService(TenantRepository tenantRepository, AdminRepository adminRepository) {
        this.tenantRepository = tenantRepository;
        this.adminRepository = adminRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<? extends User> user = tenantRepository.findByUsername(username);
        
        if (user.isEmpty()) {
            user = adminRepository.findByUsername(username);
        }

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }

        return new org.springframework.security.core.userdetails.User(
            user.get().getUsername(),
            user.get().getPassword(),
            user.get().getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role))
                .collect(Collectors.toList())
        );
    }
}
