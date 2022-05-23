const Plane = require('../src/plane');

describe('Plane', () => {
  plane = new Plane('Boeing 737')

  it('has a name', () => {
    expect(plane.name).toEqual('Boeing 737');
  });
});