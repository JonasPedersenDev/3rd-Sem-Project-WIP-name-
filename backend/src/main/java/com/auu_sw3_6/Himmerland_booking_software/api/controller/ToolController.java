package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Tool;
import com.auu_sw3_6.Himmerland_booking_software.service.ToolService;

@RestController
@RequestMapping("/api/tools")
public class ToolController {

    private final ToolService toolService;

    @Autowired
    public ToolController(ToolService toolService) {
        this.toolService = toolService;
    }

    @PostMapping
    public Tool saveTool(@RequestBody Tool tool) {
        return toolService.saveTool(tool);
    }

    @GetMapping
    public List<Tool> getAllTools() {
        return toolService.getAllTools();
    }

    @GetMapping("/{id}")
    public Optional<Tool> getToolById(@PathVariable Long id) {
        return toolService.getToolById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteTool(@PathVariable Long id) {
        toolService.deleteTool(id);
    }
}
