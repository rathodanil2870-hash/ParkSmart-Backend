import { useEffect, useState } from 'react';
import './styles/App.css';
import { api } from './api/api';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import FindParking from './pages/FindParking';
import ReserveSlot from './pages/ReserveSlot';
import ManageBookings from './pages/ManageBookings';
import ParkingTickets from './pages/ParkingTickets';
import AdminView from './components/views/AdminView';

function App() {
  const [page, setPage] = useState('parking');
  const [locations, setLocations] = useState([]);
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [creatingTicketId, setCreatingTicketId] = useState(null);

  const [bookingForm, setBookingForm] = useState({
    userId: '',
    vehicleId: '',
    parkingSlotId: '',
    bookingDate: '',
    startTime: '',
    endTime: ''
  });

  async function loadData() {
    setLoading(true);
    setError('');

    try {
      const results = await Promise.allSettled([
        api.getLocations(),
        api.getSlots(),
        api.getBookings(),
        api.getTickets(),
        api.getUsers(),
        api.getVehicles()
      ]);

      const [locRes, slotRes, bookRes, tktRes, userRes, vehRes] = results;

      if (locRes.status === 'fulfilled') setLocations(Array.isArray(locRes.value) ? locRes.value : []);
      if (slotRes.status === 'fulfilled') setSlots(Array.isArray(slotRes.value) ? slotRes.value : []);
      if (bookRes.status === 'fulfilled') setBookings(Array.isArray(bookRes.value) ? bookRes.value : []);
      if (tktRes.status === 'fulfilled') setTickets(Array.isArray(tktRes.value) ? tktRes.value : []);
      if (userRes.status === 'fulfilled') setUsers(Array.isArray(userRes.value) ? userRes.value : []);
      if (vehRes.status === 'fulfilled') setVehicles(Array.isArray(vehRes.value) ? vehRes.value : []);

      const failed = [];
      if (locRes.status === 'rejected') failed.push('locations');
      if (slotRes.status === 'rejected') failed.push('slots');
      if (bookRes.status === 'rejected') failed.push('bookings');
      if (tktRes.status === 'rejected') failed.push('tickets');

      if (failed.length > 0) {
        setError(`Could not retrieve: ${failed.join(', ')}. Ensure Spring Boot is running on port 8080.`);
      }
    } catch (err) {
      setError(`Connection failure: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, []);

  function getLocationName(slot) {
    const locId = Number(slot.parkingLocationId ?? slot.locationId);
    const loc = locations.find(item => Number(item.id) === locId);
    return slot.locationName || loc?.name || loc?.locationName || (locId ? `Location #${locId}` : 'Standard Area');
  }

  function getSlotStatus(slot) {
    return String(slot.status ?? slot.slotStatus ?? 'AVAILABLE').trim().toUpperCase();
  }

  function isSlotAvailable(slot, date, startTime, endTime) {
    if (getSlotStatus(slot) !== 'AVAILABLE') return false;
    if (!date || !startTime || !endTime) return true;

    return !bookings.some(b => {
      if (Number(b.parkingSlotId) !== Number(slot.id)) return false;
      if (b.bookingDate !== date) return false;
      if (String(b.status).toUpperCase() !== 'CONFIRMED') return false;
      return b.startTime < endTime && b.endTime > startTime;
    });
  }

  function handleSelectSlot(slot) {
    setBookingForm(prev => ({
      ...prev,
      parkingSlotId: String(slot.id)
    }));
    setPage('reserve');
    setMessage(`Selected slot #${slot.slotNumber || slot.id}. Complete the reservation details below.`);
  }

  async function handleBookingSubmit(e) {
    e.preventDefault();
    setMessage('');
    setError('');

    if (bookingForm.startTime >= bookingForm.endTime) {
      setError('End time must be after start time.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        userId: Number(bookingForm.userId),
        vehicleId: Number(bookingForm.vehicleId),
        parkingSlotId: Number(bookingForm.parkingSlotId),
        bookingDate: bookingForm.bookingDate,
        startTime: bookingForm.startTime,
        endTime: bookingForm.endTime,
        status: 'CONFIRMED'
      };

      const created = await api.createBooking(payload);
      setMessage(`🎉 Reservation confirmed! Booking ID #${created.id}`);

      setBookingForm({
        userId: users.length > 0 ? String(users[0].id) : '',
        vehicleId: vehicles.length > 0 ? String(vehicles[0].id) : '',
        parkingSlotId: '',
        bookingDate: '',
        startTime: '',
        endTime: ''
      });

      await loadData();
      setPage('bookings');
    } catch (err) {
      setError(`Failed to create booking: ${err.message}`);
      await loadData();
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCreateTicket(bookingId) {
    setMessage('');
    setError('');
    setCreatingTicketId(bookingId);

    try {
      const ticketNumber = `TKT-${Date.now()}`;
      await api.createTicket({
        bookingId: Number(bookingId),
        issueDate: new Date().toISOString().slice(0, 10),
        ticketNumber,
        qrCode: `PARKSMART-${ticketNumber}`,
        status: 'ACTIVE'
      });

      setMessage(`🎫 Ticket #${ticketNumber} created successfully! View pass below.`);
      await loadData();
      setPage('tickets');
    } catch (err) {
      setError(`Failed to issue ticket: ${err.message}`);
    } finally {
      setCreatingTicketId(null);
    }
  }

  const availableSlots = slots.filter(s => getSlotStatus(s) === 'AVAILABLE').length;
  const bookedSlots = slots.filter(s => getSlotStatus(s) === 'BOOKED').length;
  const confirmedBookings = bookings.filter(b => String(b.status).toUpperCase() === 'CONFIRMED').length;
  const activeTickets = tickets.filter(t => String(t.status).toUpperCase() === 'ACTIVE').length;

  return (
    <div className="app-shell">
      <Navbar activePage={page} onNavigate={setPage} />

      <main>
        <section className="welcome">
          <div>
            <span className="eyebrow">SMART PARKING MANAGEMENT SYSTEM</span>
            <h1>ParkSmart Dashboard</h1>
            <p>Real-time slot reservation, parking pass issuance, and automated monitoring.</p>
          </div>
          <div className="welcome-icon">🅿️</div>
        </section>

        {message && (
          <div className="message" role="status" style={{ background: '#ecfdf5', borderColor: '#a7f3d0', color: '#065f46' }}>
            {message}
          </div>
        )}

        {loading && <Loading />}

        <section className="content">
          {page === 'parking' && (
            <FindParking
              locations={locations}
              slots={slots}
              loading={loading}
              error={error}
              onRefresh={loadData}
              onSelectSlot={handleSelectSlot}
              getLocationName={getLocationName}
              getSlotStatus={getSlotStatus}
            />
          )}

          {page === 'reserve' && (
            <ReserveSlot
              slots={slots}
              users={users}
              vehicles={vehicles}
              bookingForm={bookingForm}
              setBookingForm={setBookingForm}
              onSubmit={handleBookingSubmit}
              submitting={submitting}
              isSlotAvailable={isSlotAvailable}
            />
          )}

          {page === 'bookings' && (
            <ManageBookings
              bookings={bookings}
              loading={loading}
              error={error}
              onRefresh={loadData}
              onCreateTicket={handleCreateTicket}
              creatingTicketId={creatingTicketId}
            />
          )}

          {page === 'tickets' && (
            <ParkingTickets
              tickets={tickets}
              loading={loading}
              error={error}
              onRefresh={loadData}
            />
          )}

          {page === 'admin' && (
            <AdminView
              locations={locations}
              slots={slots}
              availableSlots={availableSlots}
              bookedSlots={bookedSlots}
              bookings={bookings}
              confirmedBookings={confirmedBookings}
              tickets={tickets}
              activeTickets={activeTickets}
              loadData={loadData}
              getLocationName={getLocationName}
              getSlotStatus={getSlotStatus}
            />
          )}
        </section>
      </main>

      <footer className="footer">
        <strong>ParkSmart</strong>
        <span>Smart Parking Management and Reservation System</span>
      </footer>
    </div>
  );
}

export default App;
