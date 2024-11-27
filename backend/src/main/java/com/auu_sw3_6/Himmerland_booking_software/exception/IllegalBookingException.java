package com.auu_sw3_6.Himmerland_booking_software.exception;

public class IllegalBookingException extends RuntimeException {

  private final String message;

  public IllegalBookingException(String message) {
      super(message);
      this.message = message;
    }

  public String getMessage() {
    return message;
  }
}
