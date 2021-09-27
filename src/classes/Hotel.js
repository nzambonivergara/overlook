import Room from './Room';
import Booking from './Booking';
import Customer from './Customer';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween)

class Hotel {
  constructor(roomsData, bookingsData, customersData) {
    this.rooms = roomsData;
    this.bookings = bookingsData;
    this.customers = customersData;
  }

  getAllRooms() {
    this.rooms = this.rooms.map(room => new Room(room));
  }

  getAllBookings() {
    this.bookings = this.bookings.map(booking => new Booking(booking));
  }

  getAvailableRooms(checkIn, duration) {
    return this.rooms.filter(room => {
      const bookingWithThisRoom = this.bookings.find(booking => {
        const checkOut = dayjs(checkIn)
        .add(duration, 'day');

        return booking.roomNumber === room.number && dayjs(booking.checkInDate).isBetween(checkIn, checkOut, null, '[]')
      });

      return !bookingWithThisRoom;
    })
  }

  filterRoomsByType(rooms, type) {
    return rooms.filter(room => room.roomType === type);
  }

  addNewBookings(newBookings) {
    const bookings = newBookings.map(booking => new Booking(booking));
    this.bookings = this.bookings.concat(bookings);
  }

}

export default Hotel;
