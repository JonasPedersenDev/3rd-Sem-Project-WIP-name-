package com.auu_sw3_6.Himmerland_booking_software.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Resource;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.ResourceRepository;

@Service
public class ResourceService {

    private final ResourceRepository<Resource> resourceRepository;

    @Autowired
    public ResourceService(ResourceRepository<Resource> resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    public Optional<Resource> getResource(Long id) {
        return resourceRepository.findById(id);
    }

    public List<Resource> getResources() {
        return resourceRepository.findAll();
    }

    public Resource saveResource(Resource resource) {
        return resourceRepository.save(resource);
    }

    public void deleteResource(Long id) {
        resourceRepository.deleteById(id);
    }

    // ADD THIS METHOD
    public void addResource(Resource resource) {
        resourceRepository.save(resource);
    }
}
