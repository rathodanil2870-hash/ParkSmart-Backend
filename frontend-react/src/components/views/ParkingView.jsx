export default function ParkingView({
  locations,
  slots,
  availableSlots,
  loadData,
  showPage,
  setBookingForm,
  getLocationName,
  getSlotStatus
}) {
  return (
    <>
      <div className="section-heading">
        <div>
          <h2>Find Parking</h2>
          <p>Explore locations and check slot status.</p>
        </div>
        <button className="secondary-button" onClick={loadData}>
          Refresh
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Parking locations</span>
          <strong>{locations.length}</strong>
        </div>
        <div className="stat-card">
          <span>Total slots</span>
          <strong>{slots.length}</strong>
        </div>
        <div className="stat-card">
          <span>Available slots</span>
          <strong>{availableSlots}</strong>
        </div>
      </div>

      <h3 className="subheading">Parking Locations</h3>

      {locations.length === 0 ? (
        <p className="empty">
          No locations found. Add locations through your backend API.
        </p>
      ) : (
        <div className="card-grid">
          {locations.map(location => (
            <article className="data-card" key={location.id}>
              <div className="card-symbol">📍</div>
              <h3>
                {location.name ||
                  location.locationName ||
                  `Location ${location.id}`}
              </h3>
              <p>
                {location.address ||
                  location.locationAddress ||
                  'Address not provided'}
              </p>
              <button
                className="primary-button"
                onClick={() => showPage('reserve')}
              >
                Reserve a slot
              </button>
            </article>
          ))}
        </div>
      )}

      <h3 className="subheading">Parking Slots</h3>

      {slots.length === 0 ? (
        <p className="empty">No parking slots found.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Slot ID</th>
                <th>Slot number</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
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
                  <td>
                    <button
                      className="text-button"
                      disabled={getSlotStatus(slot) !== 'AVAILABLE'}
                      onClick={() => {
                        setBookingForm(old => ({
                          ...old,
                          parkingSlotId: String(slot.id)
                        }));
                        showPage('reserve');
                      }}
                    >
                      {getSlotStatus(slot) === 'AVAILABLE'
                        ? 'Select'
                        : 'Unavailable'}
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
