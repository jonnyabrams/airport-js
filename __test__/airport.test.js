const Airport = require('../src/airport');

describe('Airport', () => {
  const airport = new Airport;
  const plane = {}

  it('is an instance of the Airport class', () => {
    expect(airport).toBeInstanceOf(Airport);
  });

  describe('land', () => {
    it('lands a plane at the airport', () => {
      airport.land(plane);
      expect(airport.hangar.length).toEqual(1);
    });
  });

  describe('takeOff', () => {
    it('takes off a plane from the airport', () => {
      console.log(airport.hangar)
      airport.takeOff(plane);
      expect(airport.hangar.length).toEqual(0);
    });
  });

});