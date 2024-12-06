package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import java.io.File;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.auu_sw3_6.Himmerland_booking_software.api.model.Tenant;
import com.auu_sw3_6.Himmerland_booking_software.service.TenantService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(Lifecycle.PER_CLASS)
public class AdminControllerTest {

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
        testUser.setId(1L);
        testUser.setName("AdminControllerTest");
        testUser.setMobileNumber("+4588888888");
        testUser.setUsername("testAdmin");
        testUser.setEmail("Admin@email.test");
        testUser.setPassword("rawPassword123");

        userService.createUser(testUser, null);
    }
    
   /* @Test //FAIL fix
    @WithMockUser(username = "testAdmin", roles = { "ADMIN" })
    public void getUser_shouldReturnCurrentUser() throws Exception {
        MvcResult result = mockMvc.perform(get("/api/admin"))
                .andExpect(status().isOk())
                .andReturn();

        String jsonResponse = result.getResponse().getContentAsString();
        Tenant responseTenant = objectMapper.readValue(jsonResponse, Tenant.class);

        assertEquals(testUser.getName(), responseTenant.getName());
        assertEquals(testUser.getMobileNumber(), responseTenant.getMobileNumber());
        assertEquals(testUser.getEmail(), responseTenant.getEmail());
        assertEquals(testUser.getUsername(), responseTenant.getUsername());
    }

    @Test
    @WithMockUser(username = "testAdmin", roles = { "ADMIN" })
    public void getAllTenants_shouldReturnAllTenants() throws Exception {
        MvcResult result = mockMvc.perform(get("/api/admin/getAllTenants"))
                .andExpect(status().isOk())
                .andReturn();

        String jsonResponse = result.getResponse().getContentAsString();
        Tenant[] responseTenants = objectMapper.readValue(jsonResponse, Tenant[].class);

        assertNotNull(responseTenants);
    assertTrue(responseTenants.length > 0, "Tenants list should not be empty");
    }  
    
    /*@Test  //FAIL fix
    @WithMockUser(username = "testAdmin", roles = { "ADMIN" })
    public void getTenant_withValidId_shouldReturnTenant() throws Exception {
        Tenant tempTenant = new Tenant();
        tempTenant.setId(2L);
        tempTenant.setName("TestTenant");
        tempTenant.setMobileNumber("+4588888888");
        tempTenant.setUsername("testTenant");
        tempTenant.setEmail("tempTenant@example.com");
        tempTenant.setPassword("rawPassword123");

    // userService.createUser(tempTenant, null);

    // MvcResult result = mockMvc.perform(get("/api/admin/getTenant/2"))
    // .andExpect(status().isOk())
    // .andReturn();

    // String jsonResponse = result.getResponse().getContentAsString();
    // Tenant responseTenant = objectMapper.readValue(jsonResponse, Tenant.class);

        assertNotNull(responseTenant);
        assertEquals(tempTenant.getName(), responseTenant.getName());
        assertEquals(tempTenant.getMobileNumber(), responseTenant.getMobileNumber());
        assertEquals(tempTenant.getEmail(), responseTenant.getEmail());
        assertEquals(tempTenant.getUsername(), responseTenant.getUsername());
    }*/

    /*
     * @Test
     * 
     * @WithMockUser(username = "testAdmin", roles = { "ADMIN" })
     * public void updateTenant_shouldReturnUpdatedTenant() throws Exception {
     * Tenant tempTenant = new Tenant();
     * tempTenant.setId(2L);
     * tempTenant.setName("TestTenant");
     * tempTenant.setMobileNumber("+4588888888");
     * tempTenant.setUsername("testTenant");
     * tempTenant.setEmail("example@email.com");
     * tempTenant.setPassword("rawPassword123");
     * 
     * userService.createUser(tempTenant, null);
     * 
     * tempTenant.setId(2L);
     * tempTenant.setName("UpdatedTenant");
     * tempTenant.setMobileNumber("+4599999999");
     * tempTenant.setUsername("updatedTenant");
     * tempTenant.setEmail("NewExample@email.com");
     * tempTenant.setPassword("newrawPassword123");
     * 
     * 
     * MvcResult result = mockMvc.perform(put("/api/admin/updateTenant")
     * .contentType("multipart/form-data")
     * .content(objectMapper.writeValueAsString(tempTenant)))
     * .andExpect(status().isOk())
     * .andReturn();
     * 
     * String jsonResponse = result.getResponse().getContentAsString();
     * Tenant responseTenant = objectMapper.readValue(jsonResponse, Tenant.class);
     * 
     * assertNotNull(responseTenant);
     * assertEquals(tempTenant.getName(), responseTenant.getName());
     * assertEquals(tempTenant.getMobileNumber(), responseTenant.getMobileNumber());
     * assertEquals(tempTenant.getEmail(), responseTenant.getEmail());
     * assertEquals(tempTenant.getUsername(), responseTenant.getUsername());
     * assertEquals(tempTenant.getPassword(), responseTenant.getPassword());
     * 
     * }
     */
}
