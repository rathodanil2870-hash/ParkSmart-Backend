package com.smartparking.smartingparkingmanagementsystem.controller;

import com.smartparking.smartingparkingmanagementsystem.entity.ParkingLocation;
import com.smartparking.smartingparkingmanagementsystem.service.ParkingLocationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
public class ParkingLocationController {

    private final ParkingLocationService parkingLocationService;

    public ParkingLocationController(ParkingLocationService parkingLocationService) {
        this.parkingLocationService = parkingLocationService;
    }

    @GetMapping
    public List<ParkingLocation> getAllLocations() {
        return parkingLocationService.getAllLocations();
    }

    @PostMapping
    public ParkingLocation createLocation(@RequestBody ParkingLocation location) {
        return parkingLocationService.createLocation(location);
    }
}
