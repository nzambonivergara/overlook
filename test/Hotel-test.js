import { expect } from 'chai';
import { roomsData } from './sample-data/rooms-sample';
import { bookingsData } from './sample-data/bookings-sample';
import { customersData } from './sample-data/customers-data'
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';
import Customer from '../src/classes/Customer';
import Hotel from '../src/classes/Hotel';

describe('Hotel', () => {
  let hotel;

  beforeEach(() => {
    hotel = new Hotel(roomsData, bookingsData, customersData);
  })

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instace of Booking', () => {
    expect(hotel).to.be.an.instanceOf(Hotel);
  });

  it('should have all rooms information', () => {
    expect(hotel.rooms).to.deep.equal(roomsData);
  });

  it('should have all bookings information', () => {
    expect(hotel.bookings).to.deep.equal(bookingsData);
  });

  it('should have all of its customers information', () => {
    expect(hotel.customers).to.deep.equal(customersData);
  });

  it('should be able to get all information for its rooms', () => {
    const expected = [
      new Room(roomsData[0]),
      new Room(roomsData[1]),
      new Room(roomsData[2]),
    ]
    hotel.getAllRooms();

    expect(hotel.rooms).to.deep.equal(expected);
    expect(hotel.rooms[0]).to.to.be.an.instanceOf(Room);
    expect(hotel.rooms[0]).to.deep.equal(expected[0]);
    expect(hotel.rooms[0].imageSrc).to.equal(expected[0].imageSrc);
  });

  it('should be able to get all bookings information', () => {
    const expected = [
      new Booking(bookingsData[0]),
      new Booking(bookingsData[1]),
      new Booking(bookingsData[2]),
      new Booking(bookingsData[3]),
      new Booking(bookingsData[4]),
    ]
    hotel.getAllBookings();

    expect(hotel.bookings).to.deep.equal(expected);
    expect(hotel.bookings[0]).to.to.be.an.instanceOf(Booking);
    expect(hotel.bookings[0]).to.deep.equal(expected[0]);
  });

  it('should be able to get all available rooms in a specific date period', () => {
    hotel.getAllRooms();
    hotel.getAllBookings();

    const availableRooms = hotel.getAvailableRooms('2021/10/05', 2);
    const rooms = [
      new Room(roomsData[0]),
      new Room(roomsData[1]),
      new Room(roomsData[2])
    ];

    expect(availableRooms).to.deep.equal(rooms);
  });

  it('should be able to filter rooms by type', () => {
    hotel.getAllRooms();
    const availableRooms = hotel.getAvailableRooms('2021/10/05', 2);

    const rooms = [
      new Room(roomsData[0]),
      new Room(roomsData[1]),
      new Room(roomsData[2])
    ];
    const suites = hotel.filterRoomsByType(availableRooms, 'suite');

    expect(suites).to.deep.equal([rooms[1]]);
  });

  it('should be able to add new bookings', () => {
    const newBookings = [
      {
        "id": "5fwrgu4i7k55hl6w8",
        "userID": 18,
        "date": "2020/01/12",
        "roomNumber": 5,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6wb",
        "userID": 16,
        "date": "2020/02/09",
        "roomNumber": 22,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6wc",
        "userID": 4,
        "date": "2020/02/05",
        "roomNumber": 23,
        "roomServiceCharges": []
      }
    ];

    const originalNumberOfBookings = hotel.bookings.length;
    hotel.addNewBookings(newBookings);
    const updatedNumberOfBookings = hotel.bookings.length;
    const booking = new Booking({
      "id": "5fwrgu4i7k55hl6wc",
      "userID": 4,
      "date": "2020/02/05",
      "roomNumber": 23,
      "roomServiceCharges": []
    })


    expect(originalNumberOfBookings).to.equal(5);
    expect(updatedNumberOfBookings).to.equal(8);
    expect(hotel.bookings[7]).to.deep.equal(booking)
  });
})
