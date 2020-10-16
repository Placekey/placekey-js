# @placekey/placekey

[![npm version](https://badge.fury.io/js/%40placekey%2Fplacekey.svg)](https://badge.fury.io/js/%40placekey%2Fplacekey)

A JavaScript library for working with [Placekeys](https://placekey.io).

The source code for this library can be found [here](https://github.com/placekey/placekey-js/), and documentation for the Placekey service API can be found [here](https://docs.placekey.io/). The Plackey design specification is available [here](https://docs.placekey.io/Placekey_Technical_White_Paper.pdf). The details in Placekey encoding is [here](https://docs.placekey.io/Placekey_Encoding_Specification%20White_Paper.pdf). We welcome your feedback.

To install:

```
npm install @placekey/placekey
```

Or with yarn:

```
yarn add @placekey/placekey
```

## Usage

Note: Be careful to note that like the [H3](https://h3geo.org/) API, the placekey-js API use `latitude`, `longitude` order.

Failure to account of this order when interoperating with other geospatial software is a common source of errors, for more information see [lon lat lon lat](https://macwright.com/lonlat/).

```js
import {geoToPlacekey} from '@placekey/placekey';
const [lat, long] = [0.0, 0.0];
geoToPlacekey(lat, long); // => '@dvt-smp-tvz';
```

```js
import {placekeyToGeo} from '@placekey/placekey';
placekeyToGeo('@qjk-m7r-whq'); // => [-46.0033934397115, -155.09988163615031]
```

```js
import {placekeyToH3} from '@placekey/placekey';
placekeyToH3('@dpr-6q6-73q'); // => '8a734e64992ffff'
```

```js
import {h3ToPlacekey} from '@placekey/placekey';
h3ToPlacekey('8a734e64992ffff');
('@dpr-6q6-73q');
```

An upper bound on the maximal distance in meters between two Placekeys based on the length of their shared prefix is provided by `getPlacekeyPrefixDistanceDict()`.

```json
{
  1: 12740000.0,
  2: 2777000.0,
  3: 1065000.0,
  4: 152400.0,
  5: 21770.0,
  6: 8227.0,
  7: 1176.0,
  8: 444.3,
  9: 63.47
}
```

## Contributing

To build and test:

```sh
yarn bootstrap # install and build
yarn test # run tests
```

To run benchmarks:

```sh
yarn bench
```

PRs should include tests and, if necessary, documentation updates. To make sure non-trivial PRs will be accepted, consider opening an issue first and describe the changes you want to make before completing the work.

## License and Attribution

Provided as open source under the Apache 2 license.

The placekey-js JavaScript library is provided and maintained by [Unfolded, Inc](https://unfolded.ai).

[![Unfolded](docs/unfolded-logo.png?raw=true)](https://unfolded.ai)
