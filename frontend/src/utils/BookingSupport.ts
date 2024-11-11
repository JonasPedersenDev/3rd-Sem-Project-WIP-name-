import { bookingConfig } from "./Config";
import { WeekDayNum } from "./EnumSupport";

export const isWeekend = (date: Date): boolean => {
  return (
    date.getDay() === WeekDayNum.SUNDAY || date.getDay() === WeekDayNum.SATURDAY
  );
};

export const isBeforeToday = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

export const getValidBookingDaysCount = (start: Date, end: Date): number => {
  let count = 0;
  let currentDate = new Date(start);

  while (currentDate <= end) {
    if (!isWeekend(currentDate)) {
      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
};

export const isValidDateRange = (start: Date | null, end: Date | null): boolean => {
    
    if (!start || !end) return false;
    
    if (isBeforeToday(start) || end <= start) return false;
    if (isWeekend(start) || isWeekend(end)) return false;
    
    const dayCount = getValidBookingDaysCount(start, end);
    if (dayCount < bookingConfig.minBookingLength || dayCount > bookingConfig.maxBookingLength) return false;
    
    return true;
};

