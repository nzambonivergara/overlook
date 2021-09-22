import { expect } from 'chai';
import { roomsData } from './sample-data/rooms-sample';
import { bookingsData } from './sample-data/bookings-sample';
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';

describe('Bookings', () => {
  let booking1, booking2, booking3;
  let rooms;

  beforeEach(() => {
    rooms = [
      new Room(roomsData[0]),
      new Room(roomsData[1]),
      new Room(roomsData[2])
    ];

    booking1 = new Booking(bookingsData[0]);
    booking2 = new Booking(bookingsData[1]);
    booking3 = new Booking(bookingsData[2] , 3);
  });

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should be an instace of Booking', () => {
    expect(booking1).to.be.an.instanceOf(Booking);
  });

  it('should have an id', () => {
    expect(booking1.id).to.be.a('string')
    expect(booking1.id).to.equal('5fwrgu4i7k55hl6t8');
  });

  it('should store a userID', () => {
    expect(booking2.userID).to.be.a('number');
    expect(booking1.userID).to.equal(1);
    expect(booking2.userID).to.equal(36);
  });

  it('should store a check in date', () => {
    expect(booking1.checkInDate).to.be.a('string');
    expect(booking2.checkInDate).to.equal("2020/01/25");
    expect(booking3.checkInDate).to.equal("2020/01/10");
  });

  it('should have a roomNumber', () => {
    expect(booking1.roomNumber).to.be.a('number');
    expect(booking2.roomNumber).to.equal(2);
    expect(booking3.roomNumber).to.equal(3);
    expect(booking2.roomNumber).to.be.within(1, 25);
  });

  it('should start off with an empty array of room services', () => {
    expect(booking1.roomServiceCharges).to.deep.equal([]);
  });

  it('should have stay duration of 1 by default', () => {
    expect(booking1.duration).to.equal(1);
    expect(booking2.duration).to.equal(1);
  });

  it('should be able to have a different stay duration', () => {
    expect(booking3.duration).to.equal(3);
  });

  it('should be able to return its cost based on roomNumber and duration', () => {
    const booking1Cost = booking1.calculateCost(rooms);
    const booking3Cost = booking3.calculateCost(rooms);

    expect(booking1Cost).to.equal(358.4);
    expect(booking3Cost).to.equal(1473.42);
  })

});
