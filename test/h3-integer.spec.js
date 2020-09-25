import test from 'tape-promise/tape';

import {
  _h3IntegerToString,
  _stringToH3Integer,
  _shortenH3Integer,
  _unshortenH3Integer,
  _leftShiftH3Integer,
  _rightShiftH3Integer,
  _orH3Integers,
  _maskLeftBits,
  _addH3Integers,
  _subtractH3Integers,
  _scaleH3Integer,
  _h3IntegerToJSInteger
} from 'placekey-js';

test('exports', t => {
  t.ok(_shortenH3Integer);
  t.ok(_unshortenH3Integer);
  t.ok(_leftShiftH3Integer);
  t.ok(_rightShiftH3Integer);
  t.ok(_orH3Integers);
  t.ok(_maskLeftBits);
  t.ok(_addH3Integers);
  t.ok(_subtractH3Integers);
  t.ok(_scaleH3Integer);
  t.ok(_h3IntegerToJSInteger);
  t.end();
});

test('string to integer', t => {
  const hexId = '872830828ffffff';

  t.equal(_h3IntegerToString(_stringToH3Integer(hexId)), hexId, 'roundtrip conversion works');
  t.end();
});

test('_leftShiftH3Integer', t => {
  t.equal(_h3IntegerToString(_leftShiftH3Integer(_stringToH3Integer('0'), 1)), '0');
  t.equal(_h3IntegerToString(_leftShiftH3Integer(_stringToH3Integer('1'), 1)), '2');
  t.equal(_h3IntegerToString(_leftShiftH3Integer(_stringToH3Integer('8000000'), 4)), '80000000');
  t.equal(_h3IntegerToString(_leftShiftH3Integer(_stringToH3Integer('8000000'), 5)), '100000000');
  t.equal(_h3IntegerToString(_leftShiftH3Integer(_stringToH3Integer('8000001'), 5)), '100000020');
  t.equal(_h3IntegerToString(_leftShiftH3Integer(_stringToH3Integer('100000001'), 2)), '400000004');
  t.end();
});

test('_rightShiftH3Integer', t => {
  t.equal(_h3IntegerToString(_rightShiftH3Integer(_stringToH3Integer('0'), 1)), '0');
  t.equal(_h3IntegerToString(_rightShiftH3Integer(_stringToH3Integer('2'), 1)), '1');
  t.equal(_h3IntegerToString(_rightShiftH3Integer(_stringToH3Integer('8000000'), 4)), '800000');
  t.equal(_h3IntegerToString(_rightShiftH3Integer(_stringToH3Integer('100000001'), 2)), '40000000');
  t.equal(
    _h3IntegerToString(_rightShiftH3Integer(_stringToH3Integer('1100000002'), 1)),
    '880000001'
  );
  t.equal(
    _h3IntegerToString(_rightShiftH3Integer(_stringToH3Integer('ffffffffffffffff'), 1)),
    '7fffffffffffffff'
  );
  t.end();
});

test('_orH3Integers', t => {
  t.equal(_h3IntegerToString(_orH3Integers(_stringToH3Integer('0'), _stringToH3Integer('0'))), '0');
  t.equal(_h3IntegerToString(_orH3Integers(_stringToH3Integer('1'), _stringToH3Integer('0'))), '1');
  t.equal(
    _h3IntegerToString(_orH3Integers(_stringToH3Integer('100000000'), _stringToH3Integer('1'))),
    '100000001'
  );
  t.equal(
    _h3IntegerToString(
      _orH3Integers(_stringToH3Integer('1f0000000f'), _stringToH3Integer('1f0000000f'))
    ),
    '1f0000000f'
  );
  t.end();
});

test('_maskLeftBits', t => {
  t.equal(_h3IntegerToString(_maskLeftBits(_stringToH3Integer('100000000'), 32)), '0');
  t.equal(_h3IntegerToString(_maskLeftBits(_stringToH3Integer('300000000'), 31)), '100000000');
  t.equal(
    _h3IntegerToString(_maskLeftBits(_stringToH3Integer('ffffffffffffffff'), 0)),
    'ffffffffffffffff'
  );
  t.equal(
    _h3IntegerToString(_maskLeftBits(_stringToH3Integer('ffffffffffffffff'), 1)),
    '7fffffffffffffff'
  );
  t.end();
});

