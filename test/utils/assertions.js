export function almostEquals(x, y, epsilon = 0.001) {
  return Math.abs(x - y) < epsilon;
}

export function assertAlmostEqual(t, actual, expected, epsilon, msg) {
  t.ok(almostEquals(actual, expected), `msg ${actual} vs ${expected}`);
}
