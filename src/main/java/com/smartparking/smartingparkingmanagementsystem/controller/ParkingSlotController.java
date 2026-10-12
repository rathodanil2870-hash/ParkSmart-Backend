package com.smartparking.smartingparkingmanagementsystem.controller;

import com.smartparking.smartingparkingmanagementsystem.entity.ParkingSlot;
import com.smartparking.smartingparkingmanagementsystem.service.ParkingSlotService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/slots")
public class ParkingSlotController {

    private final ParkingSlotService parkingSlotService;

    public ParkingSlotController(ParkingSlotService parkingSlotService) {
        this.parkingSlotService = parkingSlotService;
    }

    @GetMapping
    public List<ParkingSlot> getAllSlots() {
        return parkingSlotService.getAllSlots();
    }

    @PostMapping
    public ParkingSlot createSlot(@RequestBody ParkingSlot slot) {
        return parkingSlotService.createSlot(slot);
    }
}