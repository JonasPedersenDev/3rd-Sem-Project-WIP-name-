package com.auu_sw3_6.Himmerland_booking_software.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Tool;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.ToolRepository;

@Service
public class ToolService {

    private final ToolRepository toolRepository;

    @Autowired
    public ToolService(ToolRepository toolRepository) {
        this.toolRepository = toolRepository;
    }

    public Tool saveTool(Tool tool) {
        return toolRepository.save(tool);
    }

    public Optional<Tool> getToolById(Long id) {
        return toolRepository.findById(id);
    }

    public List<Tool> getAllTools() {
        return toolRepository.findAll();
    }

    public void deleteTool(Long id) {
        toolRepository.deleteById(id);
    }
}
