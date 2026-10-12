export default function Navbar({ page, showPage, loadData }) {
  return (
    <header className="topbar">
      <a
        className="brand"
        href="#home"
        onClick={() => showPage('parking')}
      >
        <span className="brand-icon">P</span>
        ParkSmart
      </a>

      <nav className="navigation">
        <button
          className={page === 'parking' ? 'nav-link active' : 'nav-link'}
          onClick={() => showPage('parking')}
        >
          Find Parking
        </button>

        <button
          className={page === 'reserve' ? 'nav-link active' : 'nav-link'}
          onClick={() => showPage('reserve')}
        >
          Reserve a Slot
        </button>

        <button
          className={page === 'bookings' ? 'nav-link active' : 'nav-link'}
          onClick={() => showPage('bookings')}
        >
          My Bookings
        </button>

        <button
          className={page === 'tickets' ? 'nav-link active' : 'nav-link'}
          onClick={() => showPage('tickets')}
        >
          Tickets
        </button>

        <button
          className={page === 'admin' ? 'nav-link active' : 'nav-link'}
          onClick={() => {
            showPage('admin');
            loadData();
          }}
        >
          Admin Dashboard
        </button>
      </nav>
    </header>
  );
}
