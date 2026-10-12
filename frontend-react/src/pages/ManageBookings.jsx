export default function ManageBookings({
  bookings,
  loading,
  error,
  onRefresh,
  onCreateTicket,
  creatingTicketId
}) {
  return (
    <div className="page-manage-bookings">
      <div className="section-heading">
        <div>
          <h2>Option 3: Manage Bookings</h2>
          <p>Live booking records fetched from the Spring Boot API.</p>
        </div>
        <button className="secondary-button" onClick={onRefresh} disabled={loading}>
          {loading ? 'Refreshing...' : '🔄 Refresh Bookings'}
        </button>
      </div>

      {error && (
        <div className="message error" style={{ background: '#fef2f2', borderColor: '#fca5a5', color: '#991b1b' }}>
          <strong>Error loading bookings:</strong> {error}
          <button style={{ marginLeft: '12px' }} className="text-button" onClick={onRefresh}>Retry</button>
        </div>
      )}

      {bookings.length === 0 ? (
        <p className="empty">
          No bookings recorded in the system yet. Reserve a slot from the "Reserve a Slot" tab.
        </p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Date</th>
                <th>Time Window</th>
                <th>User ID</th>
                <th>Vehicle ID</th>
                <th>Slot ID</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td><strong>#{booking.id}</strong></td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.startTime} – {booking.endTime}</td>
                  <td>User #{booking.userId}</td>
                  <td>Vehicle #{booking.vehicleId}</td>
                  <td>Slot #{booking.parkingSlotId}</td>
                  <td>
                    <span className="status available">
                      {booking.status || 'CONFIRMED'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="text-button"
                      disabled={creatingTicketId === booking.id}
                      onClick={() => onCreateTicket(booking.id)}
                    >
                      {creatingTicketId === booking.id ? 'Generating...' : '🎫 Issue Ticket'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
