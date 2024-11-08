package com.auu_sw3_6.Himmerland_booking_software.api.model;

import java.time.LocalDate;
import java.time.LocalTime;

import com.auu_sw3_6.Himmerland_booking_software.api.model.modelEnum.ResourceType;
import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class BookingDetails {

  @Schema(description = "Unique identifier of the resource to be booked", example = "1")
  @NotNull(message = "Resource ID cannot be null")
  @Positive(message = "Resource ID must be a positive number")
  private Long resourceID;

  @Schema(description = "Type of the resource being booked", example = "UTILITY")
  @NotNull(message = "Resource type cannot be null")
  private ResourceType resourceType;

  @Schema(description = "Start date of the booking in yyyy-MM-dd format", example = "2024-11-07")
  @NotNull(message = "Start date cannot be null")
  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate startDate;

  @Schema(description = "End date of the booking in yyyy-MM-dd format", example = "2024-11-07")
  @NotNull(message = "End date cannot be null")
  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate endDate;

  @Schema(description = "Start time of the booking in HH:mm:ss format", example = "14:00:00")
  @NotNull(message = "Start time cannot be null")
  @JsonFormat(pattern = "HH:mm:ss")
  private LocalTime startTime;

  @Schema(description = "End time of the booking in HH:mm:ss format", example = "16:00:00")
  @NotNull(message = "End time cannot be null")
  @JsonFormat(pattern = "HH:mm:ss")
  private LocalTime endTime;

  public BookingDetails() {
  }

  public BookingDetails(Long resourceID, ResourceType resourceType, LocalDate startDate, LocalDate endDate,
      LocalTime startTime, LocalTime endTime) {
    this.resourceID = resourceID;
    this.resourceType = resourceType;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  public Long getResourceID() {
    return resourceID;
  }

  public void setResourceID(Long resourceID) {
    this.resourceID = resourceID;
  }

  public ResourceType getResourceType() {
    return resourceType;
  }

  public void setResourceType(ResourceType resourceType) {
    this.resourceType = resourceType;
  }

  public LocalDate getStartDate() {
    return startDate;
  }

  public void setStartDate(LocalDate startDate) {
    this.startDate = startDate;
  }

  public LocalDate getEndDate() {
    return endDate;
  }

  public void setEndDate(LocalDate endDate) {
    this.endDate = endDate;
  }

  public LocalTime getStartTime() {
    return startTime;
  }

  public void setStartTime(LocalTime startTime) {
    this.startTime = startTime;
  }

  public LocalTime getEndTime() {
    return endTime;
  }

  public void setEndTime(LocalTime endTime) {
    this.endTime = endTime;
  }
}