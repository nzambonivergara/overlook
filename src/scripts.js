import './css/base.scss';
import { loadRooms, loadAllCustomers, loadSingleCustumer, loadBookings, addNewBookings } from './apiCalls';
import './images/twin-bed.jpg';
import './images/full-bed.jpg';
import './images/queen-bed.jpg';
import './images/king-bed.jpg';
import dayjs from 'dayjs';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';

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
    getCustomer(10);
  })
}

function getCustomer(id) {
  loadSingleCustomer(id)
  .then(customerData => {
    currentCustomer = new Customer(customerData);
    currentCustomer.getBookings(hotel.bookings);
  })
}
