const Airport = require('../src/airport');

describe('Airport', () => {
  const airport = new Airport;
  const plane = { name: 'Boeing 737' }

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

    it('confirms the plane has taken off', () => {
      airport.land(plane);
      console.log = jest.fn();
      airport.takeOff(plane);
      expect(console.log).toHaveBeenCalledWith('Plane Boeing 737 has taken off successfully');
    });
  });

});