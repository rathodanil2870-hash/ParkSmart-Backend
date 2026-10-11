package com.smartparking.smartingparkingmanagementsystem.repository;

import com.smartparking.smartingparkingmanagementsystem.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookingRepository
        extends JpaRepository<Booking, Long> {

    @Query("""
        SELECT COUNT(b)
        FROM Booking b
        WHERE b.parkingSlotId = :slotId
          AND b.bookingDate = :date
          AND UPPER(b.status) = 'CONFIRMED'
          AND b.startTime < :endTime
          AND b.endTime > :startTime
        """)
    long countOverlappingBookings(
            @Param("slotId") Long slotId,
            @Param("date") String date,
            @Param("startTime") String startTime,
            @Param("endTime") String endTime
    );
}