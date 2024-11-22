package com.auu_sw3_6.Himmerland_booking_software.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.auu_sw3_6.Himmerland_booking_software.api.model.JobExecutionLog;
import com.auu_sw3_6.Himmerland_booking_software.api.repository.JobExecutionLogRepository;

@Service
public class JobService {

  private NotificationService notificationService;

  @Autowired
  private JobExecutionLogRepository jobExecutionLogRepository;

  // Job for 05:00:00
  @Scheduled(cron = "0 0 5 * * *")
  public void run5AMJob() {
    executeJob("5AM Job");
  }

  // Job for 10:00:00
  @Scheduled(cron = "0 0 10 * * *")
  public void run10AMJob() {
    executeJob("10AM Job");
  }

  private void executeJob(String jobName) {
    System.out.println("Running " + jobName);

    if (jobName.equals("5AM Job")) {
      notificationService.earlyMorningNotification();
    } else if (jobName.equals("10AM Job")) {
      notificationService.lateMorningNotification();
    }

    JobExecutionLog log = new JobExecutionLog();
    log.setJobName(jobName);
    log.setExecutionTime(LocalDateTime.now());
    log.setStatus("COMPLETED");
    jobExecutionLogRepository.save(log);
  }

  public void checkMissedJobsForToday() {
    LocalDate today = LocalDate.now();
    LocalTime currentTime = LocalTime.now();

    // Check if it's after 5 AM and if the 5 AM job has been completed today
    if (currentTime.isAfter(LocalTime.of(5, 0))) {
      if (!jobExecutionLogRepository.existsByJobNameAndExecutionTimeAfter("5AM Job", today.atStartOfDay())) {
        run5AMJob();
      }
    }

    // Check if it's after 10 AM and if the 10 AM job has been completed today
    if (currentTime.isAfter(LocalTime.of(10, 0))) {
      if (!jobExecutionLogRepository.existsByJobNameAndExecutionTimeAfter("10AM Job", today.atStartOfDay())) {
        run10AMJob();
      }
    }
  }
}
