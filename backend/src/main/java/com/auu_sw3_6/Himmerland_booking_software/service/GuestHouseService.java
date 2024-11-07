package com.auu_sw3_6.Himmerland_booking_software.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.auu_sw3_6.Himmerland_booking_software.api.model.GuestHouse;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.GuestHouseRepository;

@Service
public class GuestHouseService extends ResourceService<GuestHouse> {

  @Autowired
  public GuestHouseService(GuestHouseRepository ResourceRepository) {
    super(ResourceRepository);
  }




  public GuestHouse createGuestHouse(GuestHouse guestHouse, MultipartFile resourcePictures) {
    if (guestHouse.getName() == null || guestHouse.getName().isEmpty()) {
      throw new IllegalArgumentException("Name cannot be null or empty.");
    }

    return createResource(guestHouse, resourcePictures);
  }

  public void deleteGuestHouse(Long id) {
    deleteResource(id);
  }

}