class Airport {
  constructor() {
    this.hangar = [];
  }

  land(plane) {
    this.hangar.push(plane);
  }

  takeOff(plane) {
    this.hangar = this.hangar.filter((landedPlane) => {
      landedPlane !== plane;
    });

    console.log(`Plane ${plane.name} has taken off successfully`);
  }
}

module.exports = Airport;