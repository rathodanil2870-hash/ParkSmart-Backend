export default function AdminView({
  locations,
  slots,
  availableSlots,
  bookedSlots,
  bookings,
  confirmedBookings,
  tickets,
  activeTickets,
  loadData,
  getLocationName,
  getSlotStatus
}) {
  return (
    <>
      <div className="section-heading">
        <div>
          <h2>Admin Dashboard</h2>
          <p>
            Monitor parking locations, slot availability, bookings, and tickets.
          </p>
        </div>
        <button className="secondary-button" onClick={loadData}>
          Refresh Dashboard
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Locations</span>
          <strong>{locations.length}</strong>
        </div>

        <div className="stat-card">
          <span>Total Parking Slots</span>
          <strong>{slots.length}</strong>
        </div>

        <div className="stat-card">
          <span>Available Slots</span>
          <strong>{availableSlots}</strong>
        </div>

        <div className="stat-card">
          <span>Booked Slots</span>
          <strong>{bookedSlots}</strong>
        </div>

        <div className="stat-card">
          <span>Total Bookings</span>
          <strong>{bookings.length}</strong>
        </div>

        <div className="stat-card">
          <span>Confirmed Bookings</span>
          <strong>{confirmedBookings}</strong>
        </div>

        <div className="stat-card">
          <span>Total Tickets</span>
          <strong>{tickets.length}</strong>
        </div>

        <div className="stat-card">
          <span>Active Tickets</span>
          <strong>{activeTickets}</strong>
        </div>
      </div>

      <h3 className="subheading">Parking Slot Overview</h3>

      {slots.length === 0 ? (
        <p className="empty">
          No parking slots available. Check that the backend is running.
        </p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Slot ID</th>
                <th>Slot Number</th>
                <th>Location</th>
                <th>Vehicle Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {slots.map(slot => (
                <tr key={slot.id}>
                  <td>{slot.id}</td>
                  <td>
                    {slot.slotNumber ||
                      slot.slotName ||
                      `Slot ${slot.id}`}
                  </td>
                  <td>{getLocationName(slot)}</td>
                  <td>{slot.vehicleType || 'Not specified'}</td>
                  <td>
                    <span
                      className={
                        getSlotStatus(slot) === 'AVAILABLE'
                          ? 'status available'
                          : 'status'
                      }
                    >
                      {getSlotStatus(slot)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h3 className="subheading">Recent Bookings</h3>

      {bookings.length === 0 ? (
        <p className="empty">No bookings recorded yet.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Date</th>
                <th>User ID</th>
                <th>Slot ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[...bookings]
                .sort((a, b) => Number(b.id) - Number(a.id))
                .slice(0, 5)
                .map(booking => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.bookingDate || 'N/A'}</td>
                    <td>{booking.userId ?? 'N/A'}</td>
                    <td>{booking.parkingSlotId ?? 'N/A'}</td>
                    <td>
                      <span className="status">
                        {booking.status || 'UNKNOWN'}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="form-note">
        Dashboard totals are calculated from the data returned by your current
        backend APIs. This is a monitoring dashboard, not a secured
        administrator login or slot-editing feature.
      </p>
    </>
  );
}
