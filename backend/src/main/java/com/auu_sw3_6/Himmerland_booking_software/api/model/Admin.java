package com.auu_sw3_6.Himmerland_booking_software.api.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import java.util.List;

@Entity
public class Admin extends User {

    @ElementCollection
    private List<String> caretakerNames;

    public Admin() {
    }

    public List<String> getCaretakerNames() {
        return caretakerNames;
    }

    public void setCaretakerNames(List<String> caretakerNames) {
        this.caretakerNames = caretakerNames;
    }

    public void addCaretakerName(String caretakerName) {
        this.caretakerNames.add(caretakerName);
    }

    public void removeCaretakerName(String caretakerName) {
        this.caretakerNames.remove(caretakerName);
    }
}
