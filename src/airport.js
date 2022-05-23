const Weather = require('./weather');

class Airport {
  constructor(name, weather = new Weather, capacity = 100) {
    this.hangar = [];
    this.name = name;
    this.capacity = capacity;
    this.weather = weather;
  }

  land(plane) {
    if (this.weather.outlook === 'stormy') throw new Error ('Cannot land due to stormy weather');

    if (this.hangar.length === this.capacity) throw new Error ('Airport already at capacity');

    plane.airport = this.name;
    plane.isLanded = true;
    this.hangar.push(plane);
  }

  takeOff(plane) {
    if (this.weather.outlook === 'stormy') throw new Error ('Cannot take off due to stormy weather');

    this.hangar = this.hangar.filter((landedPlane) => {
      landedPlane !== plane;
    });

    console.log(`Plane ${plane.name} has taken off successfully`);
  }
}

module.exports = Airport;