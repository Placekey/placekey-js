/**
 * Functionality for converting between Placekeys and
 * geos(latitude, longitude tuples) or h3 indices.
 *
 * This module also includes additional utilities related to Placekeys.
 */

/* eslint-disable */
// @ts-nocheck

import {h3ToGeo, geoToH3, h3ToGeoBoundary, h3Distance} from 'h3-js';

import {
  h3IntegerToString,
  stringToH3Integer,
  shortenH3Integer,
  unshortenH3Integer,
  h3IntegerToSafeInteger
} from './h3-integer';
import {addH3Integers} from './h3-integer';
import {scaleH3Integer} from './h3-integer';

const RESOLUTION = 10;
const BASE_RESOLUTION = 12;
const ALPHABET = '23456789bcdfghjkmnpqrstvwxyz';
const ALPHABET_LENGTH = ALPHABET.length;
const CODE_LENGTH = 9;
const TUPLE_LENGTH = 3;
const PADDING_CHAR = 'a';
const PADDING_REGEX = /a/g;
const REPLACEMENT_CHARS = 'eu';
const REPLACEMENT_MAP = {
  prn: 'pre',
  f4nny: 'f4nne',
  tw4t: 'tw4e',
  ngr: 'ngu', // 'u' avoids introducing 'gey'
  dck: 'dce',
  vjn: 'vju', // 'u' avoids introducing 'jew'
  fck: 'fce',
  pns: 'pne',
  sht: 'she',
  kkk: 'kke',
  fgt: 'fgu', // 'u' avoids introducing 'gey'
  dyk: 'dye',
  bch: 'bce'
};

const FIRST_TUPLE_REGEX = `[${ALPHABET}${REPLACEMENT_CHARS}${PADDING_CHAR}]{3}`;
const TUPLE_REGEX = `[${ALPHABET}${REPLACEMENT_CHARS}]{3}`;
const WHERE_REGEX = new RegExp(`^${[FIRST_TUPLE_REGEX, TUPLE_REGEX, TUPLE_REGEX].join('-')}$`);
const WHAT_REGEX = new RegExp(`^[${ALPHABET}]{3}(-[${ALPHABET}]{3})?$`);

// Boolean for whether or not a Placekey is valid.
export function placekeyIsValid(placekey) {
  if (typeof placekey !== 'string') {
    return false;
  }

  let what;
  let where;
  if (placekey.includes('@')) {
    [what, where] = placekey.split('@');
  } else {
    [what, where] = [null, placekey];
  }

  if (what) {
    return Boolean(where.match(WHERE_REGEX) && what.match(WHAT_REGEX));
  }
  return Boolean(where.match(WHERE_REGEX));
}

// Convert latitude and longitude into a Placekey
export function geoToPlacekey(lat, long) {
  const hexId = geoToH3(lat, long, (resolution = RESOLUTION));
  return h3ToPlacekey(hexId);
}

// Convert a Placekey into a (latitude, longitude) tuple
export function placekeyToGeo(placekey) {
  return h3ToGeo(placekeyToH3(placekey));
}

// Convert a Placekey string into an h3 string
export function placekeyToH3(placekey) {
  return h3IntegerToString(placekeyToH3Integer(placekey));
}

// Convert an h3 hexadecimal string into a Placekey string
export function h3ToPlacekey(h3index) {
  return h3IntegerToPlacekey(stringToH3Integer(h3index));
}

// Given a placekey, return the cooridnates of the boundary of the hexagon.
export function placekeyToHexBoundary(placekey, formatAsGeoJson) {
  return h3ToGeoBoundary(placekeyToH3(placekey), formatAsGeoJson);
}

export function placekeyDistance(placekey1, placekey2) {
  return h3Distance(placekeyToH3(placekey1), placekeyToH3(placekey2));
}

// Return a mapping of the length of a shared Placekey prefix to max distance in meters between two Placekeys
export function getPlacekeyPrefixDistanceDict() {
  return {
    1: 1.274e7,
    2: 2.777e6,
    3: 1.065e6,
    4: 1.524e5,
    5: 2.177e4,
    6: 8227.0,
    7: 1176.0,
    8: 444.3,
    9: 63.47
  };
}

