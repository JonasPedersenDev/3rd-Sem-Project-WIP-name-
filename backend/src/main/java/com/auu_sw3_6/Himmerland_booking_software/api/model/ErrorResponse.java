package com.auu_sw3_6.Himmerland_booking_software.api.model;

import java.util.Map;

public class ErrorResponse {
    private String message;
    private int status;
    private String timestamp;
    private Map<String, String> details;

    // Constructor
    public ErrorResponse(String message, int status) {
        this.message = message;
        this.status = status;
        this.timestamp = String.valueOf(System.currentTimeMillis());
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public Map<String, String> getDetails() {
        return details;
    }

    public void setDetails(Map<String, String> details) {
        this.details = details;
    }

}
