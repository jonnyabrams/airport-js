# Airport (JavaScript)

After finishing the Makers Academy boot camp I was keen to consolidate what I'd learned by revisiting some of TDD exercises they set us and doing them in JavaScript instead of Ruby. This one is an for an airport that can land and take off planes, providing the weather's up to it...

## User Stories

```
As an air traffic controller 
So I can get passengers to a destination 
I want to instruct a plane to land at an airport
```

```
As an air traffic controller 
So I can get passengers on the way to their destination 
I want to instruct a plane to take off from an airport and confirm that it is no longer in the airport
```

```
As an air traffic controller 
To ensure safety 
I want to prevent landing when the airport is full 
```

```
As the system designer
So that the software can be used for many different airports
I would like a default airport capacity that can be overridden as appropriate
```

```
As an air traffic controller 
To ensure safety 
I want to prevent takeoff when weather is stormy 
```

```
As an air traffic controller 
To ensure safety 
I want to prevent landing when weather is stormy 
```

## Instructions for Use

* Clone this repo
* Install nvm and Node
* Move into the project directory, then into the src folder
* Run the command `node` to initiate the REPL and then load the application with `.load script.js`
* To run the tests, install Jest with `npm install jest` then run simply `jest`
* To see test coverage, run `jest --coverage`

## Example of Use in Terminal

First I open the Node.js REPL and load a script in which I've instantiated a handful of airports and planes:

```
➜  src git:(main) ✗ node
Welcome to Node.js v17.8.0.
Type ".help" for more information.
> .load script.js
const Airport = require('./airport');
const Plane = require('./plane');

const heathrow = new Airport('Heathrow');
const gatwick = new Airport('Gatwick');
const luton = new Airport('Luton');
const boeing = new Plane('Boeing 737');
const airbus = new Plane('Airbus A330');
const bombardier = new Plane('Bombardier CRJ');
```

Then I try to land the Boeing at Heathrow, which prompts a custom error message as my random weather generator has plunged Heathrow into inclement conditions:

```
> heathrow.land(boeing)
Uncaught Error: Cannot land due to stormy weather
    at Airport.#landChecklist (/Users/jonnyabrams/Projects/airport-js/src/airport.js:27:50)
    at Airport.land (/Users/jonnyabrams/Projects/airport-js/src/airport.js:12:24)
```

Fortunately the Boeing is able to land at Gatwick without a hitch, as confirmed with a console.log: 

```
> gatwick.land(boeing)
Plane Boeing 737 has landed at Gatwick
undefined
```

It promptly takes off again:

```
> gatwick.takeOff(boeing)
Plane Boeing 737 has taken off successfully
undefined
```

For the purposes of this program, planes are airborne by default, constructed with an isLanded property of 'false' and an empty string as an airport:

```
> airbus
Plane { name: 'Airbus A330', isLanded: false, airport: '' }
```

When they land, these properties are updated:

```
> luton.land(airbus)
Plane Airbus A330 has landed at Luton
> airbus
Plane { name: 'Airbus A330', isLanded: true, airport: 'Luton' }
```

Ditto for when they take off:

```
> luton.takeOff(airbus)
Plane Airbus A330 has taken off successfully
undefined
> airbus
Plane { name: 'Airbus A330', isLanded: false, airport: '' }
```

Is it still stormy at Heathrow?

```
> heathrow.land(bombardier)
Uncaught Error: Cannot land due to stormy weather
    at Airport.#landChecklist (/Users/jonnyabrams/Projects/airport-js/src/airport.js:27:50)
    at Airport.land (/Users/jonnyabrams/Projects/airport-js/src/airport.js:12:24)
```

Yes it is. Let's take the Bombardier to Gatwick instead:

```
> gatwick.land(bombardier)
Plane Bombardier CRJ has landed at Gatwick
undefined
```

Can we land it there again (edge case alert)?

```
> gatwick.land(bombardier)
Uncaught Error: Plane has already landed
    at Airport.#landChecklist (/Users/jonnyabrams/Projects/airport-js/src/airport.js:31:40)
    at Airport.land (/Users/jonnyabrams/Projects/airport-js/src/airport.js:12:24)
```

Of course not, that would be silly. How about landing it somewhere else?

```
> luton.land(bombardier)
Uncaught Error: Plane has already landed
    at Airport.#landChecklist (/Users/jonnyabrams/Projects/airport-js/src/airport.js:31:40)
    at Airport.land (/Users/jonnyabrams/Projects/airport-js/src/airport.js:12:24)
```

Nope, it's already landed at Gatwick! Let's get the Boeing in there too:

```
> gatwick.land(boeing)
Plane Boeing 737 has landed at Gatwick
undefined
> gatwick
Airport {
  hangar: [
    Plane {
      name: 'Bombardier CRJ',
      isLanded: true,
      airport: 'Gatwick'
    },
    Plane { name: 'Boeing 737', isLanded: true, airport: 'Gatwick' }
  ],
  name: 'Gatwick',
  capacity: 100,
  weather: Weather { outlook: 'sunny' }
}
```

How about taking off a plane that's already taken off?

```
> gatwick.takeOff(boeing)
Plane Boeing 737 has taken off successfully
undefined
> gatwick.takeOff(boeing)
Uncaught Error: Plane has already taken off
    at Airport.#takeOffChecklist (/Users/jonnyabrams/Projects/airport-js/src/airport.js:40:41)
    at Airport.takeOff (/Users/jonnyabrams/Projects/airport-js/src/airport.js:18:27)
```

Can't do that either. Edge cases handled!

Finally, an example of overriding the default airport capacity of 100:

```
> const stanstead = new Airport('Stanstead', 200)
undefined
> stanstead
Airport {
  hangar: [],
  name: 'Stanstead',
  capacity: 200,
  weather: Weather { outlook: 'sunny' }
}
```