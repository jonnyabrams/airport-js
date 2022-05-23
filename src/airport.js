const Weather = require('./weather');

class Airport {
  constructor(name, capacity = 100, weather = new Weather) {
    this.hangar = [];
    this.name = name;
    this.capacity = capacity;
    this.weather = weather;
  }

  land(plane) {
    this.#landChecklist(plane);
    this.hangar.push(plane);
    this.#landMessage(plane);
  }

  takeOff(plane) {
    this.#takeOffChecklist(plane);
    this.hangar = this.hangar.filter((landedPlane) => {
      landedPlane !== plane;
    });

    this.#takeOffMessage(plane);
  }

  #landChecklist(plane) {
    if (this.weather.outlook === 'stormy') throw new Error ('Cannot land due to stormy weather');

    if (this.hangar.length === this.capacity) throw new Error ('Airport already at capacity');

    if (plane.isLanded === true) throw new Error ('Plane has already landed');

    plane.airport = this.name;
    plane.isLanded = true;
  }

  #takeOffChecklist(plane) {
    if (this.weather.outlook === 'stormy') throw new Error ('Cannot take off due to stormy weather');

    if (plane.isLanded === false) throw new Error ('Plane has already taken off');

    if (plane.airport !== this.name) throw new Error ('Plane cannot take off from this airport');

    plane.airport = '';
    plane.isLanded = false;
  }

  #landMessage(plane) {
    console.log(`Plane ${plane.name} has landed at ${this.name}`);
  }

  #takeOffMessage(plane) {
    console.log(`Plane ${plane.name} has taken off successfully`);
  }
}

module.exports = Airport;