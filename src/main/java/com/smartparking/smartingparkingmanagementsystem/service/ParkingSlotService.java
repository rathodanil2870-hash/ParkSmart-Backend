package com.smartparking.smartingparkingmanagementsystem.service;

import com.smartparking.smartingparkingmanagementsystem.entity.ParkingSlot;
import com.smartparking.smartingparkingmanagementsystem.repository.ParkingSlotRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkingSlotService {

    private final ParkingSlotRepository parkingSlotRepository;

    public ParkingSlotService(ParkingSlotRepository parkingSlotRepository) {
        this.parkingSlotRepository = parkingSlotRepository;
    }

    public List<ParkingSlot> getAllSlots() {
        return parkingSlotRepository.findAll();
    }

    public ParkingSlot createSlot(ParkingSlot slot) {
        return parkingSlotRepository.save(slot);
    }
}
