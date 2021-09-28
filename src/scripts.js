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
  renderModalInformation,
  confirmBooking,
  displayAvailableRooms,
  displayBookings
} = domUpdates;

let hotel;
let currentCustomer;

window.addEventListener('load', displayLogin);
loginForm.addEventListener('submit', validateLogin);
searchForm.addEventListener('submit', searchRooms);
availableRoomsContainer.addEventListener('click', bookRoom);
confirmationButton.addEventListener('click', requestBookings);
bookingsButton.addEventListener('click', displayBookingsInformation);
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
  const bookings = {
    past: currentCustomer.getPastBookings(),
    present: currentCustomer.getPresentBookings(),
    upcoming: currentCustomer.getUpcomingBookings()
  };

  displayBookings(bookings);

  totalSpent.innerText =
  currentCustomer.calculateTotalSpent(hotel.rooms).toFixed(2);
}

function searchRooms(event) {
  event.preventDefault();

  let availableRooms =
  hotel.getAvailableRooms(searchForm[0].value, searchForm[1].value);

  if (searchForm[2].value !== 'all') {
    availableRooms =
    hotel.filterRoomsByType(availableRooms, searchForm[2].value);
  }

  displayAvailableRooms(availableRooms);
}

function bookRoom(event) {
  const target = event.target;
  const roomNumber = parseInt(target.parentNode.id);

  if (target.classList.contains('book-button')) {
    const room = hotel.rooms[roomNumber - 1];
    confirmationButton.value = roomNumber;

    renderModalInformation(room);
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
      confirmBooking();
      hotel.addNewBookings(response);
      displayBookingsInformation();
    })
}
