const Airport = require('../src/airport');

describe('Airport', () => {
  const airport = new Airport;

  it('is an instance of the Airport class', () => {
    expect(airport).toBeInstanceOf(Airport);
  });

});