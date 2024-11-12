package com.auu_sw3_6.Himmerland_booking_software.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.auu_sw3_6.Himmerland_booking_software.api.model.CaretakerInitials;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.CaretakerInitialsRepository;

@Service
public class CaretakerInitialsService {

    private final CaretakerInitialsRepository repository;

    @Autowired
    public CaretakerInitialsService(CaretakerInitialsRepository repository) {
        this.repository = repository;
    }

    public CaretakerInitials save(CaretakerInitials caretakerInitials) {
        return repository.save(caretakerInitials);
    }
}
