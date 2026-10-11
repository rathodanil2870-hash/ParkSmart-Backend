package com.smartparking.smartingparkingmanagementsystem.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ParkingController {

    @GetMapping("/api/parking/hello")
    public String hello() {
        return "Welcome to ParkSmart!";
    }
}