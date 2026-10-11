
package com.smartparking.smartingparkingmanagementsystem.controller;

import com.smartparking.smartingparkingmanagementsystem.entity.ParkingTicket;
import com.smartparking.smartingparkingmanagementsystem.repository.ParkingTicketRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
public class ParkingTicketController {

    private final ParkingTicketRepository parkingTicketRepository;

    public ParkingTicketController(
            ParkingTicketRepository parkingTicketRepository) {
        this.parkingTicketRepository = parkingTicketRepository;
    }

    @GetMapping
    public List<ParkingTicket> getAllTickets() {
        return parkingTicketRepository.findAll();
    }

    @PostMapping
    public ParkingTicket createTicket(@RequestBody ParkingTicket ticket) {
        return parkingTicketRepository.save(ticket);
    }

    // Validate a ticket using its ticket number
    @GetMapping("/validate/{ticketNumber}")
    public Map<String, Object> validateTicket(
            @PathVariable String ticketNumber) {

        ParkingTicket ticket = parkingTicketRepository
                .findByTicketNumber(ticketNumber)
                .orElse(null);

        if (ticket == null) {
            return Map.of(
                    "valid", false,
                    "message", "Ticket not found"
            );
        }

        boolean active = "ACTIVE".equalsIgnoreCase(ticket.getStatus());

        return Map.of(
                "valid", active,
                "ticketNumber", ticket.getTicketNumber(),
                "status", ticket.getStatus(),
                "message", active
                        ? "Ticket is valid"
                        : "Ticket is not active"
        );
    }
}