// POTENTIALLY PUBLIC FUNCTIONS (IF H3 INTEGER SUPPORT IS PUBLIC)

/**
 * Convert an h3 integer into a Placekey
 * @param h3Integer: h3 index (int)
 * @return: Placekey (string)
 */
function h3IntegerToPlacekey(h3Integer) {
  const shortH3Integer = shortenH3Integer(h3Integer);
  const encodedShortH3 = encodeShortInt(shortH3Integer);

  let cleanEncodedShortH3 = cleanString(encodedShortH3);
  if (cleanEncodedShortH3.length <= CODE_LENGTH) {
    cleanEncodedShortH3 = cleanEncodedShortH3.padStart(CODE_LENGTH, PADDING_CHAR);
  }

  const cleanChars = cleanEncodedShortH3.split('');
  const tuples = [
    cleanChars.splice(0, TUPLE_LENGTH).join(''),
    cleanChars.splice(0, TUPLE_LENGTH).join(''),
    cleanChars.join('')
  ];
  return '@' + tuples.join('-');
}

/**
 * Convert a Placekey to an h3 integer
 * More precisely, Extract H3 integer from a placekey
 * @param {string} placekey
 * @return: h3 index (int)
 */
function placekeyToH3Integer(placekey) {
  const wherePart = getPlacekeyLocation(placekey);
  const code = stripEncoding(wherePart);
  const dirtyEncoding = dirtyString(code);
  const shortH3Integer = decodeString(dirtyEncoding);
  return unshortenH3Integer(shortH3Integer);
}

// HELPER FUNCTIONS

/**
 * Extract the part of a placekey string that encodes a hexagon id
 * @param {string} string
 * @returns {string}
 */
function getPlacekeyLocation(placekey) {
  return placekey.includes('@') ? placekey.split('@')[1] : placekey;
}

/**
 * Remove non-information carrying formatting characters from placekey string
 * @param {string} string
 * @returns {string}
 */
function stripEncoding(string) {
  return string
    .replace(/@/g, '')
    .replace(/-/g, '')
    .replace(PADDING_REGEX, '');
}

/**
 * Sanitize a placekey alphabet encoded string, removing potentially offensive letters
 * @param {string} string
 * @returns {string}
 */
function cleanString(string) {
  for (const [key, value] of Object.entries(REPLACEMENT_MAP)) {
    // TODO: May misencode due to JS replace/replaceAll
    string = string.replace(key, value);
  }
  return string;
}

/**
 * Revert sanitation of a placekey string to enable decoding
 * @param {string} string
 * @returns {string}
 */
function dirtyString(s) {
  for (const [key, value] of Object.entries(REPLACEMENT_MAP).reverse()) {
    // TODO: May misdecode due to JS replace/replaceAll
    s = s.replace(value, key);
  }
  return s;
}

const DECODE_OFFSETS = [
  [0x1, 0],
  [0x1c, 0],
  [0x310, 0],
  [0x55c0, 0],
  [0x96100, 0],
  [0x1069c00, 0],
  [0x1cb91000, 0],
  [0x243dc000, 0x3],
  [0xf6c10000, 0x57],
  [0xfd1c0000, 0x99e]
];

/**
 * Convert a placekey alphabet encoded string to an integer
 * @param {string} string
 * @returns {string}
 */
function decodeString(string) {
  let value = [0, 0];
  for (let i = 0; i < string.length; ++i) {
    const character = string[string.length - 1 - i];
    const indexOfCharacter = ALPHABET.indexOf(character);
    const offset = DECODE_OFFSETS[i];
    const valueOfCharacter = scaleH3Integer(indexOfCharacter, offset);
    addH3Integers(value, valueOfCharacter, value);
  }
  return value;
}

function encodeShortInt(x) {
  if (x === 0) {
    return ALPHABET[0];
  }

  let int = h3IntegerToSafeInteger(x);

  let result = '';
  while (int > 0) {
    const remainder = int % ALPHABET_LENGTH;
    result = ALPHABET[remainder] + result;
    int = Math.floor(int / ALPHABET_LENGTH);
  }
  return result;
}

// TEST EXPORTS

export {cleanString as _cleanString};
export {dirtyString as _dirtyString};
