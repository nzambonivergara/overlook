class Booking {
  constructor(booking, duration) {
    this.id = booking.id;
    this.userID = booking.userID;
    this.checkInDate = booking.date;
    this.duration = duration || 1;
    this.roomNumber = booking.roomNumber;
    this.roomServiceCharges = []
  }

  calculateCost(rooms) {
    const room = rooms.find(room =>  this.roomNumber === room.number);
    console.log(room.costPerNight)
    const totalCost = room.costPerNight * this.duration;
    return totalCost;
  }

}

export default Booking;
