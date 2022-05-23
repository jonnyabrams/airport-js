class Airport {
  constructor(capacity = 100) {
    this.hangar = [];
    this.capacity = capacity;
  }

  land(plane) {
    if (this.hangar.length === this.capacity) throw new Error ('Airport already at capacity');
    
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