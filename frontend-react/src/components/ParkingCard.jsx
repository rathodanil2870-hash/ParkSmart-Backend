export default function ParkingCard({
  slot,
  locationName,
  status,
  isAvailable,
  onSelect
}) {
  return (
    <article className="data-card parking-card">
      <div className="card-symbol">🚗</div>
      <h3>{slot.slotNumber || slot.slotName || `Slot #${slot.id}`}</h3>
      <p><strong>Location:</strong> {locationName}</p>
      <p><strong>Vehicle Type:</strong> {slot.vehicleType || 'Any vehicle'}</p>
      <div style={{ marginTop: '10px' }}>
        <span className={status === 'AVAILABLE' ? 'status available' : 'status'}>
          {status}
        </span>
      </div>
      {onSelect && (
        <button
          style={{ marginTop: '14px', width: '100%' }}
          className={isAvailable ? 'primary-button' : 'secondary-button'}
          disabled={!isAvailable}
          onClick={() => onSelect(slot)}
        >
          {isAvailable ? 'Reserve this slot' : 'Unavailable'}
        </button>
      )}
    </article>
  );
}
