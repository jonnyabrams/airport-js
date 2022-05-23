class Weather {
  constructor() {
    this.outlook = Math.floor((Math.random() * 5) + 1) === 1 ? 'stormy' : 'sunny';
  }
}

module.exports = Weather;