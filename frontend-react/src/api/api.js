const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_BASE = BASE_URL.endsWith('/api') ? BASE_URL : `${BASE_URL}/api`;

export async function request(path, options = {}) {
  let response;
  const endpoint = path.startsWith('/api') ? `${BASE_URL}${path}` : `${API_BASE}${path}`;

  try {
    response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
  } catch {
    throw new Error(
      `Cannot connect to backend at ${API_BASE}. Make sure Spring Boot is running on port 8080.`
    );
  }

  if (!response.ok) {
    let errorMessage = `Request failed (${response.status})`;

    try {
      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage =
          errorData.detail ||
          errorData.message ||
          errorData.error ||
          errorMessage;
      } else {
        const errorText = await response.text();
        if (errorText.trim()) errorMessage = errorText;
      }
    } catch {
      // Keep default error message
    }

    if (response.status === 409) {
      throw new Error(
        errorMessage.toLowerCase().includes('booked')
          ? errorMessage
          : 'This parking slot is already booked. Please select another slot.'
      );
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) return null;

  return response.json();
}

export const api = {
  getHello: () => request('/parking/hello'),
  getLocations: () => request('/locations'),
  createLocation: (data) => request('/locations', { method: 'POST', body: JSON.stringify(data) }),
  getSlots: () => request('/slots'),
  createSlot: (data) => request('/slots', { method: 'POST', body: JSON.stringify(data) }),
  getUsers: () => request('/users'),
  createUser: (data) => request('/users', { method: 'POST', body: JSON.stringify(data) }),
  getVehicles: () => request('/vehicles'),
  createVehicle: (data) => request('/vehicles', { method: 'POST', body: JSON.stringify(data) }),
  getBookings: () => request('/bookings'),
  createBooking: (data) => request('/bookings', { method: 'POST', body: JSON.stringify(data) }),
  getTickets: () => request('/tickets'),
  createTicket: (data) => request('/tickets', { method: 'POST', body: JSON.stringify(data) }),
  validateTicket: (ticketNumber) => request(`/tickets/validate/${ticketNumber}`)
};
