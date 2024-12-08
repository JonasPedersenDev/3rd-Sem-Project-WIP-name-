package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import org.springframework.beans.factory.annotation.Autowired;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Utility;
import com.auu_sw3_6.Himmerland_booking_software.api.model.modelEnum.ResourceType;
import com.auu_sw3_6.Himmerland_booking_software.service.UtilityService;


public class UtilityControllerTest extends AbstractResourceControllerTest<Utility> {

  @Autowired
  private UtilityService utilityService;

  @Override
  protected Utility createTestResource() {
    Utility testUtility = new Utility();
    testUtility.setName("Test Utility");
    testUtility.setDescription("Test Description");
    testUtility.setCapacity(2);
    testUtility.setId(1l);
    testUtility.setStatus("Available");
    testUtility.setType(ResourceType.UTILITY);

    return utilityService.createUtility(testUtility, null);
  }

  @Override
  protected String getBasePath() {
    return "/api/utility";
  }

}
