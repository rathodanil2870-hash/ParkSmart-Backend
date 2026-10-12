package com.smartparking.smartingparkingmanagementsystem.controller;

import com.smartparking.smartingparkingmanagementsystem.entity.ParkingTicket;
import com.smartparking.smartingparkingmanagementsystem.service.ParkingTicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
public class ParkingTicketController {

    private final ParkingTicketService parkingTicketService;

    public ParkingTicketController(ParkingTicketService parkingTicketService) {
        this.parkingTicketService = parkingTicketService;
    }

    @GetMapping
    public List<ParkingTicket> getAllTickets() {
        return parkingTicketService.getAllTickets();
    }

    @PostMapping
    public ParkingTicket createTicket(@RequestBody ParkingTicket ticket) {
        return parkingTicketService.createTicket(ticket);
    }

    // Validate a ticket using its ticket number
    @GetMapping("/validate/{ticketNumber}")
    public Map<String, Object> validateTicket(@PathVariable String ticketNumber) {
        return parkingTicketService.validateTicket(ticketNumber);
    }
}
