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

const { totalSpent, upcomingBookingsList, presentBookings, pastBookingsList, renderBookings } = domUpdates;

dayjs().format()

let hotel;
let currentCustomer;

window.addEventListener('load', loadData);

function loadData() {
  Promise.all([loadRooms(), loadBookings(), loadAllCustomers()])
  .then(data => {
    hotel = new Hotel(data[0], data[1], data[2]);
    hotel.getAllRooms();
    hotel.getAllBookings();
    getCustomer(5);
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
