package com.auu_sw3_6.Himmerland_booking_software.service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Tenant;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.TenantRepository;
import com.auu_sw3_6.Himmerland_booking_software.exception.RestrictedUsernameException;
import com.auu_sw3_6.Himmerland_booking_software.exception.UserAlreadyExistsException;

import jakarta.annotation.PostConstruct;

@Service
public class TenantService extends UserService<Tenant> {

  private final AdminService adminService;

  @Value("${restricted.usernames}")
  private String restrictedUsernames;

  private Set<String> restrictedUsernamesSet;

  @Autowired
  public TenantService(TenantRepository tenantRepository, PictureService profilePictureService,
      PasswordEncoder passwordEncoder, AdminService adminService) {
    super(tenantRepository, profilePictureService, passwordEncoder);
    this.adminService = adminService;
  }

  private Set<String> initializeRestrictedUsernames() {
    if (restrictedUsernames == null || restrictedUsernames.isEmpty()) {
      System.out.println("Restricted usernames not set.");
      return new HashSet<>();
    }
    return new HashSet<>(Arrays.asList(restrictedUsernames.split(",")));
  }

  public Tenant createTenant(Tenant tenant, MultipartFile profilePicture) {
    if (tenant.getUsername() == null || tenant.getUsername().isEmpty()) {
      throw new IllegalArgumentException("Username cannot be null or empty.");
    }

    if (restrictedUsernamesSet.contains(tenant.getUsername())) {
      throw new RestrictedUsernameException(tenant.getUsername());
    }

    if (userExists(tenant.getUsername())) {
      throw new UserAlreadyExistsException(tenant.getUsername());
  }

    return createUser(tenant, profilePicture);
  }

  private boolean userExists(String username) {
    return getUserByUsername(username).isPresent() || adminService.getUserByUsername(username).isPresent();
}


  @PostConstruct
  public void init() {
    restrictedUsernamesSet = initializeRestrictedUsernames();
  }

  public void setRestrictedUsernamesSet(Set<String> restrictedUsernames) {
    this.restrictedUsernamesSet = restrictedUsernames;
  }

}
