
package com.smartparking.smartingparkingmanagementsystem.repository;

import com.smartparking.smartingparkingmanagementsystem.entity.ParkingTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ParkingTicketRepository
        extends JpaRepository<ParkingTicket, Long> {

    Optional<ParkingTicket> findByTicketNumber(String ticketNumber);
}
