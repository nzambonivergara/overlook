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
    domUpdates.availableRoomsContainer.innerHTML = '';
    rooms.forEach(room => {
      const bidet = room.hasBidet ? 'yes' : 'no';
      domUpdates.availableRoomsContainer.innerHTML +=
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
    <p>Check In: ${domUpdates.searchForm[0].value}</p>
    <p>Number of nights: ${domUpdates.searchForm[1].value}</p>
    <p>Room #: ${roomInfo.number}</p>
    <p>Cost per night: $${roomInfo.costPerNight}</p>
    <p>Click YES, to confirm and update your bookings.</p>
    `
    MicroModal.show('confirm-booking-modal');
    domUpdates.show(domUpdates.confirmationModalFooter);
  },

  displayErrorMessage() {
    MicroModal.show('connection-error-modal');
  },

  confirmBooking() {
    domUpdates.confirmationMessage.innerHTML =
    '<p>Your booking has been made!</p>';

    domUpdates.hide(domUpdates.confirmationModalFooter);
  },

  displayAvailableRooms(availableRooms) {
    domUpdates.hide(domUpdates.bookingsContainer);
    domUpdates.show(domUpdates.searchResultsContainer);

    if (availableRooms.length) {
      domUpdates.renderAvailableRooms(availableRooms);
      domUpdates.show(domUpdates.availableRoomsTitle);
      domUpdates.show(domUpdates.availableRoomsContainer);
      domUpdates.hide(domUpdates.noRoomsMessage);
    } else {
      domUpdates.show(domUpdates.noRoomsMessage);
      domUpdates.hide(domUpdates.availableRoomsTitle);
      domUpdates.hide(domUpdates.availableRoomsContainer);
    }
  },

  displayBookings(bookings) {
    domUpdates.hide(domUpdates.searchResultsContainer);
    domUpdates.show(domUpdates.bookingsContainer);
    domUpdates.searchForm.reset();

    domUpdates.renderBookings(domUpdates.pastBookingsList, bookings.past);
    domUpdates.renderBookings(domUpdates.presentBookingsList, bookings.present);
    domUpdates.renderBookings(domUpdates.upcomingBookingsList, bookings.upcoming);
  }
}


export default domUpdates;
