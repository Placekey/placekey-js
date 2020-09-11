# Placekey

A JavaScript library for working with Placekeys.

## Usage

```js
import {geoToPlacekey} from 'placekey';
const [lat, long] = [0.0, 0.0];
geoToPlacekey(lat, long); // => '@dpr-6q6-73q';
```

```js
import {placekeyToGeo} from 'placekey';
placekeyToGeo('@dpr-6q6-73q'); // => [0.00018033323813810344, -0.00018985758738881587]
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

The placekey-js JavaScript library is provided and maintained by Unfolded, Inc.

![Unfolded](https://github.com/SafegraphInc/placekey-js/blob/master/docs/unfolded-logo.png?raw=true)
![Unfolded](docs/unfolded-logo.png?raw=true)
