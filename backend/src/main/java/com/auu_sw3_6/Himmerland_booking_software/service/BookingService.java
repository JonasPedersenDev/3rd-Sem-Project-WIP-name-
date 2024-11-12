package com.auu_sw3_6.Himmerland_booking_software.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Booking;
import com.auu_sw3_6.Himmerland_booking_software.api.model.BookingDate;
import com.auu_sw3_6.Himmerland_booking_software.api.model.BookingDetails;
import com.auu_sw3_6.Himmerland_booking_software.api.model.Resource;
import com.auu_sw3_6.Himmerland_booking_software.api.model.User;
import com.auu_sw3_6.Himmerland_booking_software.api.model.modelEnum.BookingStatus;
import com.auu_sw3_6.Himmerland_booking_software.api.model.modelEnum.TimeRange;
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

  public List<Booking> getAllBookings() {
    return bookingRepository.findAll();
  }

  public Booking getBookingById(long id) {
    return bookingRepository.findById(id).orElse(null);
  }

  public boolean deleteBooking(long id) {
    if (bookingRepository.existsById(id)) {
      bookingRepository.deleteById(id);
      return true;
    } else {
      return false;
    }
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
    TimeRange startTime = details.getPickupTime();
    TimeRange endTime = details.getDropoffTime();
    String initials = details.getInitials();

    Resource resource = resourceService.getResourceById(resourceID)
        .orElseThrow(() -> new ResourceNotFoundException("Resource not found"));

    if (isBookingPeriodInvalid(startDate, endDate)) {
      throw new IllegalArgumentException("Booking period cannot exceed " + MAX_BOOKING_DAYS + " days.");
    }

    if (isResourceAvailable(resource, startDate, endDate)) {
      Booking booking = new Booking(resource, user, startDate, endDate, startTime, endTime,
          BookingStatus.CONFIRMED, initials);
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

  public List<BookingDate> getBookedDatesWithAmount(Resource resource) {
    List<Booking> bookings = bookingRepository.findByResourceAndStatus(resource, BookingStatus.CONFIRMED);

    List<BookingDate> bookedDatesWithCapacity = new ArrayList<>();

    Map<LocalDate, Long> dateToCapacityMap = new HashMap<>();

    for (Booking booking : bookings) {
      LocalDate start = booking.getStartDate();
      LocalDate end = booking.getEndDate();

      for (LocalDate date = start; !date.isAfter(end); date = date.plusDays(1)) {
        dateToCapacityMap.put(date, dateToCapacityMap.getOrDefault(date, 0L) + 1);
      }
    }

    for (Map.Entry<LocalDate, Long> entry : dateToCapacityMap.entrySet()) {
      bookedDatesWithCapacity.add(new BookingDate(entry.getKey(), entry.getValue()));
    }

    return bookedDatesWithCapacity;
  }

  public List<String> getAllInitials() {
    List<Booking> bookings = bookingRepository.findAll();
    return bookings.stream()
                   .map(booking -> booking.getInitials())
                   .collect(Collectors.toList());
}

public boolean setInitialToBooking(long bookingId, String initial) {
  Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
  if (optionalBooking.isPresent()) {
      Booking booking = optionalBooking.get();
      booking.setInitials(initial); // Assuming Booking class has an addInitial method
      bookingRepository.save(booking);
      return true;
  } else {
      return false;
  }
}

}
