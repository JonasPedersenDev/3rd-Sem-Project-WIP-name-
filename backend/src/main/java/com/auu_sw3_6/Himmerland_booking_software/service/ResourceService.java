package com.auu_sw3_6.Himmerland_booking_software.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Resource;

@Service
public class ResourceService {

  private List<Resource> resourceList;

  public ResourceService() {
    resourceList = new ArrayList<>();

    Resource boremaskine = new Resource(1, "Boremaskine", "En boremaskine", "Boremaskine.jpg", "Værktøj", 1,
        "available");
    Resource hammer = new Resource(2, "Hammer", "En hammer", "Hammer.jpg", "Værktøj", 1, "available");
    Resource målebånd = new Resource(3, "Målebånd", "Et målebånd", "Målebånd.jpg", "Værktøj", 1, "unavailable");
    Resource sav = new Resource(4, "Sav", "En sav", "Sav.jpg", "Værktøj", 1, "maintenance");
    Resource skruetrækker = new Resource(5, "Skruetrækker", "En skruetrækker", "Skruetrækker.jpg", "Værktøj", 1,
        "available");

    resourceList.addAll(Arrays.asList(boremaskine, hammer, målebånd, sav, skruetrækker));
  }

  public Optional<Resource> getResource(Integer id) {
    Optional optional = Optional.empty();
    for (Resource resource : resourceList) {
      if (resource.getId() == id) {
        optional = Optional.of(resource);
        return optional;
      }
    }
    return optional;
  }

  public List<Resource> getResources() {
    return resourceList;
  }

}
