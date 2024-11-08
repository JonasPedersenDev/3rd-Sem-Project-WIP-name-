package com.auu_sw3_6.Himmerland_booking_software.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Booking;
import com.auu_sw3_6.Himmerland_booking_software.api.model.BookingDetails;
import com.auu_sw3_6.Himmerland_booking_software.api.model.Resource;
import com.auu_sw3_6.Himmerland_booking_software.api.model.User;
import com.auu_sw3_6.Himmerland_booking_software.api.model.modelEnum.BookingStatus;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.BookingRepository;
import com.auu_sw3_6.Himmerland_booking_software.exception.ResourceNotFoundException;

@Service
public class BookingService {

  @Autowired
  private final BookingRepository bookingRepository;

  private final ResourceServiceFactory resourceServiceFactory;

  private static final int MAX_BOOKING_DAYS = 5;

  public BookingService(BookingRepository bookingRepository, ResourceServiceFactory resourceServiceFactory) {
    this.bookingRepository = bookingRepository;
    this.resourceServiceFactory = resourceServiceFactory;
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
  public Booking bookResource(User user, BookingDetails details) {
    ResourceService<?> resourceService = resourceServiceFactory.getServiceByType(details.getResourceType());

    long resourceID = details.getResourceID();
    LocalDate startDate = details.getStartDate();
    LocalDate endDate = details.getEndDate();
    LocalTime startTime = details.getStartTime();
    LocalTime endTime = details.getEndTime();

    Resource resource = resourceService.getResourceById(resourceID)
        .orElseThrow(() -> new ResourceNotFoundException("Resource not found"));

    if (isBookingPeriodInvalid(startDate, endDate)) {
      throw new IllegalArgumentException("Booking period cannot exceed " + MAX_BOOKING_DAYS + " days.");
    }

    if (isResourceAvailable(resource, startDate, endDate)) {
      Booking booking = new Booking(resource, user, startDate, endDate, startTime, endTime,
          BookingStatus.CONFIRMED);
      return bookingRepository.save(booking);
    } else {
      throw new IllegalArgumentException("Resource is not available for the selected dates.");
    }
  }

  private boolean isBookingPeriodInvalid(LocalDate startDate, LocalDate endDate) {
    return !startDate.isBefore(endDate) || startDate.plusDays(MAX_BOOKING_DAYS).isBefore(endDate);
  }

  public boolean isResourceAvailable(Resource resource, LocalDate startDate, LocalDate endDate) {
    List<Booking> bookings = bookingRepository.findByResourceAndStatus(resource, BookingStatus.CONFIRMED);

    for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
      LocalDate finalDate = date;

      long overlappingBookingsCount = bookings.stream()
          .filter(b -> b.getStartDate().isBefore(finalDate.plusDays(1)) && b.getEndDate().isAfter(finalDate))
          .count();

      if (overlappingBookingsCount >= resource.getCapacity()) {
        return false;
      }
    }

    return true;
  }

  public Map<LocalDate, Integer> getBookedDatesWithCapacity(Resource resource) {
    List<Booking> bookings = bookingRepository.findByResourceAndStatus(resource, BookingStatus.CONFIRMED);

    Map<LocalDate, Integer> bookedDatesWithCapacity = new HashMap<>();

    for (Booking booking : bookings) {
      LocalDate start = booking.getStartDate();
      LocalDate end = booking.getEndDate();

      for (LocalDate date = start; !date.isAfter(end); date = date.plusDays(1)) {
        bookedDatesWithCapacity.put(date, bookedDatesWithCapacity.getOrDefault(date, 0) + 1);
      }
    }

    return bookedDatesWithCapacity;
  }

}
