const Weather = require('../src/weather');

describe('Weather', () => {
  const weather = new Weather;
  it('has an outlook', () => {
  expect(() => { weather.outlook }).not.toThrowError()
  });
});