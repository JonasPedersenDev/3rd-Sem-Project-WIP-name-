package com.auu_sw3_6.Himmerland_booking_software.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long tenantId;
    private long resourceId;
    private String bookingStart;
    private String bookingEnd;
    private String status;
    private String bookingPictureFileName;
    private String bookingDescription;

    public Booking() {
    }

    public Booking(long id, long tenantId, long resourceId, String bookingStart, String bookingEnd, String status,
            String bookingPictureFileName, String bookingDescription) {
        this.id = id;
        this.tenantId = tenantId;
        this.resourceId = resourceId;
        this.bookingStart = bookingStart;
        this.bookingEnd = bookingEnd;
        this.status = status;
        this.bookingPictureFileName = bookingPictureFileName;
        this.bookingDescription = bookingDescription;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getTenantId() {
        return tenantId;
    }

    public void setTenantId(long tenantId) {
        this.tenantId = tenantId;
    }

    public long getResourceId() {
        return resourceId;
    }

    public void setResourceId(long resourceId) {
        this.resourceId = resourceId;
    }

    public String getBookingStart() {
        return bookingStart;
    }

    public void setBookingStart(String bookingStart) {
        this.bookingStart = bookingStart;
    }

    public String getBookingEnd() {
        return bookingEnd;
    }

    public void setBookingEnd(String bookingEnd) {
        this.bookingEnd = bookingEnd;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getBookingPictureFileName() {
        return bookingPictureFileName;
    }

    public void setBookingPictureFileName(String bookingPictureFileName) {
        this.bookingPictureFileName = bookingPictureFileName;
    }

    public String getBookingDescription() {
        return bookingDescription;
    }

    public void setBookingDescription(String bookingDescription) {
        this.bookingDescription = bookingDescription;
    }

}
