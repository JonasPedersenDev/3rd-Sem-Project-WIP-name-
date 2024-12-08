package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import com.auu_sw3_6.Himmerland_booking_software.api.controller.testSecurityHelpers.SecurityContextHelper;
import com.auu_sw3_6.Himmerland_booking_software.api.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc
public abstract class AbstractUserControllerTest<T extends User> {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    protected T testUser;

    protected abstract T createTestUser();

    protected abstract String getBasePath();

    protected abstract String getRequiredRole();

    @BeforeEach
    public void setUp() {
        testUser = createTestUser();
    }

    @Test
    public void getUser_shouldReturnCurrentUser() throws Exception {
        SecurityContextHelper.setSecurityContext(testUser, getRequiredRole());

        MvcResult result = mockMvc.perform(get(getBasePath()))
            .andExpect(status().isOk())
            .andReturn();

        String jsonResponse = result.getResponse().getContentAsString();
        T responseUser = objectMapper.readValue(jsonResponse, (Class<T>) testUser.getClass());

        assertEquals(testUser.getName(), responseUser.getName());
        assertEquals(testUser.getMobileNumber(), responseUser.getMobileNumber());
        assertEquals(testUser.getEmail(), responseUser.getEmail());
        assertEquals(testUser.getUsername(), responseUser.getUsername());
        assertEquals(testUser.getHouseAddress(), responseUser.getHouseAddress());
    }

    @Test
    public void getUser_withoutAuthorization_shouldReturnUnauthorized() throws Exception {
        mockMvc.perform(get(getBasePath()))
            .andExpect(status().isUnauthorized());
    }

    @Test
    public void getUser_withInvalidRole_shouldReturnForbidden() throws Exception {
        SecurityContextHelper.setSecurityContext(testUser, "INVALID_ROLE");

        mockMvc.perform(get(getBasePath()))
            .andExpect(status().isForbidden());
    }
}
