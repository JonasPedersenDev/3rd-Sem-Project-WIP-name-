package com.auu_sw3_6.Himmerland_booking_software.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Booking;
import com.auu_sw3_6.Himmerland_booking_software.api.model.BookingDate;
import com.auu_sw3_6.Himmerland_booking_software.api.model.BookingDetails;
import com.auu_sw3_6.Himmerland_booking_software.api.model.Resource;
import com.auu_sw3_6.Himmerland_booking_software.api.model.User;
import com.auu_sw3_6.Himmerland_booking_software.api.model.modelEnum.BookingStatus;
import com.auu_sw3_6.Himmerland_booking_software.api.model.modelEnum.ResourceType;
import com.auu_sw3_6.Himmerland_booking_software.api.model.modelEnum.TimeRange;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.BookingRepository;
import com.auu_sw3_6.Himmerland_booking_software.exception.BookingNotFoundException;
import com.auu_sw3_6.Himmerland_booking_software.exception.IllegalBookingException;
import com.auu_sw3_6.Himmerland_booking_software.exception.ResourceNotFoundException;
import com.auu_sw3_6.Himmerland_booking_software.service.event.CancelNotificationEvent;

@Service
public class BookingService {

  @Autowired
  private final BookingRepository bookingRepository;
  private final ResourceServiceFactory resourceServiceFactory;
  private final ApplicationEventPublisher eventPublisher;
  private static final int MAX_BOOKING_DAYS = 5;
  private static final int COOLDOWN_DAYS = 15;
  private static final int MAX_ACTIVE_PER_RESOURCE = 5;

  public BookingService(BookingRepository bookingRepository, ResourceServiceFactory resourceServiceFactory, ApplicationEventPublisher eventPublisher) {
    this.bookingRepository = bookingRepository;
    this.resourceServiceFactory = resourceServiceFactory;
    this.eventPublisher = eventPublisher;
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

    List<Booking> bookings = getAllBookings();
    bookingRepository.deleteAll(bookings);
    if (bookingRepository.existsById(id)) {
      bookingRepository.deleteById(id);
      return true;
    } else {
      return false;
    }
  }

  public List<Booking> getBookingsByUserID(long userID) {
    return bookingRepository.findAll().stream().filter(booking -> booking.getUser().getId() == userID)
        .collect(Collectors.toList());
  }

  public Booking updateBooking(Booking booking) {
    return bookingRepository.save(booking);
  }

  public Booking editBooking(long id, BookingDetails editBookingRequest, User user) {
    Booking booking = bookingRepository.findById(id)
        .orElseThrow(() -> new BookingNotFoundException("Booking not found with ID: " + id));

    if (booking.getUser().getId() != user.getId()) {
      throw new IllegalBookingException("User is not allowed to edit this booking.");
    }

    if (booking.getStatus() == BookingStatus.COMPLETED) {
      throw new IllegalBookingException("Cannot edit completed booking.");
    }
    if (booking.getStatus() == BookingStatus.CANCELED) {
      throw new IllegalBookingException("Cannot edit canceled booking.");
    }
    if (booking.getStatus() == BookingStatus.LATE) {
      throw new IllegalBookingException("Cannot edit missed booking.");
    }

    if (booking.getStatus() == BookingStatus.CONFIRMED) {
      if (editBookingRequest.getStartDate() != booking.getStartDate()) {
        throw new IllegalBookingException("Cannot change booking start date.");
      }
    }

    if (isBookingPeriodInvalid(editBookingRequest.getStartDate(), editBookingRequest.getEndDate(),
        editBookingRequest.getPickupTime(), editBookingRequest.getDropoffTime())) {
      throw new IllegalBookingException("Invalid booking period.");
    }

    if (isResourceAvailableForEdit(booking.getResource(), editBookingRequest.getStartDate(),
        editBookingRequest.getEndDate(), booking, user)) {
      booking.setStartDate(editBookingRequest.getStartDate());
      booking.setEndDate(editBookingRequest.getEndDate());
      booking.setPickupTime(editBookingRequest.getPickupTime());
      booking.setDropoffTime(editBookingRequest.getDropoffTime());

      return bookingRepository.save(booking);
    } else {
      throw new IllegalBookingException("Resource is not available for the selected dates.");
    }
  }

