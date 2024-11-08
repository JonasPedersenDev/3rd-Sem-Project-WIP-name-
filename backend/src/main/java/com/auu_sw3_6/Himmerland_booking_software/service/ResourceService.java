package com.auu_sw3_6.Himmerland_booking_software.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.multipart.MultipartFile;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Resource;

public abstract class ResourceService<T extends Resource> {

    private static final Logger log = LoggerFactory.getLogger(ResourceService.class);

    private final JpaRepository<T, Long> repository;

    @Value("${resource.pictures.directory}")
    private String resourcePicturesDirectory;

    @Autowired
    public ResourceService(JpaRepository<T, Long> repository) {
        this.repository = repository;
    }

    public T createResource(T resource, MultipartFile resourcePictures) {
        if (resourcePictures != null && !resourcePictures.isEmpty()) {
            try {
                // Hardcoded for now, should be changed to a more dynamic solution, maybe
                String directoryPath = Paths.get("src", "main", "resources", "database", "img", "resourcePicturess")
                        .toAbsolutePath().toString();

                File directory = new File(directoryPath);
                if (!directory.exists()) {
                    directory.mkdirs();
                }

                String originalFileName = resourcePictures.getOriginalFilename();
                String extension = "";
                
                if (originalFileName != null) {
                    int index = originalFileName.lastIndexOf('.');
                    if (index > 0) {
                        extension = originalFileName.substring(index);
                    }
                }

                String uniqueFileName = UUID.randomUUID().toString() + extension;
                Path imagePath = Paths.get(directoryPath, uniqueFileName);

                resourcePictures.transferTo(imagePath.toFile());

                resource.setResourcePictureFileName(uniqueFileName);
            } catch (IOException e) {
                log.error("Failed to save resource picture: {}", e.getMessage());
                throw new RuntimeException("Failed to save resource picture", e);
            }
        }

        return repository.save(resource);
    }

    public List<T> getAllResources() {
        return repository.findAll();
    }

    public Optional<T> getResourceById(Long id) {
        return repository.findById(id);
    }

    public Optional<byte[]> getresourcePicturesByResourceId(long resourceId) {
        Optional<T> resourceOptional = repository.findById(resourceId);
        if (resourceOptional.isPresent() && resourceOptional.get().getResourcePictureFileName() != null) {
            String picturePath = resourcePicturesDirectory + resourceOptional.get().getResourcePictureFileName();
            try {
                Path path = Paths.get(picturePath);
                return Optional.of(Files.readAllBytes(path));
            } catch (IOException e) {
                log.error("Error reading picture for resource {}: {}", resourceId, e.getMessage());
            }
        }
        return Optional.empty();
    }

    public T updateResource(T updatedResource) {
        return repository.save(updatedResource);
    }

    public boolean deleteResource(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public Optional<byte[]> getResourcePictureByResourcename(String resourceName) {
        Optional<T> resource = getResourceByResourceName(resourceName);
        return resource.flatMap(u -> getresourcePicturesByResourceId(u.getId()));
    }

    public Optional<T> getResourceByResourceName(String resourceName) {
        return repository.findAll().stream()
                .filter(u -> u.getName().equals(resourceName))
                .findFirst();
    }

}
