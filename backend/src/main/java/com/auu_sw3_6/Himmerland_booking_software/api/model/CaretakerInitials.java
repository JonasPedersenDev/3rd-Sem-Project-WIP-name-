package com.auu_sw3_6.Himmerland_booking_software.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class CaretakerInitials {

    @Id
    private String initials;

    public CaretakerInitials() {}

    public CaretakerInitials(String initials) {
        this.initials = initials;
    }

    public String getInitials() {
        return initials;
    }

    public void setInitials(String initials) {
        this.initials = initials;
    }
}
