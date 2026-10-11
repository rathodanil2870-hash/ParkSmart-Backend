package com.smartparking.smartingparkingmanagementsystem.repository;

import com.smartparking.smartingparkingmanagementsystem.entity.ParkingLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkingLocationRepository extends JpaRepository<ParkingLocation, Long> {
}