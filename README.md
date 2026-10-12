# Smart Parking Management and Reservation System (ParkSmart)

ParkSmart is a full-stack smart parking management solution built with a **Spring Boot 4 / Java 21** REST API backend and a **React + Vite** single-page application frontend.

---

## 🏛️ Project Architecture

```text
Smarting-parking-management-system/
├── pom.xml
├── .gitignore
├── README.md
│
├── src/                                  # Spring Boot backend
│   └── main/
│       ├── java/com/smartparking/
│       │   └── smartingparkingmanagementsystem/
│       │       ├── SmartingParkingManagementSystemApplication.java
│       │       ├── controller/           # REST endpoints
│       │       ├── service/              # Business & transaction logic
│       │       ├── repository/           # Spring Data JPA repositories
│       │       ├── entity/               # JPA database entities
│       │       ├── dto/                  # Request / Response transfer objects
│       │       └── config/               # Global CORS and app configuration
│       └── resources/
│           └── application.properties    # Datasource & server config
│
└── frontend-react/                       # React frontend
    ├── package.json
    ├── index.html
    ├── vite.config.js
    ├── .env                              # VITE_API_BASE_URL=http://localhost:8080
    └── src/
        ├── main.jsx
        ├── App.jsx                       # Main orchestrator
        ├── api/
        │   └── api.js                    # Centralized API fetch client
        ├── components/
        │   ├── Navbar.jsx                # Top bar navigation
        │   ├── ParkingCard.jsx           # Parking slot presentation
        │   └── Loading.jsx               # Loading spinner state
        ├── pages/
        │   ├── FindParking.jsx           # Option 1: Find Parking
        │   ├── ReserveSlot.jsx           # Option 2: Reserve a Slot
        │   ├── ManageBookings.jsx        # Option 3: Manage Bookings
        │   └── ParkingTickets.jsx        # Option 4: Parking Tickets / QR Code
        └── styles/
            └── App.css                   # Responsive UI styling
```

---

## 🚀 Running the Application

### 1. Terminal 1: Backend (Spring Boot)

Ensure MySQL is running with the `parksmart` database created.

```powershell
# In project root:
.\mvnw.cmd -DskipTests compile
.\mvnw.cmd spring-boot:run
```

* Backend runs at: `http://localhost:8080`
* Test endpoint: `http://localhost:8080/api/parking/hello`

### 2. Terminal 2: Frontend (React / Vite)

```powershell
# Navigate into the frontend folder:
cd frontend-react
npm install
npm run dev
```

* Frontend runs at: `http://localhost:5173`

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/parking/hello` | Health check endpoint |
| `GET` / `POST` | `/api/locations` | List or create parking locations |
| `GET` / `POST` | `/api/slots` | List or register parking slots |
| `GET` / `POST` | `/api/users` | List or register system users |
| `GET` / `POST` | `/api/vehicles` | List or register user vehicles |
| `GET` / `POST` | `/api/bookings` | Retrieve or create parking bookings |
| `GET` / `POST` | `/api/tickets` | Retrieve or create parking passes |
| `GET` | `/api/tickets/validate/{number}` | Verify live parking ticket validity |
| `GET` / `POST` | `/api/admins` | List or register admins |
| `GET` / `POST` | `/api/operators` | List or register operators |
