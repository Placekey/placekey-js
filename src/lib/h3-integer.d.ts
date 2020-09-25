/**
 * Left shift an h3Integer by some number of bits
 */
export function leftShiftH3Integer(h3Integer: number[], bits: number, result?: number[]): number[];

/**
 * Right shift without sign extension
 */
export function rightShiftH3Integer(h3Integer: number[], bits: number, result?: number[]): number[];

/**
 * Bitwise inclusive OR operation on two 64 bit H3 integers.
 */
export function orH3Integers(left: number[], right: number[], result?: number[]): number[];

/**
 * Bitwise mask operation on a 64 bit integer.
 */
export function maskLeftBits(h3Integer: number[], bits: number, result?: number[]): number[];

/**
 * Addition of two 64 bit integers.
 */
export function addH3Integers(left: number[], right: number[], result?: number[]): number[];

/**
 * Subtraction fo two 64 bit integers.
 * 
 * Limited to only if there is no carry needed between the two 32-bit components.
 */
export function subtractH3Integers(left: number[], right: number[], result?: number[]): number[];

/**
 * Scale a 64 bit integer by a whole number.
 * 
 * `scalar` must be an integer >= 0. This operation has linear complexity increasing
 * with `scalar` (repeated addition.)
 */
export function scaleH3Integer(scalar: number, value: number[], result?: number[]);

/**
 * Convert a standard H3 index to a two-component array of 32 bit integers
 * @param h3index A standard H3 hexadecimal string index
 * @param result Optional two-component array to store result into
 * @returns a two-component array of numbers. Returns `result` if provided, otherwise a newly created array
 */
export function stringToH3Integer(h3index: string, result?: number[]): number[];

/**
 * Convert a two-component array of 32 bit integers into a standard H3 index
 * @param h3Integer two component array
 * @returns A standard H3 hexadecimal string index
 */
export function h3IntegerToString(h3Integer: number[]): string;

/**
 * Shorten a two component h3 integer to only include location data up to the base resolution
 * @param h3Integer: two-component h3 integer
 * @return: shortened h3 integer
 */
export function shortenH3Integer(h3Integer: number[]): number[];

/**
 * Expand a shortened single number h3 integer into a two component h3 integer
 * Adds additional bits around
 * @param shortH3Integer: h3 integer  only includes location data up to the base resolution
 * @returns a two-component array of numbers. Returns `result` if provided, otherwise a newly created array
 */
export function unshortenH3Integer(shortH3Integer: number): number[];

/**
 * Converts from an H3 integer to a JavaScript number (which is also an integer)
 *
 * @param h3Integer h3 integer less than 2^53
 * @returns The H3 integer as a JavaScript integer
 */
export function h3IntegerToJSInteger(h3Integer: number[]): number;
