export default function BookingsView({ bookings, loadData, createTicket }) {
  return (
    <>
      <div className="section-heading">
        <div>
          <h2>Manage Bookings</h2>
          <p>Bookings retrieved from your Spring Boot API.</p>
        </div>
        <button className="secondary-button" onClick={loadData}>
          Refresh
        </button>
      </div>

      {bookings.length === 0 ? (
        <p className="empty">No bookings found yet.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>User ID</th>
                <th>Vehicle ID</th>
                <th>Slot ID</th>
                <th>Status</th>
                <th>Ticket</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.bookingDate}</td>
                  <td>
                    {booking.startTime}–{booking.endTime}
                  </td>
                  <td>{booking.userId}</td>
                  <td>{booking.vehicleId}</td>
                  <td>{booking.parkingSlotId}</td>
                  <td>
                    <span className="status">
                      {booking.status || 'UNKNOWN'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="text-button"
                      onClick={() => createTicket(booking.id)}
                    >
                      Create ticket
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
