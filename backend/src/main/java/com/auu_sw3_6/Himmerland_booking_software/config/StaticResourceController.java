package com.auu_sw3_6.Himmerland_booking_software.config;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StaticResourceController {
    private final String resourcesPath = "src/main/resources/database/img/resources/";

    @GetMapping("/resources/{filename:.+}")
    public ResponseEntity<byte[]> serveStaticResource(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(resourcesPath + filename);
            if (Files.exists(filePath)) {
                byte[] data = Files.readAllBytes(filePath);
                HttpHeaders headers = new HttpHeaders();
                headers.add("Content-Type", Files.probeContentType(filePath));
                return new ResponseEntity<>(data, headers, HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
