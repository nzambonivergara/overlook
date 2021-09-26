import './css/base.scss';
import { loadRooms, loadAllCustomers, loadSingleCustomer, loadBookings, addNewBookings } from './apiCalls';
import './images/twin-bed.jpg';
import './images/full-bed.jpg';
import './images/queen-bed.jpg';
import './images/king-bed.jpg';
import dayjs from 'dayjs';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';
import domUpdates from './domUpdates';
import MicroModal from 'micromodal';

const { form, searchResultsContainer, availableRoomsContainer, bookingsContainer, totalSpent, upcomingBookingsList, presentBookings, pastBookingsList, hide, show, renderBookings, renderAvailableRooms } = domUpdates;

dayjs().format()

let hotel;
let currentCustomer;

window.addEventListener('load', loadData);
form.addEventListener('submit', searchRooms);
availableRoomsContainer.addEventListener('click', bookRoom);

function loadData() {
  Promise.all([loadRooms(), loadBookings(), loadAllCustomers()])
  .then(data => {
    hotel = new Hotel(data[0], data[1], data[2]);
    hotel.getAllRooms();
    hotel.getAllBookings();
    getCustomer(5);
    form[0].min = dayjs().format('YYYY-MM-DD');
  })
}

function getCustomer(id) {
  loadSingleCustomer(id)
  .then(customerData => {
    currentCustomer = new Customer(customerData);
    currentCustomer.getBookings(hotel.bookings);
    displayBookingsInformation();
  })
}

function displayBookingsInformation() {
  const pastBookings = currentCustomer.getPastBookings();
  const presentBookings = currentCustomer.getPresentBookings();
  const upcomingBookings = currentCustomer.getUpcomingBookings();

  totalSpent.innerText = currentCustomer.calculateTotalSpent(hotel.rooms).toFixed(2);
  renderBookings(pastBookingsList, pastBookings);
  renderBookings(presentBookingsList, presentBookings);
  renderBookings(upcomingBookingsList, upcomingBookings);
}

function searchRooms(event) {
  event.preventDefault()
  hide(bookingsContainer);
  show(searchResultsContainer);

  let availableRooms = hotel.getAvailableRooms(form[0].value, form[1].value)

  if (form[2].value !== 'all') {
    availableRooms = hotel.filterRoomsByType(availableRooms, form[2].value)
  }

  renderAvailableRooms(availableRooms);
}

function bookRoom(event) {
  const target = event.target;
  const roomNumber = parseInt(target.parentNode.id);

  if (target.classList.contains('book-button')) {
     currentCustomer.returnBookingsRequest(form[0].value, form[1].value, roomNumber).map(booking => {
       addNewBookings(booking.userID, booking.date, booking.roomNumber)
     })
  }
}
