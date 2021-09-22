import { expect } from 'chai';
import { roomsData } from './sample-data/rooms-sample';
import Room from '../src/classes/Room';

describe('Room', () => {
  let residentialSuite, suite, singleRoom;

  beforeEach(() => {
    residentialSuite = new Room(roomsData[0])
    suite = new Room(roomsData[1])
    singleRoom = new Room(roomsData[2])
  });

  it('should be a function', () => {
    expect(Room).to.be.a('function');
  });

  it('should be an instace of Room', () => {
    expect(suite).to.be.an.instanceOf(Room);
  });

  it('should have a number', () => {
    expect(residentialSuite.number).to.equal(1);
    expect(singleRoom.number).to.equal(3);
  });

  it('should have a type', () => {
    expect(suite.roomType).to.equal('suite');
    expect(singleRoom.roomType).to.equal('single room');
  });

  it('should be able to have a bidet', () => {
    expect(residentialSuite.hasBidet).to.be.true;
    expect(suite.hasBidet).to.be.false;
  });

  it('should have a bedSize', () => {
    expect(residentialSuite.bedSize).to.equal('queen');
    expect(suite.bedSize).to.equal('full');
    expect(singleRoom.bedSize).to.equal('king');
  });

  it('should have a number of beds', () => {
    expect(residentialSuite.numBeds).to.equal(1);
    expect(suite.numBeds).to.equal(2);
    expect(singleRoom.numBeds).to.equal(1);
  });

  it('should store a cost per night', () => {
    expect(residentialSuite.costPerNight).to.equal(358.4);
    expect(suite.costPerNight).to.equal(477.38);
    expect(singleRoom.costPerNight).to.equal(491.14);
  });

  it('should be able to return an image based on its bed size', () => {
    const fullBed = residentialSuite.returnImageSrc();

    expect(fullBed).to.equal('./images/queen-bed.jpg');
  });

  it('should have a property that stores that image source', () => {
    const fullBed = residentialSuite.returnImageSrc();

    expect(singleRoom.imageSrc).to.equal('./images/king-bed.jpg');
  });
})
