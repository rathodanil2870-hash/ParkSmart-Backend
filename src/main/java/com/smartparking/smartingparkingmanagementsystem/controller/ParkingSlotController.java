package com.smartparking.smartingparkingmanagementsystem.controller;

import com.smartparking.smartingparkingmanagementsystem.entity.ParkingSlot;
import com.smartparking.smartingparkingmanagementsystem.repository.ParkingSlotRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/slots")
public class ParkingSlotController {

    private final ParkingSlotRepository parkingSlotRepository;

    public ParkingSlotController(ParkingSlotRepository parkingSlotRepository) {
        this.parkingSlotRepository = parkingSlotRepository;
    }

    @GetMapping
    public List<ParkingSlot> getAllSlots() {
        return parkingSlotRepository.findAll();
    }

    @PostMapping
    public ParkingSlot createSlot(@RequestBody ParkingSlot slot) {
        return parkingSlotRepository.save(slot);
    }
}