test('_addH3Integers', t => {
  t.equal(
    _h3IntegerToString(_addH3Integers(_stringToH3Integer('1'), _stringToH3Integer('1'))),
    '2'
  );
  t.equal(
    _h3IntegerToString(_addH3Integers(_stringToH3Integer('100000000'), _stringToH3Integer('0'))),
    '100000000'
  );
  t.equal(
    _h3IntegerToString(
      _addH3Integers(_stringToH3Integer('100000000'), _stringToH3Integer('100000000'))
    ),
    '200000000'
  );
  t.equal(
    _h3IntegerToString(
      _addH3Integers(_stringToH3Integer('80000000'), _stringToH3Integer('80000000'))
    ),
    '100000000'
  );
  t.equal(
    _h3IntegerToString(
      _addH3Integers(_stringToH3Integer('28589253f'), _stringToH3Integer('96cb94000'))
    ),
    'bf242653f'
  );
  t.equal(
    _h3IntegerToString(
      _addH3Integers(_stringToH3Integer('70000000'), _stringToH3Integer('f0000000'))
    ),
    '160000000'
  );
  t.equal(
    _h3IntegerToString(
      _addH3Integers(_stringToH3Integer('1cb91000'), _stringToH3Integer('b9722000'))
    ),
    'd62b3000'
  );
  t.end();
});

test('_subtractH3Integers', t => {
  t.equal(
    _h3IntegerToString(_subtractH3Integers(_stringToH3Integer('1'), _stringToH3Integer('1'))),
    '0'
  );
  t.equal(
    _h3IntegerToString(_subtractH3Integers(_stringToH3Integer('1'), _stringToH3Integer('0'))),
    '1'
  );
  t.equal(
    _h3IntegerToString(
      _subtractH3Integers(_stringToH3Integer('100000000'), _stringToH3Integer('100000000'))
    ),
    '0'
  );
  t.equal(
    _h3IntegerToString(
      _subtractH3Integers(_stringToH3Integer('100000001'), _stringToH3Integer('100000000'))
    ),
    '1'
  );
  t.equal(
    _h3IntegerToString(
      _subtractH3Integers(_stringToH3Integer('300000003'), _stringToH3Integer('100000000'))
    ),
    '200000003'
  );
  t.equal(
    _h3IntegerToString(
      _subtractH3Integers(_stringToH3Integer('80000300'), _stringToH3Integer('80000000'))
    ),
    '300'
  );
  t.equal(
    _h3IntegerToString(
      _subtractH3Integers(_stringToH3Integer('80000000'), _stringToH3Integer('1'))
    ),
    '7fffffff'
  );
  t.equal(
    _h3IntegerToString(
      _subtractH3Integers(_stringToH3Integer('80000000'), _stringToH3Integer('0'))
    ),
    '80000000'
  );
  t.equal(
    _h3IntegerToString(
      _subtractH3Integers(_stringToH3Integer('80000000'), _stringToH3Integer('0'))
    ),
    '80000000'
  );
  t.equal(
    _h3IntegerToString(
      _subtractH3Integers(_stringToH3Integer('100000000'), _stringToH3Integer('1'))
    ),
    'ffffffff'
  );
  t.equal(
    _h3IntegerToString(
      _subtractH3Integers(_stringToH3Integer('1000000f0'), _stringToH3Integer('f1'))
    ),
    'ffffffff'
  );
  t.equal(
    _h3IntegerToString(
      _subtractH3Integers(_stringToH3Integer('1000000f0'), _stringToH3Integer('f2'))
    ),
    'fffffffe'
  );
  t.equal(
    _h3IntegerToString(
      _subtractH3Integers(_stringToH3Integer('2000000f0'), _stringToH3Integer('f2'))
    ),
    '1fffffffe'
  );
  t.end();
});

test('_scaleH3Integer', t => {
  t.equal(_h3IntegerToString(_scaleH3Integer(0, _stringToH3Integer('1'))), '0');
  t.equal(_h3IntegerToString(_scaleH3Integer(1, _stringToH3Integer('1'))), '1');
  t.equal(_h3IntegerToString(_scaleH3Integer(2, _stringToH3Integer('80000000'))), '100000000');
  t.equal(_h3IntegerToString(_scaleH3Integer(2, _stringToH3Integer('800000000'))), '1000000000');
  t.end();
});

test('_h3IntegerToJSInteger', t => {
  t.equal(_h3IntegerToJSInteger(_stringToH3Integer('0')), 0);
  t.equal(_h3IntegerToJSInteger(_stringToH3Integer('1')), 1);
  t.equal(_h3IntegerToJSInteger(_stringToH3Integer('100000000')), 0x100000000);
  t.equal(_h3IntegerToJSInteger(_stringToH3Integer('2100000020')), 0x2100000020);
  t.throws(() => _h3IntegerToJSInteger(_stringToH3Integer('ffffffffffffffff')));
  t.end();
});