  public Booking bookResource(User user, BookingDetails details) {
    ResourceService<?> resourceService = resourceServiceFactory.getServiceByType(details.getResourceType());
    Resource resource = resourceService.getResourceById(details.getResourceID())
        .orElseThrow(() -> new ResourceNotFoundException("Resource not found"));

    LocalDate startDate = details.getStartDate();
    LocalDate endDate = details.getEndDate();

    if (getBookingsByUserID(user.getId()).stream().filter((booking) -> booking.getStatus() != BookingStatus.CANCELED).count() >= resource.getCapacity() * MAX_ACTIVE_PER_RESOURCE) {
      throw new IllegalBookingException("Too many active bookings.");
    }

    if (isBookingPeriodInvalid(startDate, endDate, details.getPickupTime(), details.getDropoffTime())) {
      throw new IllegalBookingException("Invalid booking period.");
    }

    if (isResourceAvailable(resource, startDate, endDate, user)) {
      Booking booking = new Booking(resource, user, startDate, endDate,
          details.getPickupTime(), details.getDropoffTime(),
          BookingStatus.PENDING, details.getReceiverName(), details.getHandoverName());

      return bookingRepository.save(booking);
    } else {
      throw new IllegalBookingException("Resource is not available for the selected dates.");
    }
  }

