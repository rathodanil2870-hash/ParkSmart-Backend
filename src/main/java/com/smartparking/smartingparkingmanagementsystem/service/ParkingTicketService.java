package com.smartparking.smartingparkingmanagementsystem.service;

import com.smartparking.smartingparkingmanagementsystem.entity.ParkingTicket;
import com.smartparking.smartingparkingmanagementsystem.repository.ParkingTicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ParkingTicketService {

    private final ParkingTicketRepository parkingTicketRepository;

    public ParkingTicketService(ParkingTicketRepository parkingTicketRepository) {
        this.parkingTicketRepository = parkingTicketRepository;
    }

    public List<ParkingTicket> getAllTickets() {
        return parkingTicketRepository.findAll();
    }

    public ParkingTicket createTicket(ParkingTicket ticket) {
        return parkingTicketRepository.save(ticket);
    }

    public Map<String, Object> validateTicket(String ticketNumber) {
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
