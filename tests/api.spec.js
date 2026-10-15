// API tests for https://restful-booker.herokuapp.com (a practice hotel-booking service).
// There is no browser here: Playwright sends requests straight to the server.
// "request" is Playwright's tool for sending API calls.

const { test, expect } = require('@playwright/test');

const API = 'https://restful-booker.herokuapp.com';

test.describe('Booking API', () => {

  test('server is running (GET /ping)', async ({ request }) => {
    const response = await request.get(`${API}/ping`);

    // Status code 201 means the server answered "OK, I'm alive"
    expect(response.status()).toBe(201);
  });

  test('can create a booking (POST /booking)', async ({ request }) => {
    const response = await request.post(`${API}/booking`, {
      data: {
        firstname: 'Asha',
        lastname: 'Perera',
        totalprice: 150,
        depositpaid: true,
        bookingdates: { checkin: '2026-11-01', checkout: '2026-11-05' },
        additionalneeds: 'Breakfast',
      },
    });

    expect(response.status()).toBe(200);

    // The server sends back JSON data; we read it and check the booking details
    const body = await response.json();
    expect(body.bookingid).toBeGreaterThan(0);
    expect(body.booking.firstname).toBe('Asha');
  });

  test('can read a booking back (GET /booking/:id)', async ({ request }) => {
    // First create a booking so we know one exists
    const created = await request.post(`${API}/booking`, {
      data: {
        firstname: 'Nimal',
        lastname: 'Silva',
        totalprice: 200,
        depositpaid: false,
        bookingdates: { checkin: '2026-12-01', checkout: '2026-12-03' },
      },
    });
    const { bookingid } = await created.json();

    // Now ask the server for that booking by its id
    const response = await request.get(`${API}/booking/${bookingid}`, {
      headers: { Accept: 'application/json' },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe('Nimal');
    expect(body.totalprice).toBe(200);
  });
});
