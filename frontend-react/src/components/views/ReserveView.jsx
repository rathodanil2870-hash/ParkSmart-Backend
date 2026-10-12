export default function ReserveView({
  slots,
  bookingForm,
  setBookingForm,
  createBooking,
  isAvailable
}) {
  return (
    <>
      <div className="section-heading">
        <div>
          <h2>Reserve a Parking Slot</h2>
          <p>Enter your IDs and booking details.</p>
        </div>
      </div>

      <form className="form-card" onSubmit={createBooking}>
        <label>
          User ID
          <input
            type="number"
            min="1"
            required
            value={bookingForm.userId}
            onChange={e =>
              setBookingForm({
                ...bookingForm,
                userId: e.target.value
              })
            }
            placeholder="Example: 2"
          />
        </label>

        <label>
          Vehicle ID
          <input
            type="number"
            min="1"
            required
            value={bookingForm.vehicleId}
            onChange={e =>
              setBookingForm({
                ...bookingForm,
                vehicleId: e.target.value
              })
            }
            placeholder="Example: 2"
          />
        </label>

        <label>
          Parking Slot
          <select
            required
            value={bookingForm.parkingSlotId}
            onChange={e =>
              setBookingForm({
                ...bookingForm,
                parkingSlotId: e.target.value
              })
            }
          >
            <option value="">Select an available slot</option>
            {slots
              .filter(slot =>
                isAvailable(
                  slot,
                  bookingForm.bookingDate,
                  bookingForm.startTime,
                  bookingForm.endTime
                )
              )
              .map(slot => (
                <option key={slot.id} value={String(slot.id)}>
                  {slot.slotNumber || slot.slotName || `Slot ${slot.id}`}
                  {' — '}
                  {slot.vehicleType || 'Any vehicle'}
                </option>
              ))}
          </select>
        </label>

        <label>
          Booking Date
          <input
            type="date"
            required
            value={bookingForm.bookingDate}
            onChange={e =>
              setBookingForm({
                ...bookingForm,
                bookingDate: e.target.value
              })
            }
          />
        </label>

        <label>
          Start Time
          <input
            type="time"
            required
            value={bookingForm.startTime}
            onChange={e =>
              setBookingForm({
                ...bookingForm,
                startTime: e.target.value
              })
            }
          />
        </label>

        <label>
          End Time
          <input
            type="time"
            required
            value={bookingForm.endTime}
            onChange={e =>
              setBookingForm({
                ...bookingForm,
                endTime: e.target.value
              })
            }
          />
        </label>

        <button className="primary-button full-width" type="submit">
          Confirm Booking
        </button>

        <p className="form-note">
          Use existing user and vehicle IDs from your database.
        </p>
      </form>
    </>
  );
}
