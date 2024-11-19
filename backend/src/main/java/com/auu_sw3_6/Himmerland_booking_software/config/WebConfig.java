package com.auu_sw3_6.Himmerland_booking_software.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(@NonNull ViewControllerRegistry registry) {
        for (String path : PathConstants.WEBSITE_PATHS) {
            registry.addViewController(path).setViewName("forward:/index.html");
        }
    }
}
