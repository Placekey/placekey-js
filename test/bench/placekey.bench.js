/**
 * Light benchmark suite for placekey-js
 */

const {Bench} = require('@probe.gl/bench');

import {
  placekeyToGeo,
  geoToPlacekey,
  placekeyToHexBoundary,
  placekeyIsValid
} from '@placekey/placekey';
import SAMPLES from '../data/example_geos.json';

const suite = new Bench({
  minIterations: 10
});

suite.add('geoToPlacekey (100 rows)', () => {
  for (const row of SAMPLES) {
    geoToPlacekey(row.lat, row.long);
  }
});

suite.add('placekeyToGeo (100 rows)', () => {
  for (const row of SAMPLES) {
    placekeyToGeo(row.placekey);
  }
});

suite.add('placekeyToHexBoundary (100 rows)', () => {
  for (const row of SAMPLES) {
    placekeyToHexBoundary(row.placekey);
  }
});

suite.add('placekeyIsValid (100 rows)', () => {
  for (const row of SAMPLES) {
    placekeyIsValid(row.placekey);
  }
});

suite.run();
