package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
