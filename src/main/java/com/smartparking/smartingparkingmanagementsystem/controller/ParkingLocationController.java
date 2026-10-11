
package com.smartparking.smartingparkingmanagementsystem.controller;

import com.smartparking.smartingparkingmanagementsystem.entity.ParkingLocation;
import com.smartparking.smartingparkingmanagementsystem.repository.ParkingLocationRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/locations")
public class ParkingLocationController {

    private final ParkingLocationRepository parkingLocationRepository;

    public ParkingLocationController(
            ParkingLocationRepository parkingLocationRepository) {
        this.parkingLocationRepository = parkingLocationRepository;
    }

    @GetMapping
    public List<ParkingLocation> getAllLocations() {
        return parkingLocationRepository.findAll();
    }

    @PostMapping
    public ParkingLocation createLocation(
            @RequestBody ParkingLocation location) {
        return parkingLocationRepository.save(location);
    }
}
