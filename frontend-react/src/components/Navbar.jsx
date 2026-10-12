export default function Navbar({ activePage, onNavigate }) {
  const navItems = [
    { id: 'parking', label: 'Find Parking' },
    { id: 'reserve', label: 'Reserve a Slot' },
    { id: 'bookings', label: 'Manage Bookings' },
    { id: 'tickets', label: 'Parking Tickets' },
    { id: 'admin', label: 'Admin Dashboard' }
  ];

  return (
    <header className="topbar">
      <a
        className="brand"
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('parking');
        }}
      >
        <span className="brand-icon">P</span>
        ParkSmart
      </a>

      <nav className="navigation">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={activePage === item.id ? 'nav-link active' : 'nav-link'}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
