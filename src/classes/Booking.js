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
      
    return room.costPerNight * this.duration;
  }

}

export default Booking;
