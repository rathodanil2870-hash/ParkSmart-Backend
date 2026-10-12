import { QRCodeSVG } from 'qrcode.react';

export default function TicketsView({ tickets, loadData }) {
  return (
    <>
      <div className="section-heading">
        <div>
          <h2>Parking Tickets</h2>
          <p>View your ticket references and booking IDs.</p>
        </div>
        <button className="secondary-button" onClick={loadData}>
          Refresh
        </button>
      </div>

      {tickets.length === 0 ? (
        <p className="empty">
          No tickets found. Create a ticket from a booking.
        </p>
      ) : (
        <div className="card-grid">
          {tickets.map(ticket => (
            <article className="data-card ticket-card" key={ticket.id}>
              <div className="card-symbol">🎫</div>
              <h3>{ticket.ticketNumber || `Ticket ${ticket.id}`}</h3>
              <p>Ticket ID: {ticket.id}</p>
              <p>Booking ID: {ticket.bookingId}</p>
              <p>Issue date: {ticket.issueDate || 'N/A'}</p>
              <span className="status available">
                {ticket.status || 'UNKNOWN'}
              </span>
              <div className="qr-value">
                <span>QR code value</span>
                <QRCodeSVG
                  value={JSON.stringify({
                    ticketNumber: ticket.ticketNumber,
                    bookingId: ticket.bookingId,
                    qrCode: ticket.qrCode
                  })}
                  size={160}
                  level="M"
                  includeMargin={true}
                />
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="form-note">
        The QR code shown here is saved text, not a scannable QR image.
      </p>
    </>
  );
}
