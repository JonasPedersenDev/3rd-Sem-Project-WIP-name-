package com.auu_sw3_6.Himmerland_booking_software.api.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MvcResult;

import com.auu_sw3_6.Himmerland_booking_software.api.controller.testSecurityHelpers.SecurityContextHelper;
import com.auu_sw3_6.Himmerland_booking_software.api.model.Tool;
import com.auu_sw3_6.Himmerland_booking_software.api.model.modelEnum.ResourceType;
import com.auu_sw3_6.Himmerland_booking_software.service.ToolService;

import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;

public class ToolControllerTest extends AbstractResourceControllerTest<Tool> {

  @Autowired
  private ToolService toolService;

  @Override
  protected Tool createTestResource() {
    Tool testTool = new Tool();
    testTool.setName("Test Tool");
    testTool.setDescription("Test Description");
    testTool.setCapacity(1);
    testTool.setId(1l);
    testTool.setStatus("Available");
    testTool.setType(ResourceType.TOOL);

    return toolService.createTool(testTool, null);
  }

  @Override
  protected String getBasePath() {
    return "/api/tool";
  }

  //        Har fjernet add endpoint, da det ikke var i brug. Testen er derfor kun til eksempel til andre post endpoints tests.
  // @Test
  // public void addResource_ShouldReturnResource() throws Exception {
  //   SecurityContextHelper.setSecurityContext("admin");

  //   Tool tool = new Tool();
  //   tool.setName("Test Tool 2");
  //   tool.setDescription("Test Description 2");
  //   tool.setCapacity(2);
  //   tool.setStatus("Available");
  //   tool.setType(ResourceType.TOOL);

  //   String toolJson = objectMapper.writeValueAsString(tool);

  //   MvcResult result = mockMvc.perform(post(getBasePath() + "/add")
  //       .contentType(MediaType.APPLICATION_JSON)
  //       .content(toolJson))
  //       .andExpect(status().isCreated())
  //       .andReturn();

  //   String jsonResponse = result.getResponse().getContentAsString();
  //   Tool responseTool = objectMapper.readValue(jsonResponse, Tool.class);

  //   System.out.println("Response: " + jsonResponse);

  //   assertEquals(tool.getName(), responseTool.getName());
  //   assertEquals(tool.getDescription(), responseTool.getDescription());
  //   assertEquals(tool.getCapacity(), responseTool.getCapacity());
  //   assertEquals(tool.getStatus(), responseTool.getStatus());
  //   assertEquals(tool.getType(), responseTool.getType());
  // }

  @Test
  public void createTool_shouldReturnTool() throws Exception {
    SecurityContextHelper.setSecurityContext("admin");

    Tool tool = new Tool();
    tool.setName("Test Tool");
    tool.setDescription("Test Description");
    tool.setCapacity(1);
    tool.setStatus("Available");
    tool.setType(ResourceType.TOOL);

    String toolJson = objectMapper.writeValueAsString(tool);

    Path imagePath = Paths.get(getClass().getClassLoader().getResource("300x300-test-image.png").toURI());
    byte[] imageBytes = Files.readAllBytes(imagePath);

    MockMultipartFile mockFile = new MockMultipartFile(
        "resourcePictures",
        "testPicture.jpg",
        "image/jpeg",
        imageBytes
    );

    MvcResult result = mockMvc.perform(multipart(getBasePath() + "/create")
        .file(mockFile)
        .file("tool", toolJson.getBytes()) 
        .contentType(MediaType.MULTIPART_FORM_DATA))
        .andExpect(status().isOk())
        .andReturn();

    String jsonResponse = result.getResponse().getContentAsString();
    Tool responseTool = objectMapper.readValue(jsonResponse, Tool.class);

    System.out.println("Response: " + jsonResponse);

    assertEquals(tool.getName(), responseTool.getName());
    assertEquals(tool.getDescription(), responseTool.getDescription());
    assertEquals(tool.getCapacity(), responseTool.getCapacity());
    assertEquals(tool.getStatus(), responseTool.getStatus());
    assertEquals(tool.getType(), responseTool.getType());
  }

}
