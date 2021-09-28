const domUpdates = {
  loginForm: document.getElementById('loginForm'),

  loginErrorMessage: document.getElementById('loginErrorMessage'),

  logoutButton: document.getElementById('logoutButton'),

  searchForm: document.getElementById('searchForm'),

  searchResultsContainer: document.getElementById('searchResultsContainer'),

  availableRoomsTitle: document.getElementById('availableRoomsTitle'),

  availableRoomsContainer: document.getElementById('availableRoomsContainer'),

  noRoomsMessage: document.getElementById('noRoomsMessage'),

  bookingsContainer: document.getElementById('bookingsContainer'),

  upcomingBookingsList: document.getElementById('upcomingBookingsList'),

  presentBookingsList: document.getElementById('presentBookingsList'),

  pastBookingsList: document.getElementById('pastBookingsList'),

  totalSpent: document.getElementById('totalSpent'),

  confirmationMessage: document.getElementById('confirmation-message'),

  confirmationButton: document.getElementById('confirmBookingButton'),

  bookingsButton: document.getElementById('bookingsButton'),

  confirmationModalFooter: document.getElementById('confirmationModalFooter'),

  show(element) {
    element.classList.remove('hidden');
  },

  hide(element) {
    element.classList.add('hidden');
  },

  renderBookings(container, bookings) {
    container.innerHTML = '';
    bookings.forEach(booking => {
      container.innerHTML += '<li>' + booking + '</li>'
    })
  },

  renderAvailableRooms(rooms) {
    availableRoomsContainer.innerHTML = '';
    rooms.forEach(room => {
      const bidet = room.hasBidet ? 'yes' : 'no';
      availableRoomsContainer.innerHTML +=
      `<article class="rooms-container__room-card" id=${room.number} tabindex="0">
        <img src=${room.imageSrc} alt="${room.bedSize} bed bedroom">
        <ul>
          <li>Room #${room.number}</li>
          <li>Type: ${room.roomType}</li>
          <li>Bidet: ${bidet}</li>
          <li>Bed size: ${room.bedSize}</li>
          <li>Number of beds: ${room.numBeds}</li>
          <li>Cost per night: $${room.costPerNight.toFixed(2)}</li>
        </ul>
        <button class="book-button">BOOK NOW</button>
      </article>`
    })
  },

  renderModalInformation(roomInfo) {
    domUpdates.confirmationMessage.innerHTML = `
    <p>Check In: ${searchForm[0].value}</p>
    <p>Number of nights: ${searchForm[1].value}</p>
    <p>Room #: ${roomInfo.number}</p>
    <p>Cost per night: $${roomInfo.costPerNight}</p>
    <p>Click YES, to confirm and update your bookings.</p>
    `
    MicroModal.show('confirm-booking-modal');
    domUpdates.show(confirmationModalFooter);
  },

  displayErrorMessage() {
    MicroModal.show('connection-error-modal');
  },

  confirmBooking() {
    domUpdates.confirmationMessage.innerHTML =
    '<p>Your booking has been made!</p>';

    domUpdates.hide(confirmationModalFooter);
  },

  displayAvailableRooms(availableRooms) {
    domUpdates.hide(bookingsContainer);
    domUpdates.show(searchResultsContainer);

    if (availableRooms.length) {
      domUpdates.renderAvailableRooms(availableRooms);
      domUpdates.show(availableRoomsTitle);
      domUpdates.show(availableRoomsContainer);
      domUpdates.hide(noRoomsMessage);
    } else {
      domUpdates.show(noRoomsMessage);
      domUpdates.hide(availableRoomsTitle);
      domUpdates.hide(availableRoomsContainer);
    }
  },

  displayBookings(bookings) {
    domUpdates.hide(searchResultsContainer);
    domUpdates.show(bookingsContainer);
    searchForm.reset();

    domUpdates.renderBookings(pastBookingsList, bookings.past);
    domUpdates.renderBookings(presentBookingsList, bookings.present);
    domUpdates.renderBookings(upcomingBookingsList, bookings.upcoming);
  }
}


export default domUpdates;
