// Placekey tests

// These tests were ported from python, so disable overly Python-unfriendly linter rules
/* eslint-disable dot-notation, camelcase */

import test from 'tape-promise/tape';
import {assertAlmostEqual} from './utils/assertions';

import {
  geoToPlacekey,
  placekeyToGeo,
  placekeyToH3,
  h3ToPlacekey,
  // getPlacekeyPrefixDistanceDict,
  // placekeyToHexBoundary,
  placekeyIsValid,
  placekeyDistance,
  _cleanString,
  _dirtyString
} from 'placekey-js';

import SAMPLES from './data/example_geos.json';
import DISTANCE_SAMPLES from './data/example_distances.json';

// from ..placekey import _clean_string, _dirty_string

// class TestPlacekey(unittest.TestCase):
//     def setUp(self):
//         def parse(line):
//             tokens = line.split(',')
//             return {
//                 'lat': float(tokens[0]),
//                 'long': float(tokens[1]),
//                 'h3_r10': tokens[2],
//                 'h3_int_r10': int(tokens[3]),
//                 'placekey': tokens[4],
//                 'h3_lat': float(tokens[5]),
//                 'h3_long': float(tokens[6]),
//                 'info': tokens[7]
//             }

/*
        with open('placekey/tests/example_geos.csv', 'r') as f:
            next(f)  # skip header
            self.sample = [parse(l.strip()) for l in f.readlines()]

        def parse_distances(line):
            tokens = line.split('\t')
            return {
                'placekey_1': tokens[0],
                'geo_1': [float(x) for x in tokens[1][1:-1].split(',')],
                'placekey_2': tokens[2],
                'geo_2': [float(x) for x in tokens[3][1:-1].split(',')],
                'distance': float(tokens[4]),
            }

        with open('placekey/tests/example_distances.csv') as f:
            next(f)  # skip header
            DISTANCE_SAMPLES = [parse_distances(l.strip())
                                     for l in f.readlines()]
  t.end();
});
*/

test.skip('stringCleaning', t => {
  /*
  for bw, replacement in REPLACEMENT_MAP:
      t.equal(
          _dirty_string(_clean_string(bw)), bw,
          'dirty(clean()) not an identity mapping for {}'.format(bw))
      t.equal(
          _clean_string(_dirty_string(replacement)), replacement,
          'clean(dirty()) not an identity mapping for {}'.format(replacement))
  */

  t.equal(_cleanString('vjngr'), 'vjugu', 'clean overlapping bad words out of sequence order');
  t.equal(_dirtyString('vjugu'), 'vjngr', 'dirty overlapping bad words out of sequence order');

  t.equal(_cleanString('prngr'), 'pregr', 'clean overlapping bad words in sequence order');
  t.equal(_dirtyString('pregr'), 'prngr', 'dirty overlapping bad words in sequence order');
  t.end();
});

test('placekeyIsValid', t => {
  t.ok(placekeyIsValid('abc-234-xyz'), 'where with no @');
  t.ok(placekeyIsValid('@abc-234-xyz'), 'where with @');
  t.ok(placekeyIsValid('bcd-2u4-xez'), 'where with no replacement characters');
  t.ok(placekeyIsValid('zzz@abc-234-xyz'), 'single tuple what with where');
  t.ok(placekeyIsValid('222-zzz@abc-234-xyz'), 'double tuple what with where');

  t.notOk(placekeyIsValid('@abc'), 'short where part');
  t.notOk(placekeyIsValid('abc-xyz'), 'short where part');
  t.notOk(placekeyIsValid('abcxyz234'), 'no dashes');
  t.notOk(placekeyIsValid('abc-345@abc-234-xyz'), 'padding character in what');
  t.notOk(placekeyIsValid('ebc-345@abc-234-xyz'), 'replacement character in what');
  t.notOk(placekeyIsValid('bcd-345@'), 'missing what part');
  t.notOk(placekeyIsValid('22-zzz@abc-234-xyz'), 'short what part');
  t.end();
});

test('placekeyToH3', t => {
  for (const row of SAMPLES) {
    t.equal(
      placekeyToH3(row['placekey']),
      row['h3_r10'],
      `converted placekey (${row['placekey']}) did not match h3 at resolution 10 (${row['h3_r10']})`
    );
  }
  t.end();
});

test('placekeyToGeo', t => {
  const matching_places = 3;
  for (const row of SAMPLES) {
    const [lat, long] = placekeyToGeo(row['placekey']);
    assertAlmostEqual(
      t,
      lat,
      row['h3_lat'],
      matching_places,
      `placekey's latitude (${lat}) too far from associated geo's latitude (${row['h3_lat']})`
    );
    assertAlmostEqual(
      t,
      long,
      row['h3_long'],
      matching_places,
      `placekey's longitude (${long}) too far from associated geo's longitude (${row['h3_long']})`
    );
  }
  t.end();
});

test.skip('h3ToPlacekey', t => {
  for (const row of SAMPLES) {
    t.equal(
      h3ToPlacekey(row['h3_r10']),
      row['placekey'],
      'converted h3 ({}) did not match placekey ({})'
      // .format(
      //   h3ToPlacekey(row['h3_r10']),
      //   row['placekey']
      // )
    );
  }
  t.end();
});

test.skip('geoToPlacekey', t => {
  for (const row of SAMPLES) {
    const placekey = geoToPlacekey(row['lat'], row['long']);
    t.equal(
      placekey,
      row['placekey'],
      'converted geo ({}, {}) did not match placekey ({})'
      // .format(
      //   row['lat'],
      //   row['long'],
      //   row['placekey']
      // )
    );
  }
  t.end();
});

test.skip('placekeyToHexBoundary', t => {
  /*
  const key = '@5vg-7gq-tvz';
  const h3_integer = placekey_to_h3_int(key);
  t.deepEqual(
    placekeyToHexBoundary(key, (geo_json = True)),
    h3_int.h3_to_geo_boundary(h3_integer, (geo_json = True)),
    'placekey boundary equal to h3 boundary (geo_json=True)'
  );
  t.deepEqual(
    placekeyToHexBoundary(key, (geo_json = False)),
    h3_int.h3_to_geo_boundary(h3_integer, (geo_json = False)),
    'placekey boundary equal to h3 boundary (geo_json=False)'
  );
  */
  t.end();
});

test.skip('placekeyDistance', t => {
  t.equal(
    placekeyDistance(geoToPlacekey(0.0, 0.0), geoToPlacekey(0.0, 0.0)),
    0.0,
    'identical points have distance 0'
  );

  for (const sample of DISTANCE_SAMPLES) {
    const difference = Math.abs(
      placekeyDistance(sample['placekey_1'], sample['placekey_2']) - sample['distance']
    );
    t.assertLessEqual(difference, 0.1, 'distances too far apart');
  }

  t.end();
});
