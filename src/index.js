export {
  placekeyIsValid,
  geoToPlacekey,
  placekeyToGeo,
  placekeyToH3,
  h3ToPlacekey,
  getPlacekeyPrefixDistanceDict,
  placekeyToHexBoundary,
  placekeyDistance
} from './lib/placekey';

export {
  h3IntegerToString as _h3IntegerToString,
  stringToH3Integer as _stringToH3Integer,
  shortenH3Integer as _shortenH3Integer,
  unshortenH3Integer as _unshortenH3Integer,
  leftShiftH3Integer as _leftShiftH3Integer,
  rightShiftH3Integer as _rightShiftH3Integer,
  orH3Integers as _orH3Integers,
  maskLeftBits as _maskLeftBits,
  addH3Integers as _addH3Integers,
  subtractH3Integers as _subtractH3Integers,
  scaleH3Integer as _scaleH3Integer
} from './lib/h3-integer';

// TEST EXPORTS
export {_cleanString, _dirtyString} from './lib/placekey';
