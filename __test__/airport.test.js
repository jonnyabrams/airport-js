const Airport = require('../src/airport');

describe('Airport', () => {
  const stormyWeather = { outlook: 'stormy' }
  const sunnyWeather = { outlook: 'sunny' }
  const airport = new Airport('Heathrow', sunnyWeather);
  const airport2 = new Airport('London City', sunnyWeather, 150);
  const airport3 = new Airport('Stanstead', sunnyWeather);
  const airport4 = new Airport('Luton', sunnyWeather, 200);
  const airportStormy = new Airport('Gatwick', stormyWeather);
  const plane = { name: 'Boeing 737' };
  const plane2 = { name: 'Airbus A330' };
  const plane3 = { name: 'CRJ Series' }

  it('is an instance of the Airport class', () => {
    expect(airport).toBeInstanceOf(Airport);
  });

  it('has a capacity of 100 that can be overridden', () => {
    expect(airport.capacity).toEqual(100);
    expect(airport2.capacity).toEqual(150);
  });

  describe('land', () => {
    it('lands a plane at the airport', () => {
      airport.land(plane);
      expect(airport.hangar.length).toEqual(1);
    });

    it('updates the airport of the plane', () => {
      expect(plane.airport).toEqual('Heathrow');
    });

    it('updates the landed status of the plane', () => {
      expect(plane.isLanded).toEqual(true);
    });

    it('cannot land if it is already landed', () => {
      expect(() => { airport.land(plane) }).toThrowError('Plane has already landed');
    });

    it('is not allowed in stormy weather', () => {
      expect(() => { airportStormy.land(plane2) }).toThrowError('Cannot land due to stormy weather');
    });

    it('prevents landing when airport is full', () => {
      for (let i = 0; i < 100; i++) {
        airport3.land({});
      };
      expect(() => { airport3.land(plane2) }).toThrowError('Airport already at capacity');
      
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

    it('does not let a plane take off if it has already taken off', () => {
      expect(() => { airport.takeOff(plane) }).toThrowError('Plane has already taken off');
    });

    it('only allows a plane to take off from an airport it is in', () => {
      airport2.land(plane);
      expect(() => { airport3.takeOff(plane) }).toThrowError('Plane cannot take off from this airport');
    });

    it('confirms the plane has taken off', () => {
      airport2.takeOff(plane);
      airport.land(plane);
      console.log = jest.fn();
      airport.takeOff(plane);
      expect(console.log).toHaveBeenCalledWith('Plane Boeing 737 has taken off successfully');
    });

    it('updates the airport of the plane', () => {
      expect(plane.airport).toEqual('');
    });

    it('updates the landed status of the plane', () => {
      expect(plane.isLanded).toEqual(false);
    });

    it('does not allow a plane to take off in stormy weather', () => {
      expect(() => { airportStormy.takeOff(plane3) }).toThrowError('Cannot take off due to stormy weather');
    });
  });

});