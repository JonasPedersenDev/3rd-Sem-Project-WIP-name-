package com.auu_sw3_6.Himmerland_booking_software.api.repository;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Admin;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdminRepository extends UserBaseRepository<Admin> {

}
