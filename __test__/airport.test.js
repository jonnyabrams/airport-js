const Airport = require('../src/airport');

describe('Airport', () => {
  const airport = new Airport;
  const plane = { name: 'Boeing 737' };
  const plane2 = { name: 'Airbus A330' };

  it('is an instance of the Airport class', () => {
    expect(airport).toBeInstanceOf(Airport);
  });

  it('has a capacity of 100 that can be overridden', () => {
    expect(airport.capacity).toEqual(100);
    const airport2 = new Airport(150);
    expect(airport2.capacity).toEqual(150);
  });

  describe('land', () => {
    it('lands a plane at the airport', () => {
      airport.land(plane);
      expect(airport.hangar.length).toEqual(1);
    });

    it('prevents landing when airport is full', () => {
      airport3 = new Airport;
      for (let i = 0; i < 100; i++) {
        airport3.land({});
      };
      expect(() => { airport3.land(plane2) }).toThrowError('Airport already at capacity');
      
      airport4 = new Airport (200);
      for (let i = 0; i < 200; i++) {
        airport4.land({});
      };
      expect(() => { airport4.land(plane2) }).toThrowError('Airport already at capacity');
    });
  });

  describe('takeOff', () => {
    it('takes off a plane from the airport', () => {
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