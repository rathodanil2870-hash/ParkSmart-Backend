package com.smartparking.smartingparkingmanagementsystem.service;

import com.smartparking.smartingparkingmanagementsystem.entity.Booking;
import com.smartparking.smartingparkingmanagementsystem.entity.ParkingSlot;
import com.smartparking.smartingparkingmanagementsystem.repository.BookingRepository;
import com.smartparking.smartingparkingmanagementsystem.repository.ParkingSlotRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ParkingSlotRepository parkingSlotRepository;

    public BookingService(
            BookingRepository bookingRepository,
            ParkingSlotRepository parkingSlotRepository) {
        this.bookingRepository = bookingRepository;
        this.parkingSlotRepository = parkingSlotRepository;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Transactional
    public Booking createBooking(Booking booking) {
        // 1. Validate required fields
        if (booking.getParkingSlotId() == null
                || booking.getBookingDate() == null
                || booking.getStartTime() == null
                || booking.getEndTime() == null) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Slot, date, start time and end time are required"
            );
        }

        // 2. Validate date and time formats
        try {
            LocalDate.parse(booking.getBookingDate());

            LocalTime start = LocalTime.parse(booking.getStartTime());
            LocalTime end = LocalTime.parse(booking.getEndTime());

            if (!end.isAfter(start)) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "End time must be after start time"
                );
            }

        } catch (DateTimeParseException ex) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid date or time format. Use YYYY-MM-DD and HH:mm"
            );
        }

        // 3. Find the parking slot
        ParkingSlot slot = parkingSlotRepository
                .findById(booking.getParkingSlotId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Parking slot not found"
                ));

        // 4. Prevent duplicate bookings for an already-booked slot
        if (!"AVAILABLE".equalsIgnoreCase(slot.getStatus())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "This parking slot is already booked"
            );
        }

        // 5. Mark the booking as confirmed
        booking.setStatus("CONFIRMED");

        // 6. Save the booking
        Booking savedBooking = bookingRepository.save(booking);

        // 7. Update the parking slot status
        slot.setStatus("BOOKED");
        parkingSlotRepository.save(slot);

        // 8. Return the saved booking
        return savedBooking;
    }
}
