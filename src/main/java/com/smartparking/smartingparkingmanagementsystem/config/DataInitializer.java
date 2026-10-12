package com.smartparking.smartingparkingmanagementsystem.config;

import com.smartparking.smartingparkingmanagementsystem.entity.*;
import com.smartparking.smartingparkingmanagementsystem.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;
    private final ParkingLocationRepository parkingLocationRepository;
    private final ParkingSlotRepository parkingSlotRepository;
    private final BookingRepository bookingRepository;
    private final ParkingTicketRepository parkingTicketRepository;

    public DataInitializer(
            UserRepository userRepository,
            VehicleRepository vehicleRepository,
            ParkingLocationRepository parkingLocationRepository,
            ParkingSlotRepository parkingSlotRepository,
            BookingRepository bookingRepository,
            ParkingTicketRepository parkingTicketRepository) {
        this.userRepository = userRepository;
        this.vehicleRepository = vehicleRepository;
        this.parkingLocationRepository = parkingLocationRepository;
        this.parkingSlotRepository = parkingSlotRepository;
        this.bookingRepository = bookingRepository;
        this.parkingTicketRepository = parkingTicketRepository;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        seedVehicles();
        seedLocations();
        seedSlots();
        seedBookingsAndTickets();
    }

    private void seedUsers() {
        if (userRepository.count() < 3) {
            createUser("Rahul Sharma", "rahul.sharma@example.com", "9876501234");
            createUser("Priya Patel", "priya.patel@example.com", "9876505678");
            createUser("Amit Verma", "amit.verma@example.com", "9876509012");
            createUser("Sneha Kulkarni", "sneha.k@example.com", "9876503456");
        }
    }

    private void createUser(String name, String email, String phone) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPhone(phone);
        user.setPassword("password123");
        userRepository.save(user);
    }

    private void seedVehicles() {
        if (vehicleRepository.count() < 3) {
            createVehicle("KA-01-MJ-5521", "Car", "Honda City Sedan");
            createVehicle("MH-12-PQ-9081", "SUV", "Hyundai Creta");
            createVehicle("DL-04-EV-2024", "EV", "Tata Nexon EV");
            createVehicle("KA-05-BK-7744", "Bike", "Royal Enfield Classic 350");
        }
    }

    private void createVehicle(String number, String type, String model) {
        Vehicle vehicle = new Vehicle();
        vehicle.setVehicleNumber(number);
        vehicle.setVehicleType(type);
        vehicle.setVehicleModel(model);
        vehicleRepository.save(vehicle);
    }

    private void seedLocations() {
        if (parkingLocationRepository.count() < 3) {
            createLocation("Tech Park Hub - Tower A", "Outer Ring Road, Marathahalli", "Bengaluru", 120);
            createLocation("City Center Mall Plaza", "Connaught Place", "New Delhi", 80);
            createLocation("Phoenix Metro Bay", "Viman Nagar", "Pune", 60);
            createLocation("Cyber City Express Bay", "DLF Cyber City, Sector 24", "Gurugram", 100);
        }
    }

    private void createLocation(String name, String address, String city, int totalSlots) {
        ParkingLocation loc = new ParkingLocation();
        loc.setName(name);
        loc.setAddress(address);
        loc.setCity(city);
        loc.setTotalSlots(totalSlots);
        parkingLocationRepository.save(loc);
    }

    private void seedSlots() {
        if (parkingSlotRepository.count() < 8) {
            createSlot("A-103", "AVAILABLE", "Car");
            createSlot("A-104", "AVAILABLE", "EV");
            createSlot("B-201", "AVAILABLE", "SUV");
            createSlot("B-202", "AVAILABLE", "Car");
            createSlot("B-203", "AVAILABLE", "Bike");
            createSlot("B-204", "AVAILABLE", "EV");
            createSlot("C-301", "AVAILABLE", "Car");
            createSlot("C-302", "AVAILABLE", "SUV");
        }
    }

    private void createSlot(String slotNumber, String status, String vehicleType) {
        ParkingSlot slot = new ParkingSlot();
        slot.setSlotNumber(slotNumber);
        slot.setStatus(status);
        slot.setVehicleType(vehicleType);
        parkingSlotRepository.save(slot);
    }

    private void seedBookingsAndTickets() {
        if (bookingRepository.count() < 2 && parkingSlotRepository.count() > 0) {
            ParkingSlot availableSlot = parkingSlotRepository.findAll().stream()
                    .filter(s -> "AVAILABLE".equalsIgnoreCase(s.getStatus()))
                    .findFirst()
                    .orElse(null);

            if (availableSlot != null) {
                Booking booking = new Booking();
                booking.setUserId(1L);
                booking.setVehicleId(1L);
                booking.setParkingSlotId(availableSlot.getId());
                booking.setBookingDate(LocalDate.now().plusDays(1).toString());
                booking.setStartTime("14:00");
                booking.setEndTime("17:00");
                booking.setStatus("CONFIRMED");
                Booking savedBooking = bookingRepository.save(booking);

                availableSlot.setStatus("BOOKED");
                parkingSlotRepository.save(availableSlot);

                ParkingTicket ticket = new ParkingTicket();
                ticket.setBookingId(savedBooking.getId());
                ticket.setTicketNumber("TKT-" + (System.currentTimeMillis() % 1000000));
                ticket.setQrCode("PARKSMART-" + ticket.getTicketNumber());
                ticket.setIssueDate(LocalDate.now().toString());
                ticket.setStatus("ACTIVE");
                parkingTicketRepository.save(ticket);
            }
        }
    }
}