  private boolean isBookingPeriodInvalid(LocalDate startDate, LocalDate endDate, TimeRange pickupTime,
      TimeRange dropoffTime) {
    LocalDate today = LocalDate.now();
    LocalTime now = LocalTime.now();

    if (!startDate.isBefore(endDate) || startDate.plusDays(MAX_BOOKING_DAYS).isBefore(endDate)) {
      return true;
    }

    if (startDate.isBefore(today)) {
      return true;
    }

    if (startDate.equals(today) && pickupTime.getStartTime().isBefore(now)) {
      return true;
    }

    if (endDate.equals(today) && dropoffTime.getEndTime().isBefore(now)) {
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

  private boolean isResourceAvailable(Resource resource, LocalDate startDate, LocalDate endDate, User user) {
    List<Booking> bookings = getRelevantBookings(resource, null);
    return checkResourceAvailability(bookings, resource, startDate, endDate)
        && checkUserCooldown(bookings, user, startDate);
  }

  private boolean isResourceAvailableForEdit(Resource resource, LocalDate startDate, LocalDate endDate,
      Booking currentBooking, User user) {
    List<Booking> bookings = getRelevantBookings(resource, currentBooking);
    return checkResourceAvailability(bookings, resource, startDate, endDate)
        && checkUserCooldown(bookings, user, startDate);
  }

  private List<Booking> getRelevantBookings(Resource resource, Booking excludedBooking) {
    return bookingRepository.findByResource(resource).stream()
        .filter(b -> excludedBooking == null || b.getId() != excludedBooking.getId())
        .filter(b -> b.getStatus() != BookingStatus.CANCELED)
        .collect(Collectors.toList());
  }

  private boolean checkResourceAvailability(List<Booking> bookings, Resource resource, LocalDate startDate,
      LocalDate endDate) {
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

  private boolean checkUserCooldown(List<Booking> bookings, User user, LocalDate startDate) {
    LocalDate cooldownStartDate = startDate.minusDays(COOLDOWN_DAYS);
    LocalDate cooldownEndDate = startDate.minusDays(1);

    long totalBookedDays = bookings.stream()
        .filter(b -> b.getUser().getId() == user.getId())
        .filter(b -> !b.getStatus().equals(BookingStatus.CANCELED))
        .filter(b -> !b.getEndDate().isBefore(cooldownStartDate) && !b.getStartDate().isAfter(cooldownEndDate))
        .mapToLong(b -> calculateOverlappingDays(b.getStartDate(), b.getEndDate(), cooldownStartDate, cooldownEndDate))
        .sum();

    return totalBookedDays < MAX_BOOKING_DAYS;
  }

  private long calculateOverlappingDays(LocalDate bookingStart, LocalDate bookingEnd, LocalDate rangeStart,
      LocalDate rangeEnd) {
    LocalDate effectiveStart = bookingStart.isBefore(rangeStart) ? rangeStart : bookingStart;
    LocalDate effectiveEnd = bookingEnd.isAfter(rangeEnd) ? rangeEnd : bookingEnd;

    return !effectiveStart.isAfter(effectiveEnd) ? ChronoUnit.DAYS.between(effectiveStart, effectiveEnd) + 1 : 0;
  }

  private List<Booking> getAllConfirmedBookings() {
    return bookingRepository.findByStatus(BookingStatus.CONFIRMED);
  }

  public List<Booking> getAllUpcomingPickupsForToday(TimeRange timeRange) {
    List<Booking> bookings = getAllPendingBookings();
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

  private List<Booking> getAllActiveBookingsByResource(Resource resource) {
    List<Booking> activeBookings = bookingRepository.findByResourceAndStatus(resource, BookingStatus.CONFIRMED);
    activeBookings.addAll(bookingRepository.findByResourceAndStatus(resource, BookingStatus.LATE));
    activeBookings.addAll(bookingRepository.findByResourceAndStatus(resource, BookingStatus.PENDING));
    return activeBookings;

  }

  public List<BookingDate> getBookedDatesWithAmount(Resource resource) {

    List<Booking> bookings = getAllActiveBookingsByResource(resource);

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

  public void setBookingStatus(long bookingId, BookingStatus status, long userId, Boolean isAdmin) {
    
    Booking booking = bookingRepository.findById(bookingId)
    .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));

    if (booking.getUser().getId() != userId && isAdmin == false) {
      throw new IllegalBookingException("User is not allowed to edit this booking.");
    }

    booking.setStatus(status);

    if(booking.getStatus() == BookingStatus.CANCELED && isAdmin) {
      eventPublisher.publishEvent(new CancelNotificationEvent(this, booking));
    }
    bookingRepository.save(booking);
  }

  public void cancelAllBookingsForResource (long resourceId, ResourceType resourceType) {
    //Checks the given resource actually exists
    ResourceService<?> resourceService = resourceServiceFactory.getServiceByType(resourceType);
    Resource resource = resourceService.getResourceById(resourceId)
        .orElseThrow(() -> new ResourceNotFoundException("Resource not found with ID " + resourceId));


    List<Booking> confirmedBookings = bookingRepository.findByResourceAndStatus(resource, BookingStatus.CONFIRMED);
    List<Booking> pendingBookings = bookingRepository.findByResourceAndStatus(resource, BookingStatus.PENDING);
    
    List<Booking> combinedBookingsList = new ArrayList<>();
    combinedBookingsList.addAll(confirmedBookings);
    combinedBookingsList.addAll(pendingBookings);

    if (combinedBookingsList.isEmpty()) { return; }

    combinedBookingsList.forEach(booking -> booking.setStatus(BookingStatus.CANCELED));
    bookingRepository.saveAll(combinedBookingsList);
  }

  public void deleteAllBookingsForResource (long resourceId) {
    List<Booking> bookings = bookingRepository.findByResource_Id(resourceId);
    if (!bookings.isEmpty()) {
      bookingRepository.deleteAll(bookings);
    }
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

    List<Booking> activeBookings = new ArrayList<>(bookingRepository.findByStatus(BookingStatus.CONFIRMED));
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
        eventPublisher.publishEvent(new CancelNotificationEvent(this, pendingBooking));
      } else {
        usedCapacityMap.put(resource, currentUsage + 1);
      }
    }
  }


}
