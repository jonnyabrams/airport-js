class Weather {
  constructor() {
    this.outlook = Math.floor((Math.random() * 10) + 1) === 1 ? 'stormy' : 'sunny';
  }
}

module.exports = Weather;