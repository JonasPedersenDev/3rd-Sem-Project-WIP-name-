package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Tool;
import com.auu_sw3_6.Himmerland_booking_software.service.ToolService;

@RestController
@RequestMapping("api/tool")
public class ToolController extends ResourceController<Tool> {

    private final ToolService toolService;

    @Autowired
    public ToolController(ToolService toolService) {
        super(toolService);
        this.toolService = toolService;
    }

    @GetMapping(value = "/all", produces = "application/json")
    public ResponseEntity <List<Tool>> getAllTools() {
        return ResponseEntity.ok(toolService.getAllResources());
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteTool(@PathVariable Long id) {
        toolService.deleteTool(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/create", consumes = {"multipart/form-data"})
    public ResponseEntity<Tool> createTool(@RequestPart("tool") Tool tool, @RequestPart("resourcePictures") MultipartFile resourcePictures) {
        Tool createdTool = toolService.createTool(tool, resourcePictures);
        return ResponseEntity.ok(createdTool);
    }
}