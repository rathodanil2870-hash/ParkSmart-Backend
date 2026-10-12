export default function ReserveSlot({
  slots,
  users,
  vehicles,
  bookingForm,
  setBookingForm,
  onSubmit,
  submitting,
  isSlotAvailable
}) {
  function handlePrefillDemo() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().slice(0, 10);

    const availableSlot = slots.find(s => isSlotAvailable(s, dateStr, '10:00', '13:00'));

    setBookingForm({
      userId: users.length > 0 ? String(users[0].id) : '1',
      vehicleId: vehicles.length > 0 ? String(vehicles[0].id) : '1',
      parkingSlotId: availableSlot ? String(availableSlot.id) : (slots[0]?.id ? String(slots[0].id) : ''),
      bookingDate: dateStr,
      startTime: '10:00',
      endTime: '13:00'
    });
  }

  return (
    <div className="page-reserve-slot">
      <div className="section-heading">
        <div>
          <h2>Option 2: Reserve a Slot</h2>
          <p>Book an available parking slot by selecting user, vehicle, and reservation schedule.</p>
        </div>
        <button
          type="button"
          className="secondary-button"
          onClick={handlePrefillDemo}
          title="Auto-fill form using demo user, vehicle and available slot"
        >
          ⚡ Quick Demo Fill
        </button>
      </div>

      <form className="form-card" onSubmit={onSubmit}>
        <label>
          User Account
          {users.length > 0 ? (
            <select
              required
              value={bookingForm.userId}
              onChange={e => setBookingForm({ ...bookingForm, userId: e.target.value })}
            >
              <option value="">Select an existing user</option>
              {users.map(u => (
                <option key={u.id} value={String(u.id)}>
                  {u.name || `User #${u.id}`} ({u.email || u.phone || `ID: ${u.id}`})
                </option>
              ))}
            </select>
          ) : (
            <input
              type="number"
              min="1"
              required
              placeholder="Enter User ID (e.g., 1)"
              value={bookingForm.userId}
              onChange={e => setBookingForm({ ...bookingForm, userId: e.target.value })}
            />
          )}
        </label>

        <label>
          Vehicle
          {vehicles.length > 0 ? (
            <select
              required
              value={bookingForm.vehicleId}
              onChange={e => setBookingForm({ ...bookingForm, vehicleId: e.target.value })}
            >
              <option value="">Select a registered vehicle</option>
              {vehicles.map(v => (
                <option key={v.id} value={String(v.id)}>
                  {v.vehicleNumber} — {v.vehicleType || 'Vehicle'} ({v.vehicleModel || `ID: ${v.id}`})
                </option>
              ))}
            </select>
          ) : (
            <input
              type="number"
              min="1"
              required
              placeholder="Enter Vehicle ID (e.g., 1)"
              value={bookingForm.vehicleId}
              onChange={e => setBookingForm({ ...bookingForm, vehicleId: e.target.value })}
            />
          )}
        </label>

        <label>
          Parking Slot
          <select
            required
            value={bookingForm.parkingSlotId}
            onChange={e => setBookingForm({ ...bookingForm, parkingSlotId: e.target.value })}
          >
            <option value="">Select an available slot</option>
            {slots
              .filter(s => isSlotAvailable(s, bookingForm.bookingDate, bookingForm.startTime, bookingForm.endTime))
              .map(slot => (
                <option key={slot.id} value={String(slot.id)}>
                  {slot.slotNumber || `Slot #${slot.id}`} ({slot.vehicleType || 'Standard'}) — ID: {slot.id}
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
            onChange={e => setBookingForm({ ...bookingForm, bookingDate: e.target.value })}
          />
        </label>

        <label>
          Start Time
          <input
            type="time"
            required
            value={bookingForm.startTime}
            onChange={e => setBookingForm({ ...bookingForm, startTime: e.target.value })}
          />
        </label>

        <label>
          End Time
          <input
            type="time"
            required
            value={bookingForm.endTime}
            onChange={e => setBookingForm({ ...bookingForm, endTime: e.target.value })}
          />
        </label>

        <button className="primary-button full-width" type="submit" disabled={submitting}>
          {submitting ? 'Confirming Reservation...' : 'Confirm Reservation'}
        </button>

        <p className="form-note">
          Reservations require valid User and Vehicle IDs in the ParkSmart database.
        </p>
      </form>
    </div>
  );
}
