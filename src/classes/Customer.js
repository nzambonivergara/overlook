import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween)

class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings = [];
  }

  getBookings(bookings) {
    this.bookings = bookings.filter(booking => booking.userID === this.id)
  }

  getPastBookings() {
    const today = dayjs();

    const pastBookings = this.bookings.filter(booking => {
      const checkOut = dayjs(booking.checkInDate)
      .add(booking.duration, 'day');

      return checkOut.isBefore(today);
    }).map(booking => `Date: ${booking.checkInDate} Room Number: ${booking.roomNumber}`)

    if (pastBookings.length) {
      return pastBookings;
    } else {
      return ['We couldn\'t find any past bookings.']
    }
  }

  getPresentBookings() {
    const today = dayjs();

    const presentBookings = this.bookings.filter(booking => {
      const checkOut = dayjs(booking.checkInDate)
      .add(booking.duration, 'day')

      return today.isBetween(booking.checkInDate, checkOut)
    }).map(booking => `Date: ${booking.checkInDate} Room Number: ${booking.roomNumber}`)

    if (presentBookings.length) {
      return presentBookings;
    } else {
      return ['We couldn\'t find any present bookings.'];
    }
  }

  getUpcomingBookings() {
    const today = dayjs();

    const upcomingBookings = this.bookings.filter(booking => {
      return dayjs(booking.checkInDate).isAfter(today);
    }).map(booking => `Date: ${booking.checkInDate} Room Number: ${booking.roomNumber}`)

    if (upcomingBookings.length) {
      return upcomingBookings;
    } else {
      return ['We couldn\'t find any upcoming bookings. Book your next adventure!'];
    }
  }

  returnBookingsRequest(checkIn, numberOfNights, roomNumber) {
    const dates = [ dayjs(checkIn).format('YYYY/MM/DD') ];

    for (let i = 1; i < numberOfNights; i++) {
      const addDay = dayjs(checkIn)
      .add(i, 'day').format('YYYY/MM/DD')

      dates.push(addDay);
    }
  
    const bookings = dates.map(date => {
     return {
        userID: this.id,
        date: date,
        roomNumber: roomNumber
      };
    });

    return bookings;
  }

  calculateTotalSpent(rooms) {
    return this.bookings.reduce((acc, booking) => {
      acc += booking.calculateCost(rooms);
      return acc;
    }, 0)
  }
}

export default Customer;
