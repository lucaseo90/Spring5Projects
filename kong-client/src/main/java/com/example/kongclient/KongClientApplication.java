package com.example.kongclient;

import feign.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@EnableFeignClients
@SpringBootApplication(scanBasePackages = {"com.example.kongclient"})
public class KongClientApplication {

    public static void main(String[] args) {
        SpringApplication.run(KongClientApplication.class, args);
    }

    @Bean
    Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }

}
