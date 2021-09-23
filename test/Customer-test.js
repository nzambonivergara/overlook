import { expect } from 'chai';
import { roomsData } from './sample-data/rooms-sample';
import { bookingsData } from './sample-data/bookings-sample';
import { customersData } from './sample-data/customers-data'
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';
import Customer from '../src/classes/Customer';

describe('Customer', () => {
  let bookingPast, bookingPresent, bookingUpcoming, bookings;
  let rooms;
  let customer1, customer2;

  beforeEach(() => {
    rooms = [
      new Room(roomsData[0]),
      new Room(roomsData[1]),
      new Room(roomsData[2])
    ];

    bookingPast = new Booking(bookingsData[0]);
    bookingPresent = new Booking(bookingsData[3], 3);
    bookingUpcoming = new Booking(bookingsData[4], 3);

    bookings = [ bookingPast, bookingPresent, bookingUpcoming ]

    customer1 = new Customer(customersData[0]);
    customer2 = new Customer(customersData[1]);
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instace of Booking', () => {
    expect(customer1).to.be.an.instanceOf(Customer);
  });

  it('should have an id', () => {
    expect(customer1.id).to.be.a('number');
    expect(customer1.id).to.equal(1);
  });

  it('should have a name', () => {
    expect(customer1.name).to.be.a('string');
    expect(customer1.name).to.equal('Leatha Ullrich');
    expect(customer2.name).to.equal('Rocio Schuster');
  });

  it('should have an empty array of bookings by default', () => {
    expect(customer1.bookings).to.be.an('array');
    expect(customer1.bookings).to.deep.equal([]);
  });

  it('should be able to get all its bookings', () => {
    customer1.getBookings(bookings);

    expect(customer1.bookings).to.be.an('array');
    expect(customer1.bookings[0]).to.be.an.instanceOf(Booking);
    expect(customer1.bookings[0]).to.deep.equal(bookingPast);
    expect(customer1.bookings.length).to.equal(3);

  });

  it('should be able to get their past bookings', () => {
    customer1.getBookings(bookings);
    const pastBookings = customer1.getPastBookings();

    expect(pastBookings).to.be.an('array');
    expect(pastBookings).to.deep.equal([ bookingPast ]);
    expect(pastBookings[0]).to.be.an.instanceOf(Booking);
    expect(pastBookings[0]).to.deep.equal(bookingPast);
  });

  it('should be return a message if no past bookings are found', () => {
    const expected = 'We couldn\'t find any past bookings.';
    const noBookingsMessage = customer2.getPastBookings();

    expect(noBookingsMessage).to.equal(expected);
  });

  it('should be able to get their current bookings', () => {
    customer1.getBookings(bookings);
    const presentBookings = customer1.getPresentBookings();

    expect(presentBookings).to.be.an('array');
    expect(presentBookings.length).to.equal(1);
    expect(presentBookings).to.deep.equal([ bookingPresent ]);
    expect(presentBookings[0]).to.be.an.instanceOf(Booking);
    expect(presentBookings[0]).to.deep.equal(bookingPresent);
  });

  it('should be return a message if no present bookings are found', () => {
    customer2.getBookings(bookings);
    const expected = 'We couldn\'t find any present bookings.';
    const noBookingsMessage = customer2.getPresentBookings();

    expect(noBookingsMessage).to.equal(expected);
  });

  it('should be able to get their upcoming bookings', () => {
    customer1.getBookings(bookings);
    const upcomingBookings = customer1.getUpcomingBookings();

    expect(upcomingBookings).to.be.an('array');
    expect(upcomingBookings).to.deep.equal([ bookingUpcoming ]);
    expect(upcomingBookings[0]).to.be.an.instanceOf(Booking);
    expect(upcomingBookings[0]).to.deep.equal(bookingUpcoming);
  });

  it('should be return a message if no upcoming bookings are found', () => {
    const expected = 'We couldn\'t find any upcoming bookings. Book your next adventure!';
    customer2.getBookings(bookings);
    const noBookingsMessage = customer2.getUpcomingBookings();

    expect(noBookingsMessage).to.equal(expected);
  });

  it('should be able to request new bookings', () => {
    const newRequests = customer1.returnBookingsRequest("2021/11/05", 3, 4);
    const expected = [
      { userID: 1, date: "2021/11/05", roomNumber: 4 },
      { userID: 1, date: "2021/11/06", roomNumber: 4 },
      { userID: 1, date: "2021/11/07", roomNumber: 4 }
    ]

    expect(newRequests).to.be.an('array');
    expect(newRequests).to.deep.equal(expected);
  })

})
