package com.smartparking.smartingparkingmanagementsystem.dto;

public class TicketValidationResponse {

    private boolean valid;
    private String message;
    private String ticketNumber;
    private String status;

    public TicketValidationResponse() {
    }

    public TicketValidationResponse(boolean valid, String message, String ticketNumber, String status) {
        this.valid = valid;
        this.message = message;
        this.ticketNumber = ticketNumber;
        this.status = status;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getTicketNumber() {
        return ticketNumber;
    }

    public void setTicketNumber(String ticketNumber) {
        this.ticketNumber = ticketNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
