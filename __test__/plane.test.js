const Plane = require('../src/plane');

describe('Plane', () => {
  const plane = new Plane('Boeing 737');

  it('has a name', () => {
    expect(plane.name).toEqual('Boeing 737');
  });

  it('is in the air by default', () => {
    expect(plane.isLanded).toEqual(false);
  });

  it('has an airport that is blank by default', () => {
    expect(plane.airport).toEqual('');
  });
});