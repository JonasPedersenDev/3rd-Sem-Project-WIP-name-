package com.auu_sw3_6.Himmerland_booking_software.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

  public Booking bookResource(User user, BookingDetails details) {
    ResourceService<?> resourceService = resourceServiceFactory.getServiceByType(details.getResourceType());
    Resource resource = resourceService.getResourceById(details.getResourceID())
        .orElseThrow(() -> new ResourceNotFoundException("Resource not found"));

    LocalDate startDate = details.getStartDate();
    LocalDate endDate = details.getEndDate();

    if (isBookingPeriodInvalid(startDate, endDate)) {
      throw new IllegalArgumentException("Invalid booking period.");
    }

    if (isResourceAvailable(resource, startDate, endDate)) {
      Booking booking = new Booking(resource, user, startDate, endDate,
          details.getPickupTime(), details.getDropoffTime(),
          BookingStatus.PENDING, details.getReceiverName(), details.getHandoverName());

      return bookingRepository.save(booking);
    } else {
      throw new IllegalArgumentException("Resource is not available for the selected dates.");
    }
  }

  private boolean isBookingPeriodInvalid(LocalDate startDate, LocalDate endDate) {
    if (!startDate.isBefore(endDate) || startDate.plusDays(MAX_BOOKING_DAYS).isBefore(endDate)) {
      return true;
    }

    if (startDate.isBefore(LocalDate.now())) {
      return true;
    }

    if (isWeekend(startDate) || isWeekend(endDate)) {
      return true;
    }

    return false;
  }

  private boolean isWeekend(LocalDate date) {
    return date.getDayOfWeek() == DayOfWeek.SATURDAY || date.getDayOfWeek() == DayOfWeek.SUNDAY;
  }

  private boolean isResourceAvailable(Resource resource, LocalDate startDate, LocalDate endDate) {
    List<Booking> bookings = bookingRepository.findByResourceAndStatus(resource, BookingStatus.PENDING);

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

  private List<Booking> getAllActiveBookings() {
    List<Booking> confirmedBookings = bookingRepository.findByStatus(BookingStatus.CONFIRMED);
    List<Booking> pendingBookings = bookingRepository.findByStatus(BookingStatus.PENDING);
    confirmedBookings.addAll(pendingBookings);
    return confirmedBookings;
  }

  private List<Booking> getAllPendingPendingBookings() { // Duplicate??
    return bookingRepository.findByStatus(BookingStatus.PENDING);
  }

  private List<Booking> getAllConfirmedBookings() {
    return bookingRepository.findByStatus(BookingStatus.CONFIRMED);
  }

  public List<Booking> getAllUpcomingPickupsForToday(TimeRange timeRange) {
    List<Booking> bookings = getAllPendingPendingBookings();
    List<Booking> upcomingBookings = new ArrayList<>();

    for (Booking booking : bookings) {
      if (booking.getStartDate().isEqual(LocalDate.now()) && booking.getPickupTime() == timeRange) {
        upcomingBookings.add(booking);
      }
    }

    return upcomingBookings;
  }

  public List<Booking> getAllUpcomingDropoffsForToday(TimeRange timeRange) {
    List<Booking> bookings = getAllConfirmedBookings();
    List<Booking> upcomingBookings = new ArrayList<>();

    for (Booking booking : bookings) {
      if (booking.getEndDate().isEqual(LocalDate.now()) && booking.getDropoffTime() == timeRange) {
        upcomingBookings.add(booking);
      }
    }

    return upcomingBookings;
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

  public void setReceiverName(long bookingId, String receiverName) {
    Booking booking = bookingRepository.findById(bookingId)
        .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));

    if (receiverName != null && !receiverName.trim().isEmpty()) {
      booking.setReceiverName(receiverName.trim());
      booking.setStatus(BookingStatus.COMPLETED);
      bookingRepository.save(booking);
    } else {
      throw new IllegalArgumentException("Receiver name cannot be null or empty.");
    }
  }

  public void setHandoverName(long bookingId, String handoverName) {
    Booking booking = bookingRepository.findById(bookingId)
        .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));

    if (handoverName != null && !handoverName.trim().isEmpty()) {
      booking.setHandoverName(handoverName.trim());
      booking.setStatus(BookingStatus.CONFIRMED);
      bookingRepository.save(booking);
    } else {
      throw new IllegalArgumentException("Handover name cannot be null or empty.");
    }
  }

  public void lateBookingStatus(long bookingId) {
    Booking booking = bookingRepository.findById(bookingId)
        .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));

    booking.setStatus(BookingStatus.LATE);
    bookingRepository.save(booking);

    cancelPendingBookings();
}


  public List<Booking> getAllLateBookings() {
    return bookingRepository.findByStatus(BookingStatus.LATE);
  }

  public List<Booking> getAllPendingBookings() {
    List<Booking> pendingBookings = bookingRepository.findByStatus(BookingStatus.PENDING);
    return pendingBookings;
  }

  public void cancelPendingBookings() {
    List<Booking> lateBookings = getAllLateBookings();
    List<Booking> pendingBookings = bookingRepository.findByStatus(BookingStatus.PENDING);
    
    Map<Resource, Integer> usedCapacityMap = new HashMap<>();
    
    List<Booking> activeBookings = bookingRepository.findByStatus(BookingStatus.CONFIRMED);
    activeBookings.addAll(lateBookings);
    
    for (Booking activeBooking : activeBookings) {
        Resource resource = activeBooking.getResource();
        usedCapacityMap.put(resource, usedCapacityMap.getOrDefault(resource, 0) + 1);
    }
    
    LocalDate currentDate = LocalDate.now();
    for (Booking pendingBooking : pendingBookings) {
        if (!pendingBooking.getStartDate().isEqual(currentDate)) {
            continue;
        }
        
        Resource resource = pendingBooking.getResource();
        int currentUsage = usedCapacityMap.getOrDefault(resource, 0);
        
        if (currentUsage >= resource.getCapacity()) {
            pendingBooking.setStatus(BookingStatus.CANCELED);
            bookingRepository.save(pendingBooking);
        } else {
            usedCapacityMap.put(resource, currentUsage + 1);
        }
    }
}



}
