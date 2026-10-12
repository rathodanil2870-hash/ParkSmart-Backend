import ParkingCard from '../components/ParkingCard';

export default function FindParking({
  locations,
  slots,
  loading,
  error,
  onRefresh,
  onSelectSlot,
  getLocationName,
  getSlotStatus
}) {
  const availableCount = slots.filter(s => getSlotStatus(s) === 'AVAILABLE').length;

  return (
    <div className="page-find-parking">
      <div className="section-heading">
        <div>
          <h2>Option 1: Find Parking</h2>
          <p>Explore real-time parking locations and verified slot availability.</p>
        </div>
        <button className="secondary-button" onClick={onRefresh} disabled={loading}>
          {loading ? 'Refreshing...' : '🔄 Refresh Data'}
        </button>
      </div>

      {error && (
        <div className="message error" style={{ background: '#fef2f2', borderColor: '#fca5a5', color: '#991b1b' }}>
          <strong>Error loading data:</strong> {error}
          <button style={{ marginLeft: '12px' }} className="text-button" onClick={onRefresh}>Retry</button>
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <span>Active Locations</span>
          <strong>{locations.length}</strong>
        </div>
        <div className="stat-card">
          <span>Total Parking Slots</span>
          <strong>{slots.length}</strong>
        </div>
        <div className="stat-card">
          <span>Available Now</span>
          <strong>{availableCount}</strong>
        </div>
      </div>

      <h3 className="subheading">Parking Locations</h3>
      {locations.length === 0 ? (
        <p className="empty">
          No parking locations registered yet in the database.
        </p>
      ) : (
        <div className="card-grid">
          {locations.map(loc => (
            <article className="data-card" key={loc.id}>
              <div className="card-symbol">📍</div>
              <h3>{loc.name || loc.locationName || `Location #${loc.id}`}</h3>
              <p>{loc.address || loc.locationAddress || 'No address specified'}</p>
              <p><small>{loc.city ? `City: ${loc.city}` : ''}</small></p>
            </article>
          ))}
        </div>
      )}

      <h3 className="subheading">Available Parking Slots</h3>
      {slots.length === 0 ? (
        <p className="empty">
          No parking slots found in database. Please initialize slots via backend API.
        </p>
      ) : (
        <div className="card-grid">
          {slots.map(slot => {
            const status = getSlotStatus(slot);
            const isAvailable = status === 'AVAILABLE';
            return (
              <ParkingCard
                key={slot.id}
                slot={slot}
                locationName={getLocationName(slot)}
                status={status}
                isAvailable={isAvailable}
                onSelect={onSelectSlot}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
