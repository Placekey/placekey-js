/** Encodes an H3 HexagonId as well as an id */
export type Placekey = string;

/** 
 * Boolean for whether or not a Placekey is valid.
 * @param placekey: Placekey
 * @return: True if the Placekey is valid, False otherwise
 */
export function placekeyIsValid(placekey: Placekey): boolean;

/** 
 * Convert latitude and longitude into a Placekey
 * @param lat: Latitude
 * @param long: Longitude
 * @returns Placekey
 */
export function geoToPlacekey(lat: number, long: number): Placekey;

/** 
 * Convert a Placekey into a (latitude, longitude) tuple
 * @param placekey: Placekey (string)
 * @return: (latitude, longitude) as a tuple of floats
 */ 
export function placekeyToGeo(placekey: Placekey);

/** 
 * Convert a Placekey string into an h3 string
 * @param placekey: Placekey (string)
 * @return: h3 index (string)
 */
export function placekeyToH3(placekey: Placekey): string;

/** 
 * Convert an h3 hexadecimal string into a Placekey string
 * @param h3index: h3 (string)
 * @return: Placekey (string)
 */
export function h3ToPlacekey(h3index: string): Placekey;

/** 
 * Return a dictionary mapping the length of a shared Placekey 
 * prefix to the maximal distance in meters between two Placekeys 
 * sharing a prefix of that length.
 * @return: Dictionary mapping prefix length -> distance (m)
 */ 
export function getPlacekeyPrefixDistanceDict(): object;

/** 
 * Given a placekey, return the cooridnates of the boundary of the hexagon.
 * @param placekey: Placekey (string)
 * @param geo_json: If True return the coordinates in GeoJSON format:
 *   (long,lat)-tuples and with the first and last tuples identical. If False
 *   (default) tuples will be (lat, long) and the last tuple will not equal
 *   the first.
 * @return: Tuple of tuples ((float, float),...).
 */ 
export function placekeyToHexBoundary(placekey: Placekey, geojson?: boolean): any;

/** 
 * Return the distance in meters between the centers of two Placekeys
 * @param placekey1 Placekey (string)
 * @param placekey2 Placekey (string)
 * @return: distance in meters (float)
 */
export function placekeyDistance(placekey1: Placekey, placekey2: Placekey): number;

// TEST EXPORTS
export function _cleanString(string: string): string;
export function _dirtyString(string: string): string;
