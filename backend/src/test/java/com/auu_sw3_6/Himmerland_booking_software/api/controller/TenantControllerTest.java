package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import java.io.File;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.auu_sw3_6.Himmerland_booking_software.api.model.ErrorResponse;
import com.auu_sw3_6.Himmerland_booking_software.api.model.Tenant;
import com.auu_sw3_6.Himmerland_booking_software.service.TenantService;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;

@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(Lifecycle.PER_CLASS)
public class TenantControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private TenantService userService;

  @Autowired
  private ObjectMapper objectMapper;

  private Tenant testUser;

  @BeforeEach
  public void setUp() {
    // Delete the test database file before each test
    File dbFile = new File("src/test/resources/database/TestDatabase.db");
    if (dbFile.exists()) {
      dbFile.delete();
    }

    // Recreate the database schema
    // This will be handled by Spring Boot with the `create-drop` setting

    testUser = new Tenant();
    testUser.setId(2L);
    testUser.setName("TenatControllerTest");
    testUser.setMobileNumber("+4588888888");
    testUser.setEmail("testEmail@gmail.com");
    testUser.setUsername("testTenat");
    testUser.setPassword("rawPassword123");

    userService.createUser(testUser, null);
  }

  // /api/tenat GET tests
  @WithMockUser(username = "testTenat", roles = { "TENANT" })
  public void getUser_shouldReturnCurrentUser() throws Exception {
    MvcResult result = mockMvc.perform(get("/api/tenant"))
        .andExpect(status().isOk())
        .andReturn();

    String jsonResponse = result.getResponse().getContentAsString();
    Tenant responseTenant = objectMapper.readValue(jsonResponse, Tenant.class);

    assertEquals(testUser.getName(), responseTenant.getName());
    assertEquals(testUser.getMobileNumber(), responseTenant.getMobileNumber());
    assertEquals(testUser.getEmail(), responseTenant.getEmail());
    assertEquals(testUser.getUsername(), responseTenant.getUsername());
  }

  // @Test
  // @WithMockUser(username = "testTenat", roles = { "TENANT" })

  // public void getUser_withInvalidId_shouldReturnNotFound() throws Exception {
  // MvcResult result = mockMvc.perform(get("/api/tenant/999"))
  // .andExpect(status().isNotFound())
  // .andReturn();

  // String jsonResponse = result.getResponse().getContentAsString();
  // ErrorResponse errorResponse = objectMapper.readValue(jsonResponse,
  // ErrorResponse.class);

  // assertEquals("User not found", errorResponse.getMessage());
  // assertEquals(404, errorResponse.getStatus());
  // }

  // @Test
  // @WithMockUser(username = "testTenat", roles = { "TENANT" })

  // public void deleteUser_shouldReturnNoContent() throws Exception {
  // mockMvc.perform(delete("/api/tenant/deleteTenant/2"))
  // .andExpect(status().isNoContent());

  // assertFalse(userService.getUserById(testUser.getId()).isPresent(), "User
  // should be deleted");
  // }

  // This test is not applicable to the current implementation, returning 404
  // instead of 401, fix
  /*
   * @Test
   * public void getUser_withoutAuthorization_shouldReturnUnauthorized() throws
   * Exception {
   * mockMvc.perform(get("/api/tenant"))
   * .andExpect(status().isUnauthorized());
   * }
   * 
   * @Test
   * 
   * @WithMockUser(username = "testTenat", roles = { "TENANT" })
   * public void getUser_withInvalidRole_shouldReturnForbidden() throws Exception
   * {
   * MvcResult result =
   * mockMvc.perform(get("/api/tenant").with(user("testTenat").roles("ADMIN")))
   * .andExpect(status().isForbidden()).andReturn();
   * 
   * // String jsonResponse = result.getResponse().getContentAsString();
   * // ErrorResponse errorResponse = objectMapper.readValue(jsonResponse,
   * ErrorResponse.class);
   * 
   * // assertEquals("Access denied", errorResponse.getMessage()); WIP
   * // assertEquals(403, errorResponse.getStatus()); WIP
   * 
   * }
   * 
   * /* @Test
   * <----------------------------------------------------------------------------
   * -------------- Fix this test
   * 
   * @WithMockUser(username = "no", roles = { "TENANT" })
   * public void getUser_withInvalidUsername_shouldReturnNotFound() throws
   * Exception {
   * MvcResult result = mockMvc.perform(get("/api/tenant"))
   * .andExpect(status().isNotFound())
   * .andReturn();
   * 
   * String jsonResponse = result.getResponse().getContentAsString();
   * ErrorResponse errorResponse = objectMapper.readValue(jsonResponse,
   * ErrorResponse.class);
   * 
   * assertEquals("User not found", errorResponse.getMessage());
   * assertEquals(404, errorResponse.getStatus());
   * }
   */
}
