package com.auu_sw3_6.Himmerland_booking_software.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Booking;
import com.auu_sw3_6.Himmerland_booking_software.api.model.Resource;
import com.auu_sw3_6.Himmerland_booking_software.api.model.User;
import com.auu_sw3_6.Himmerland_booking_software.api.model.modelEnum.BookingStatus;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.BookingRepository;

@Service
public class BookingService {

  @Autowired
  private final BookingRepository bookingRepository;

  private static final int MAX_BOOKING_DAYS = 5;

  public BookingService(BookingRepository bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  public Booking createBooking(Booking booking) {
    return bookingRepository.save(booking);
  }

  public Booking getBookingById(long id) {
    return bookingRepository.findById(id).orElse(null);
  }

  public void deleteBooking(long id) {
    bookingRepository.deleteById(id);
  }

  public Booking updateBooking(Booking booking) {
    return bookingRepository.save(booking);
  }

  // Method to book a resource for a user
  public Booking bookResource(Resource resource, User user, LocalDate startDate, LocalDate endDate) {
    if (isBookingPeriodInvalid(startDate, endDate)) {
      throw new IllegalArgumentException("Booking period cannot exceed " + MAX_BOOKING_DAYS + " days.");
    }

    if (isResourceAvailable(resource, startDate, endDate)) {
      Booking booking = new Booking(resource, user, startDate, endDate, LocalTime.of(9, 0), LocalTime.of(17, 0),
          BookingStatus.PENDING);
      return bookingRepository.save(booking);
    } else {
      throw new IllegalArgumentException("Resource is not available for the selected dates.");
    }
  }

  // Check if booking period is valid (max 5 days)
  private boolean isBookingPeriodInvalid(LocalDate startDate, LocalDate endDate) {
    return !startDate.isBefore(endDate) || startDate.plusDays(MAX_BOOKING_DAYS).isBefore(endDate);
  }

  // Check resource availability within date range
  public boolean isResourceAvailable(Resource resource, LocalDate startDate, LocalDate endDate) {
    List<Booking> bookings = bookingRepository.findByResourceAndStatus(resource, BookingStatus.CONFIRMED);
    return bookings.stream()
        .noneMatch(b -> b.getStartDate().isBefore(endDate) && b.getEndDate().isAfter(startDate));
  }

  // Method to get all booked dates for a specific resource
  public List<LocalDate> getBookedDates(Resource resource) {
    List<Booking> bookings = bookingRepository.findByResourceAndStatus(resource, BookingStatus.CONFIRMED);
    return bookings.stream()
        .flatMap(b -> b.getStartDate().datesUntil(b.getEndDate()))
        .collect(Collectors.toList());
  }

  public List<LocalDate> getReservedDates(long resourceId) {
    return null;
  }

}
