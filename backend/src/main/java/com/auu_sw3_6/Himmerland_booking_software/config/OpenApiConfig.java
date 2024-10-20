package com.auu_sw3_6.Himmerland_booking_software.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

@Configuration
public class OpenApiConfig {
  @Bean
  public MappingJackson2HttpMessageConverter octetStreamJsonConverter() {
    MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
    converter.setSupportedMediaTypes(Arrays.asList(new MediaType("application", "octet-stream")));
    return converter;
  }
}