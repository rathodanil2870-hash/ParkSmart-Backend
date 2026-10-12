package com.smartparking.smartingparkingmanagementsystem.service;

import com.smartparking.smartingparkingmanagementsystem.entity.ParkingLocation;
import com.smartparking.smartingparkingmanagementsystem.repository.ParkingLocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkingLocationService {

    private final ParkingLocationRepository parkingLocationRepository;

    public ParkingLocationService(ParkingLocationRepository parkingLocationRepository) {
        this.parkingLocationRepository = parkingLocationRepository;
    }

    public List<ParkingLocation> getAllLocations() {
        return parkingLocationRepository.findAll();
    }

    public ParkingLocation createLocation(ParkingLocation location) {
        return parkingLocationRepository.save(location);
    }
}
