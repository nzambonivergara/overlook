import domUpdates from './domUpdates';
const apiEndpoint = 'https://overlookdata.herokuapp.com';

function loadRooms() {
  return fetch(`${apiEndpoint}/api/v1/rooms`)
    .then(response => response.json())
    .then(data => data.rooms)
    .catch(error => {
      console.error(error);
      domUpdates.displayErrorMessage();
    })
}

function loadAllCustomers() {
  return fetch(`${apiEndpoint}/api/v1/customers`)
    .then(response => response.json())
    .then(data => data.customers)
    .catch(error => {
      console.error(error);
      domUpdates.displayErrorMessage();
    })
}

function loadSingleCustomer(customerID) {
  return fetch(`${apiEndpoint}/api/v1/customers/${customerID}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error(error);
      domUpdates.displayErrorMessage();
    })
}

function loadBookings() {
  return fetch(`${apiEndpoint}/api/v1/bookings`)
    .then(response => response.json())
    .then(data => data.bookings)
    .catch(error => {
      console.error(error);
      domUpdates.displayErrorMessage();
    })
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
    .then(response => checkResponse(response))
    .then(data => data.newBooking)
    .catch(error => {
      console.error(error);
      domUpdates.displayErrorMessage();
    })
}

function checkResponse(response) {
  if (!response.ok) {
    throw new Error('Please enter valid input.')
  }
  return response.json();
}

export {
  loadRooms,
  loadAllCustomers,
  loadSingleCustomer,
  loadBookings,
  addNewBookings
}
