import './css/base.scss';
import {
  loadRooms,
  loadAllCustomers,
  loadSingleCustomer,
  loadBookings,
  addNewBookings
} from './apiCalls';
import './images/twin-bed.jpg';
import './images/full-bed.jpg';
import './images/queen-bed.jpg';
import './images/king-bed.jpg';
import dayjs from 'dayjs';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';
import domUpdates from './domUpdates';
import MicroModal from 'micromodal';

const {
  loginForm,
  loginErrorMessage,
  logoutButton,
  searchForm,
  searchResultsContainer,
  availableRoomsContainer,
  availableRoomsTitle,
  noRoomsMessage,
  bookingsContainer,
  totalSpent,
  confirmationMessage,
  confirmationButton,
  upcomingBookingsList,
  presentBookingsList,
  pastBookingsList,
  bookingsButton,
  hide,
  show,
  renderBookings,
  renderAvailableRooms,
  renderModalInformation
} = domUpdates;

let hotel;
let currentCustomer;

window.addEventListener('load', displayLogin);
loginForm.addEventListener('submit', validateLogin);
searchForm.addEventListener('submit', searchRooms);
availableRoomsContainer.addEventListener('click', bookRoom);
confirmationButton.addEventListener('click', requestBookings);
bookingsButton.addEventListener('click', displayBookings);
logoutButton.addEventListener('click', logOut);

function displayLogin() {
  MicroModal.show('login-modal');
  loadData();
}

function validateLogin() {
  event.preventDefault();
  const username = loginForm[0].value;
  const password = loginForm[1].value;
  const id = parseInt(username.split('customer')[1]);

  if ((username.length === 9 || username.length === 10) &&
      (0 < id && id < 51) && password === 'overlook2021') {
    getCustomer(id);
  } else {
    show(loginErrorMessage);
    loginForm.reset();
  }
}

function logOut() {
  window.location.reload();
}

function loadData() {
  Promise.all([loadRooms(), loadBookings(), loadAllCustomers()])
    .then(data => {
      hotel = new Hotel(data[0], data[1], data[2]);
      hotel.getAllRooms();
      hotel.getAllBookings();
      searchForm[0].min = dayjs().format('YYYY-MM-DD');
    })
}

function getCustomer(id) {
  loadSingleCustomer(id)
    .then(customerData => {
      MicroModal.close('login-modal');
      currentCustomer = new Customer(customerData);
      displayBookingsInformation();
    })
}

function displayBookingsInformation() {
  currentCustomer.getBookings(hotel.bookings);
  const pastBookings = currentCustomer.getPastBookings();
  const presentBookings = currentCustomer.getPresentBookings();
  const upcomingBookings = currentCustomer.getUpcomingBookings();

  totalSpent.innerText =
  currentCustomer.calculateTotalSpent(hotel.rooms).toFixed(2);
  renderBookings(pastBookingsList, pastBookings);
  renderBookings(presentBookingsList, presentBookings);
  renderBookings(upcomingBookingsList, upcomingBookings);
}

function searchRooms(event) {
  event.preventDefault();
  hide(bookingsContainer);
  show(searchResultsContainer);

  const roomContainer = document.getElementById('availableRoomsContainer')

  let availableRooms =
  hotel.getAvailableRooms(searchForm[0].value, searchForm[1].value);

  if (searchForm[2].value !== 'all') {
    availableRooms =
    hotel.filterRoomsByType(availableRooms, searchForm[2].value)
  }

  if (availableRooms.length) {
    renderAvailableRooms(availableRooms);
    show(availableRoomsTitle);
    show(availableRoomsContainer);
    hide(noRoomsMessage);
  } else {
    show(noRoomsMessage);
    hide(availableRoomsTitle);
    hide(roomContainer);
  }
}

function bookRoom(event) {
  const target = event.target;
  const roomNumber = parseInt(target.parentNode.id);

  if (target.classList.contains('book-button')) {
    const roomInfo = hotel.rooms[roomNumber - 1]
    renderModalInformation(confirmationMessage, roomInfo);
    confirmationButton.value = roomNumber;
  }
}

function updateBookings(bookings) {
  return Promise.all(bookings.map(booking => {
    return addNewBookings(booking.userID, booking.date, booking.roomNumber)
  }))
}

function requestBookings(event) {
  const roomNumber = parseInt(event.target.value);

  const bookingsRequest =
  currentCustomer.returnBookingsRequest(searchForm[0].value, searchForm[1].value, roomNumber);

  updateBookings(bookingsRequest)
    .then(response => {
      hotel.addNewBookings(response);

      MicroModal.close('confirm-booking-modal');
      displayBookings();
    })
}

function displayBookings() {
  hide(searchResultsContainer);
  show(bookingsContainer);
  searchForm.reset();
  displayBookingsInformation();
}
