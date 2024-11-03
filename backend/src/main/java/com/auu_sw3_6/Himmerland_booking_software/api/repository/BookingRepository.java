package com.auu_sw3_6.Himmerland_booking_software.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

}