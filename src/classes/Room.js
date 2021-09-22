class Room {
  constructor(room) {
    this.number = room.number;
    this.roomType = room.roomType;
    this.hasBidet = room.bidet;
    this.bedSize = room.bedSize;
    this.numBeds = room.numBeds;
    this.costPerNight = room.costPerNight;
    this.imageSrc = this.returnImageSrc()
  }

  returnImageSrc() {
    return `./images/${this.bedSize}-bed.jpg`;
  }
}

export default Room;
