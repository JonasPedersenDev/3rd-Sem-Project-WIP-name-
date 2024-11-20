package com.auu_sw3_6.Himmerland_booking_software.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Admin;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.AdminRepository;

@Service
public class AdminService extends UserService<Admin> {

  private static final Long ADMIN_ID = 1L;

  private final AdminRepository adminRepository;

  @Autowired
  public AdminService(AdminRepository adminRepository, PictureService profilePictureService,
      PasswordEncoder passwordEncoder, BookingService bookingService) {
    super(adminRepository, profilePictureService, passwordEncoder, bookingService);
    this.adminRepository = adminRepository; // Explicitly store the repository
  }

  public Admin createAdmin(Admin admin, MultipartFile profilePicture) {
    return createUser(admin, profilePicture);
  }

  public void addCaretakerName(String caretakerName) {
    String cleanedName = caretakerName.trim().replaceAll("^\"|\"$", "");

    Admin admin = adminRepository.findById(ADMIN_ID)
        .orElseThrow(() -> new IllegalStateException("Admin not found with ID: " + ADMIN_ID));
    admin.addCaretakerName(cleanedName);
    adminRepository.save(admin);
}

public List<String> getAllCaretakerNames() {
  Admin admin = adminRepository.findById(ADMIN_ID)
      .orElseThrow(() -> new IllegalStateException("Admin not found with ID: " + ADMIN_ID));
  return admin.getCaretakerNames();
}

}
