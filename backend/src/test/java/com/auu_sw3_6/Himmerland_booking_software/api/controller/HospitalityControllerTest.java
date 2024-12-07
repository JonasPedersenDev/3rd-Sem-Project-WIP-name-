package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import org.springframework.beans.factory.annotation.Autowired;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Hospitality;
import com.auu_sw3_6.Himmerland_booking_software.api.model.modelEnum.ResourceType;
import com.auu_sw3_6.Himmerland_booking_software.service.HospitalityService;


public class HospitalityControllerTest extends AbstractResourceControllerTest<Hospitality> {

  @Autowired
  private HospitalityService hospitalityService;

  @Override
  protected Hospitality createTestResource() {
    Hospitality testHospitality = new Hospitality();
    testHospitality.setName("Test Hospitality");
    testHospitality.setDescription("Test Description");
    testHospitality.setCapacity(2);
    testHospitality.setId(1l);
    testHospitality.setStatus("Available");
    testHospitality.setType(ResourceType.HOSPITALITY);

    return hospitalityService.createHospitality(testHospitality, null);
  }

  @Override
  protected String getBasePath() {
    return "/api/hospitality";
  }

}
