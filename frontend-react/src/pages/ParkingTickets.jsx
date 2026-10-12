import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { api } from '../api/api';

export default function ParkingTickets({
  tickets,
  loading,
  error,
  onRefresh
}) {
  const [validateInput, setValidateInput] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [validating, setValidating] = useState(false);

  async function runValidation(ticketNo) {
    if (!ticketNo.trim()) return;
    setValidating(true);
    setValidationResult(null);

    try {
      const res = await api.validateTicket(ticketNo.trim());
      setValidationResult(res);
    } catch (err) {
      setValidationResult({
        valid: false,
        message: err.message || 'Validation request failed'
      });
    } finally {
      setValidating(false);
    }
  }

  function handleValidateTicket(e) {
    e.preventDefault();
    runValidation(validateInput);
  }

  function handleQuickVerify(ticketNo) {
    setValidateInput(ticketNo);
    runValidation(ticketNo);
  }

  return (
    <div className="page-parking-tickets">
      <div className="section-heading">
        <div>
          <h2>Option 4: Parking Tickets & QR Codes</h2>
          <p>Real-time digital parking passes retrieved from the database with scannable QR codes.</p>
        </div>
        <button className="secondary-button" onClick={onRefresh} disabled={loading}>
          {loading ? 'Refreshing...' : '🔄 Refresh Tickets'}
        </button>
      </div>

      {error && (
        <div className="message error" style={{ background: '#fef2f2', borderColor: '#fca5a5', color: '#991b1b' }}>
          <strong>Error loading tickets:</strong> {error}
          <button style={{ marginLeft: '12px' }} className="text-button" onClick={onRefresh}>Retry</button>
        </div>
      )}

      {/* TICKET VALIDATOR TOOL */}
      <div className="form-card" style={{ marginBottom: '32px' }}>
        <h3>🔍 Live Ticket Verification Tool</h3>
        <p style={{ margin: '4px 0 12px', color: '#526177', fontSize: '14px' }}>
          Verify any ticket against <code>/api/tickets/validate/{'{ticketNumber}'}</code>
        </p>

        {tickets.length > 0 && (
          <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', color: '#526177', fontWeight: 600 }}>Quick Test Chips:</span>
            {tickets.slice(0, 3).map(t => (
              <button
                key={t.id}
                type="button"
                className="secondary-button"
                style={{ padding: '4px 10px', fontSize: '12px' }}
                onClick={() => handleQuickVerify(t.ticketNumber)}
              >
                {t.ticketNumber} (Valid)
              </button>
            ))}
            <button
              type="button"
              className="secondary-button"
              style={{ padding: '4px 10px', fontSize: '12px', borderColor: '#fca5a5', color: '#b91c1c' }}
              onClick={() => handleQuickVerify('TKT-9999')}
            >
              TKT-9999 (Invalid)
            </button>
          </div>
        )}

        <form onSubmit={handleValidateTicket} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            required
            placeholder="Enter Ticket Number (e.g. TKT-1001)"
            value={validateInput}
            onChange={e => setValidateInput(e.target.value)}
            style={{ flex: 1 }}
          />
          <button className="primary-button" type="submit" disabled={validating}>
            {validating ? 'Verifying...' : 'Verify Ticket'}
          </button>
        </form>

        {validationResult && (
          <div
            style={{
              marginTop: '16px',
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: validationResult.valid ? '#f0fdf4' : '#fef2f2',
              border: `1px solid ${validationResult.valid ? '#bbf7d0' : '#fecaca'}`,
              color: validationResult.valid ? '#166534' : '#991b1b'
            }}
          >
            <strong>{validationResult.valid ? '✅ Valid Ticket' : '❌ Invalid Ticket'}:</strong> {validationResult.message}
            {validationResult.ticketNumber && (
              <div style={{ marginTop: '4px', fontSize: '13px' }}>
                Ticket: {validationResult.ticketNumber} | Status: {validationResult.status}
              </div>
            )}
          </div>
        )}
      </div>

      {/* TICKETS LIST */}
      <h3 className="subheading">Issued Parking Passes</h3>
      {tickets.length === 0 ? (
        <p className="empty">
          No parking tickets issued yet. Create a ticket from the "Manage Bookings" tab.
        </p>
      ) : (
        <div className="card-grid">
          {tickets.map(ticket => {
            const qrPayload = JSON.stringify({
              ticketNumber: ticket.ticketNumber,
              bookingId: ticket.bookingId,
              qrCode: ticket.qrCode,
              status: ticket.status
            });

            return (
              <article className="data-card ticket-card" key={ticket.id}>
                <div className="card-symbol">🎫</div>
                <h3>{ticket.ticketNumber || `Pass #${ticket.id}`}</h3>
                <p><strong>Ticket ID:</strong> #{ticket.id}</p>
                <p><strong>Booking ID:</strong> #{ticket.bookingId}</p>
                <p><strong>Issue Date:</strong> {ticket.issueDate || 'N/A'}</p>
                <div style={{ margin: '8px 0' }}>
                  <span className={ticket.status === 'ACTIVE' ? 'status available' : 'status'}>
                    {ticket.status || 'ACTIVE'}
                  </span>
                </div>

                <div className="qr-value">
                  <span style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                    Live Scannable QR Pass:
                  </span>
                  <QRCodeSVG
                    value={qrPayload}
                    size={160}
                    level="M"
                    includeMargin={true}
                  />
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280', wordBreak: 'break-all' }}>
                    Code: <code>{ticket.qrCode || ticket.ticketNumber}</code>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
