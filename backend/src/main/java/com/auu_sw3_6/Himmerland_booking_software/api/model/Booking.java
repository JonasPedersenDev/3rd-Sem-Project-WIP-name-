package com.auu_sw3_6.Himmerland_booking_software.api.model;

import java.time.LocalDate;
import java.time.LocalTime;

import com.auu_sw3_6.Himmerland_booking_software.api.model.modelEnum.BookingStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Booking {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @ManyToOne
  @JoinColumn(name = "resource_id", nullable = false)
  private Resource resource;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  private LocalDate startDate;
  private LocalDate endDate;

  private LocalTime pickupTime;
  private LocalTime dropoffTime;

  @Enumerated(EnumType.STRING)
  private BookingStatus status;

  public Booking() {
  }

  public Booking(Resource resource, User user, LocalDate startDate, LocalDate endDate,
      LocalTime pickupTime, LocalTime dropoffTime, BookingStatus status) {
    this.resource = resource;
    this.user = user;
    this.startDate = startDate;
    this.endDate = endDate;
    this.pickupTime = pickupTime;
    this.dropoffTime = dropoffTime;
    this.status = status;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public Resource getResource() {
    return resource;
  }

  public void setResource(Resource resource) {
    this.resource = resource;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
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

  public LocalTime getPickupTime() {
    return pickupTime;
  }

  public void setPickupTime(LocalTime pickupTime) {
    this.pickupTime = pickupTime;
  }

  public LocalTime getDropoffTime() {
    return dropoffTime;
  }

  public void setDropoffTime(LocalTime dropoffTime) {
    this.dropoffTime = dropoffTime;
  }

  public BookingStatus getStatus() {
    return status;
  }

  public void setStatus(BookingStatus status) {
    this.status = status;
  }

}
