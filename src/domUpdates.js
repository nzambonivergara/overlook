const domUpdates = {
  searchForm: document.getElementById('searchForm'),

  searchResultsContainer: document.getElementById('searchResultsContainer'),

  availableRoomsContainer:
  document.getElementById('availableRoomsContainer'),

  bookingsContainer: document.getElementById('bookingsContainer'),

  upcomingBookingsList: document.getElementById('upcomingBookingsList'),

  presentBookingsList: document.getElementById('presentBookingsList'),

  pastBookingsList: document.getElementById('pastBookingsList'),

  totalSpent: document.getElementById('totalSpent'),

  confirmationMessage: document.getElementById('confirmation-message'),

  confirmationButton: document.getElementById('confirmBookingButton'),

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
      `<article class="rooms-container__room-card" id=${room.number}>
        <img src=${room.imageSrc}>
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

  renderModalInformation(container, roomInfo) {
    container.innerHTML = `
    <p>Check In: ${searchForm[0].value}</p>
    <p>Number of nights: ${searchForm[1].value}</p>
    <p>Room #: ${roomInfo.number}</p>
    <p>Cost per night: $${roomInfo.costPerNight}</p>
    <p>Click YES, to confirm and update your bookings.</p>
    `
    MicroModal.show('confirm-booking-modal');
  }
}


export default domUpdates;
