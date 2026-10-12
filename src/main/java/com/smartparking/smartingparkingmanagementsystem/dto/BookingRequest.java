package com.smartparking.smartingparkingmanagementsystem.dto;

public class BookingRequest {

    private Long userId;
    private Long vehicleId;
    private Long parkingSlotId;
    private String bookingDate;
    private String startTime;
    private String endTime;

    public BookingRequest() {
    }

    public BookingRequest(Long userId, Long vehicleId, Long parkingSlotId, String bookingDate, String startTime, String endTime) {
        this.userId = userId;
        this.vehicleId = vehicleId;
        this.parkingSlotId = parkingSlotId;
        this.bookingDate = bookingDate;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }

    public Long getParkingSlotId() {
        return parkingSlotId;
    }

    public void setParkingSlotId(Long parkingSlotId) {
        this.parkingSlotId = parkingSlotId;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(String bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}
