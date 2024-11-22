package com.auu_sw3_6.Himmerland_booking_software.service;

import java.util.List;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Booking;
import com.auu_sw3_6.Himmerland_booking_software.api.model.Resource;
import com.auu_sw3_6.Himmerland_booking_software.api.model.User;
import com.auu_sw3_6.Himmerland_booking_software.api.model.modelEnum.TimeRange;

public class NotificationService {

  private BookingService bookingService;

  public void earlyMorningNotification() {
    System.out.println("Sending early morning notification");

    List<Booking> pickups = bookingService.getAllUpcomingPickupsForToday(TimeRange.EARLY);

    for (Booking booking : pickups) {
      User user = booking.getUser();
      Resource resource = booking.getResource();
      EmailService.sendPickupNotification(user.getEmail(), user.getName(), resource.getName(), TimeRange.EARLY.toString());
    }
  }

  public void lateMorningNotification() {
    System.out.println("Sending late morning notification");
  }
}
