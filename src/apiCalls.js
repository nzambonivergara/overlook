const apiEndpoint = 'http://localhost:3001';

function loadRooms() {
  return fetch(`${apiEndpoint}/api/v1/rooms`)
    .then(response => response.json())
    .then(data => data.rooms)
    .catch(error => console.error(error))
}

function loadAllCustomers() {
  return fetch(`${apiEndpoint}/api/v1/customers`)
    .then(response => response.json())
    .then(data => data.customers)
    .catch(error => console.error(error))
}

function loadSingleCustomer(customerID) {
  return fetch(`${apiEndpoint}/api/v1/customers/${customerID}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
}

function loadBookings() {
  return fetch(`${apiEndpoint}/api/v1/bookings`)
    .then(response => response.json())
    .then(data => data.bookings)
    .catch(error => console.log(error))
}

function addNewBookings(userId, date, roomNumber) {
  return fetch(`${apiEndpoint}/api/v1/bookings`, {
    method: 'POST',
    body: JSON.stringify({
      "userID": userId,
      "date": date,
      "roomNumber": roomNumber
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => data.newBooking)
  .catch(error => console.log(error))
}

export {
  loadRooms,
  loadAllCustomers,
  loadSingleCustomer,
  loadBookings,
  addNewBookings
}
