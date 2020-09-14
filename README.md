# placekey-js

A JavaScript library for working with Placekeys.

## Usage

Note: Be careful to note that like the [H3](https://h3geo.org/) API, the placekey-js API use `latitude`, `longitude` order.

Failure to account of this order when interoperating with other geospatial software is a common source of errors, for more information see [lon lat lon lat](https://macwright.com/lonlat/).

```js
import {geoToPlacekey} from 'placekey';
const [lat, long] = [0.0, 0.0];
geoToPlacekey(lat, long); // => '@dpr-6q6-73q';
```

```js
import {placekeyToGeo} from 'placekey';
placekeyToGeo('@qjk-m7r-whq'); // => [-46.0033934397115, -155.09988163615031]
```

```js
import {placekeyToH3} from 'placekey';
placekeyToH3('@dpr-6q6-73q'); // => '8a754e64992ffff'
```

```js
import {h3ToPlacekey} from 'placekey';
h3ToPlacekey('8a754e64992ffff');
('@dpr-6q6-73q');
```

An upper bound on the maximal distance in meters between two Placekeys based on the length of their shared prefix is provided by `getPlacekeyPrefixDistanceDict()`.

```js
getPlacekeyPrefix_distance_dict()
{1: 12740000.0,
 2: 2777000.0,
 3: 1065000.0,
 4: 152400.0,
 5: 21770.0,
 6: 8227.0,
 7: 1176.0,
 8: 444.3,
 9: 63.47}
```

## Attribution

The placekey-js JavaScript library is provided and maintained by [Unfolded, Inc](https://unfolded.ai).

[![Unfolded](docs/unfolded-logo.png?raw=true)](https://unfolded.ai)
