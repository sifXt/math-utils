/**
 * Math Utility Functions
 * Pure TypeScript implementation for general mathematical operations
 *
 * Features:
 * - Type-safe mathematical operations
 * - Consistent rounding behavior
 * - Statistical functions
 * - Utility functions for common calculations
 *
 * Note: For financial/money calculations, use the Money utils instead
 * as they handle decimal precision with BigInt for accuracy.
 */

import {
    MATH_PRECISION,
    MathRoundingMode,
    DEFAULT_MATH_ROUNDING_MODE,
    MATH_CONSTANTS,
    ANGLE,
} from './constant/math';

export {
    MathRoundingMode,
    DEFAULT_MATH_ROUNDING_MODE,
    MATH_PRECISION,
    MATH_CONSTANTS,
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type NumericInput = number | string;

export interface StatisticsResult {
    count: number;
    sum: number;
    mean: number;
    median: number;
    mode: number[];
    min: number;
    max: number;
    range: number;
    variance: number;
    standardDeviation: number;
}

export interface PercentileResult {
    value: number;
    percentile: number;
}

// =============================================================================
// PARSING AND VALIDATION
// =============================================================================

/**
 * Parse input to number, handling string inputs
 */
export function toNumber(value: NumericInput): number {
    if (typeof value === 'number') {
        return value;
    }
    const parsed = parseFloat(value);
    if (isNaN(parsed)) {
        throw new Error(`Invalid numeric value: ${value}`);
    }
    return parsed;
}

/**
 * Safely parse to number with fallback
 */
export function safeToNumber(value: any, defaultValue: number = 0): number {
    if (value === null || value === undefined) {
        return defaultValue;
    }

    if (typeof value === 'number') {
        return isNaN(value) || !isFinite(value) ? defaultValue : value;
    }

    if (typeof value === 'string') {
        const parsed = parseFloat(value);
        return isNaN(parsed) || !isFinite(parsed) ? defaultValue : parsed;
    }

    return defaultValue;
}

/**
 * Check if value is a valid number
 */
export function isValidNumber(value: any): boolean {
    if (typeof value === 'number') {
        return !isNaN(value) && isFinite(value);
    }
    if (typeof value === 'string') {
        const parsed = parseFloat(value);
        return !isNaN(parsed) && isFinite(parsed);
    }
    return false;
}

// =============================================================================
// ROUNDING FUNCTIONS
// =============================================================================

/**
 * Round a number to specified decimal places with configurable mode
 */
export function round(
    value: NumericInput,
    decimalPlaces: number = 0,
    mode: MathRoundingMode = DEFAULT_MATH_ROUNDING_MODE,
): number {
    const num = toNumber(value);
    const multiplier = Math.pow(10, decimalPlaces);
    const shifted = num * multiplier;

    let rounded: number;

    switch (mode) {
        case MathRoundingMode.CEIL:
            rounded = Math.ceil(shifted);
            break;
        case MathRoundingMode.FLOOR:
            rounded = Math.floor(shifted);
            break;
        case MathRoundingMode.TRUNCATE:
            rounded = Math.trunc(shifted);
            break;
        case MathRoundingMode.BANKERS:
            // Round half to even (Banker's rounding)
            const floor = Math.floor(shifted);
            const decimal = shifted - floor;
            if (Math.abs(decimal - 0.5) < MATH_PRECISION.EPSILON) {
                // Exactly half - round to even
                rounded = floor % 2 === 0 ? floor : floor + 1;
            } else {
                rounded = Math.round(shifted);
            }
            break;
        case MathRoundingMode.STANDARD:
        default:
            rounded = Math.round(shifted);
            break;
    }

    return rounded / multiplier;
}

/**
 * Round up to specified decimal places
 */
export function ceil(value: NumericInput, decimalPlaces: number = 0): number {
    return round(value, decimalPlaces, MathRoundingMode.CEIL);
}

/**
 * Round down to specified decimal places
 */
export function floor(value: NumericInput, decimalPlaces: number = 0): number {
    return round(value, decimalPlaces, MathRoundingMode.FLOOR);
}

/**
 * Truncate to specified decimal places
 */
export function truncate(
    value: NumericInput,
    decimalPlaces: number = 0,
): number {
    return round(value, decimalPlaces, MathRoundingMode.TRUNCATE);
}

// =============================================================================
// BASIC ARITHMETIC
// =============================================================================

/**
 * Add multiple numbers
 */
export function add(...values: NumericInput[]): number {
    return values.reduce<number>((sum, val) => sum + toNumber(val), 0);
}

/**
 * Subtract numbers (a - b - c - ...)
 */
export function subtract(first: NumericInput, ...rest: NumericInput[]): number {
    const initial = toNumber(first);
    return rest.reduce<number>((diff, val) => diff - toNumber(val), initial);
}

/**
 * Multiply numbers
 */
export function multiply(...values: NumericInput[]): number {
    if (values.length === 0) return 0;
    return values.reduce<number>((product, val) => product * toNumber(val), 1);
}

/**
 * Divide numbers (a / b / c / ...)
 */
export function divide(
    first: NumericInput,
    ...divisors: NumericInput[]
): number {
    const initial = toNumber(first);
    return divisors.reduce<number>((quotient, val) => {
        const divisor = toNumber(val);
        if (divisor === 0) {
            throw new Error('Division by zero');
        }
        return quotient / divisor;
    }, initial);
}

/**
 * Calculate modulo (remainder)
 */
export function mod(value: NumericInput, divisor: NumericInput): number {
    const num = toNumber(value);
    const div = toNumber(divisor);
    if (div === 0) {
        throw new Error('Division by zero');
    }
    return num % div;
}

// =============================================================================
// POWER AND ROOT FUNCTIONS
// =============================================================================

/**
 * Calculate power
 */
export function pow(base: NumericInput, exponent: NumericInput): number {
    return Math.pow(toNumber(base), toNumber(exponent));
}

/**
 * Calculate square root
 */
export function sqrt(value: NumericInput): number {
    const num = toNumber(value);
    if (num < 0) {
        throw new Error('Cannot calculate square root of negative number');
    }
    return Math.sqrt(num);
}

/**
 * Calculate cube root
 */
export function cbrt(value: NumericInput): number {
    return Math.cbrt(toNumber(value));
}

/**
 * Calculate nth root
 */
export function nthRoot(value: NumericInput, n: NumericInput): number {
    const num = toNumber(value);
    const root = toNumber(n);
    if (root === 0) {
        throw new Error('Cannot calculate 0th root');
    }
    if (num < 0 && root % 2 === 0) {
        throw new Error('Cannot calculate even root of negative number');
    }
    return Math.pow(num, 1 / root);
}

// =============================================================================
// COMPARISON FUNCTIONS
// =============================================================================

/**
 * Get minimum value
 */
export function min(...values: NumericInput[]): number {
    if (values.length === 0) {
        throw new Error('At least one value required');
    }
    return Math.min(...values.map(toNumber));
}

/**
 * Get maximum value
 */
export function max(...values: NumericInput[]): number {
    if (values.length === 0) {
        throw new Error('At least one value required');
    }
    return Math.max(...values.map(toNumber));
}

/**
 * Clamp value between min and max
 */
export function clamp(
    value: NumericInput,
    minVal: NumericInput,
    maxVal: NumericInput,
): number {
    const num = toNumber(value);
    return Math.max(toNumber(minVal), Math.min(toNumber(maxVal), num));
}

/**
 * Check if value is within range (inclusive)
 */
export function inRange(
    value: NumericInput,
    minVal: NumericInput,
    maxVal: NumericInput,
): boolean {
    const num = toNumber(value);
    return num >= toNumber(minVal) && num <= toNumber(maxVal);
}

/**
 * Compare two numbers
 * Returns: -1 if a < b, 0 if a === b, 1 if a > b
 */
export function compare(a: NumericInput, b: NumericInput): -1 | 0 | 1 {
    const numA = toNumber(a);
    const numB = toNumber(b);
    if (Math.abs(numA - numB) < MATH_PRECISION.EPSILON) return 0;
    return numA < numB ? -1 : 1;
}

/**
 * Check equality within epsilon
 */
export function equals(
    a: NumericInput,
    b: NumericInput,
    epsilon: number = MATH_PRECISION.EPSILON,
): boolean {
    return Math.abs(toNumber(a) - toNumber(b)) < epsilon;
}

// =============================================================================
// STATISTICAL FUNCTIONS
// =============================================================================

/**
 * Calculate sum
 */
export function sum(...values: NumericInput[]): number {
    return add(...values);
}

/**
 * Calculate mean (average)
 */
export function mean(...values: NumericInput[]): number {
    if (values.length === 0) {
        throw new Error('At least one value required');
    }
    return sum(...values) / values.length;
}

/**
 * Calculate median
 */
export function median(...values: NumericInput[]): number {
    if (values.length === 0) {
        throw new Error('At least one value required');
    }

    const sorted = values.map(toNumber).sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        return (sorted[mid - 1] + sorted[mid]) / 2;
    }
    return sorted[mid];
}

/**
 * Calculate mode (most frequent values)
 */
export function mode(...values: NumericInput[]): number[] {
    if (values.length === 0) {
        throw new Error('At least one value required');
    }

    const numbers = values.map(toNumber);
    const frequency = new Map<number, number>();

    for (const num of numbers) {
        frequency.set(num, (frequency.get(num) || 0) + 1);
    }

    const maxFreq = Math.max(...frequency.values());
    const modes: number[] = [];

    for (const [value, freq] of frequency) {
        if (freq === maxFreq) {
            modes.push(value);
        }
    }

    return modes.sort((a, b) => a - b);
}

/**
 * Calculate variance
 */
export function variance(...values: NumericInput[]): number {
    if (values.length < 2) {
        return 0;
    }

    const numbers = values.map(toNumber);
    const avg = mean(...numbers);
    const squaredDiffs = numbers.map((x) => Math.pow(x - avg, 2));
    return sum(...squaredDiffs) / (numbers.length - 1); // Sample variance
}

/**
 * Calculate population variance
 */
export function populationVariance(...values: NumericInput[]): number {
    if (values.length === 0) {
        return 0;
    }

    const numbers = values.map(toNumber);
    const avg = mean(...numbers);
    const squaredDiffs = numbers.map((x) => Math.pow(x - avg, 2));
    return sum(...squaredDiffs) / numbers.length;
}

/**
 * Calculate standard deviation
 */
export function standardDeviation(...values: NumericInput[]): number {
    return Math.sqrt(variance(...values));
}

/**
 * Calculate population standard deviation
 */
export function populationStandardDeviation(...values: NumericInput[]): number {
    return Math.sqrt(populationVariance(...values));
}

/**
 * Calculate comprehensive statistics
 */
export function statistics(...values: NumericInput[]): StatisticsResult {
    if (values.length === 0) {
        throw new Error('At least one value required');
    }

    const numbers = values.map(toNumber);
    const count = numbers.length;
    const sumVal = sum(...numbers);
    const meanVal = sumVal / count;
    const medianVal = median(...numbers);
    const modeVal = mode(...numbers);
    const minVal = min(...numbers);
    const maxVal = max(...numbers);
    const rangeVal = maxVal - minVal;
    const varianceVal = variance(...numbers);
    const stdDevVal = Math.sqrt(varianceVal);

    return {
        count,
        sum: sumVal,
        mean: meanVal,
        median: medianVal,
        mode: modeVal,
        min: minVal,
        max: maxVal,
        range: rangeVal,
        variance: varianceVal,
        standardDeviation: stdDevVal,
    };
}

/**
 * Calculate percentile
 */
export function percentile(values: NumericInput[], p: number): number {
    if (values.length === 0) {
        throw new Error('At least one value required');
    }
    if (p < 0 || p > 100) {
        throw new Error('Percentile must be between 0 and 100');
    }

    const sorted = values.map(toNumber).sort((a, b) => a - b);

    if (p === 0) return sorted[0];
    if (p === 100) return sorted[sorted.length - 1];

    const index = (p / 100) * (sorted.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);

    if (lower === upper) {
        return sorted[lower];
    }

    const weight = index - lower;
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

// =============================================================================
// PERCENTAGE FUNCTIONS
// =============================================================================

/**
 * Calculate percentage of a value
 */
export function percent(value: NumericInput, percentage: NumericInput): number {
    return toNumber(value) * (toNumber(percentage) / 100);
}

/**
 * Calculate what percentage one value is of another
 */
export function percentOf(part: NumericInput, whole: NumericInput): number {
    const wholeNum = toNumber(whole);
    if (wholeNum === 0) {
        return 0;
    }
    return (toNumber(part) / wholeNum) * 100;
}

/**
 * Calculate percentage change
 */
export function percentChange(
    oldValue: NumericInput,
    newValue: NumericInput,
): number {
    const oldNum = toNumber(oldValue);
    if (oldNum === 0) {
        return newValue === 0 ? 0 : Infinity;
    }
    return ((toNumber(newValue) - oldNum) / Math.abs(oldNum)) * 100;
}

/**
 * Add percentage to value
 */
export function addPercent(
    value: NumericInput,
    percentage: NumericInput,
): number {
    return toNumber(value) * (1 + toNumber(percentage) / 100);
}

/**
 * Subtract percentage from value
 */
export function subtractPercent(
    value: NumericInput,
    percentage: NumericInput,
): number {
    return toNumber(value) * (1 - toNumber(percentage) / 100);
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get absolute value
 */
export function abs(value: NumericInput): number {
    return Math.abs(toNumber(value));
}

/**
 * Get sign of a number (-1, 0, or 1)
 */
export function sign(value: NumericInput): -1 | 0 | 1 {
    const num = toNumber(value);
    if (num > 0) return 1;
    if (num < 0) return -1;
    return 0;
}

/**
 * Check if number is positive
 */
export function isPositive(value: NumericInput): boolean {
    return toNumber(value) > 0;
}

/**
 * Check if number is negative
 */
export function isNegative(value: NumericInput): boolean {
    return toNumber(value) < 0;
}

/**
 * Check if number is zero (within epsilon)
 */
export function isZero(
    value: NumericInput,
    epsilon: number = MATH_PRECISION.EPSILON,
): boolean {
    return Math.abs(toNumber(value)) < epsilon;
}

/**
 * Check if number is an integer
 */
export function isInteger(value: NumericInput): boolean {
    return Number.isInteger(toNumber(value));
}

/**
 * Check if number is even
 */
export function isEven(value: NumericInput): boolean {
    const num = toNumber(value);
    return Number.isInteger(num) && num % 2 === 0;
}

/**
 * Check if number is odd
 */
export function isOdd(value: NumericInput): boolean {
    const num = toNumber(value);
    return Number.isInteger(num) && num % 2 !== 0;
}

// =============================================================================
// ANGLE CONVERSIONS
// =============================================================================

/**
 * Convert degrees to radians
 */
export function degreesToRadians(degrees: NumericInput): number {
    return toNumber(degrees) * ANGLE.DEG_TO_RAD;
}

/**
 * Convert radians to degrees
 */
export function radiansToDegrees(radians: NumericInput): number {
    return toNumber(radians) * ANGLE.RAD_TO_DEG;
}

// =============================================================================
// LOGARITHMIC FUNCTIONS
// =============================================================================

/**
 * Natural logarithm (base e)
 */
export function ln(value: NumericInput): number {
    const num = toNumber(value);
    if (num <= 0) {
        throw new Error('Logarithm undefined for non-positive values');
    }
    return Math.log(num);
}

/**
 * Logarithm base 10
 */
export function log10(value: NumericInput): number {
    const num = toNumber(value);
    if (num <= 0) {
        throw new Error('Logarithm undefined for non-positive values');
    }
    return Math.log10(num);
}

/**
 * Logarithm with custom base
 */
export function log(value: NumericInput, base: NumericInput): number {
    const num = toNumber(value);
    const b = toNumber(base);
    if (num <= 0 || b <= 0 || b === 1) {
        throw new Error('Invalid logarithm parameters');
    }
    return Math.log(num) / Math.log(b);
}

/**
 * Exponential function (e^x)
 */
export function exp(value: NumericInput): number {
    return Math.exp(toNumber(value));
}

// =============================================================================
// INTERPOLATION
// =============================================================================

/**
 * Linear interpolation between two values
 */
export function lerp(
    start: NumericInput,
    end: NumericInput,
    t: NumericInput,
): number {
    const startNum = toNumber(start);
    const endNum = toNumber(end);
    const tNum = toNumber(t);
    return startNum + (endNum - startNum) * tNum;
}

/**
 * Inverse linear interpolation (find t given value)
 */
export function inverseLerp(
    start: NumericInput,
    end: NumericInput,
    value: NumericInput,
): number {
    const startNum = toNumber(start);
    const endNum = toNumber(end);
    const valueNum = toNumber(value);

    if (startNum === endNum) {
        return 0;
    }

    return (valueNum - startNum) / (endNum - startNum);
}

/**
 * Map value from one range to another
 */
export function mapRange(
    value: NumericInput,
    inMin: NumericInput,
    inMax: NumericInput,
    outMin: NumericInput,
    outMax: NumericInput,
): number {
    const t = inverseLerp(inMin, inMax, value);
    return lerp(outMin, outMax, t);
}

// =============================================================================
// DISTRIBUTION FUNCTIONS
// =============================================================================

/**
 * Distribute a total amount evenly across N parts
 * Returns array of parts that sum exactly to total
 */
export function distribute(
    total: NumericInput,
    parts: number,
    decimalPlaces: number = 2,
): number[] {
    if (parts <= 0) {
        throw new Error('Parts must be positive');
    }

    const totalNum = toNumber(total);
    const baseAmount = round(totalNum / parts, decimalPlaces);
    const result = new Array(parts).fill(baseAmount);

    // Calculate remainder and distribute
    const currentTotal = baseAmount * parts;
    let remainder = round(totalNum - currentTotal, decimalPlaces);
    const increment = 1 / Math.pow(10, decimalPlaces);

    let index = 0;
    while (Math.abs(remainder) >= increment / 2 && index < parts * 100) {
        const adjustIndex = index % parts;
        if (remainder > 0) {
            result[adjustIndex] = round(
                result[adjustIndex] + increment,
                decimalPlaces,
            );
            remainder = round(remainder - increment, decimalPlaces);
        } else {
            result[adjustIndex] = round(
                result[adjustIndex] - increment,
                decimalPlaces,
            );
            remainder = round(remainder + increment, decimalPlaces);
        }
        index++;
    }

    return result;
}

/**
 * Allocate a total amount proportionally based on ratios
 */
export function allocate(
    total: NumericInput,
    ratios: NumericInput[],
    decimalPlaces: number = 2,
): number[] {
    if (ratios.length === 0) {
        return [];
    }

    const totalNum = toNumber(total);
    const ratioNums = ratios.map(toNumber);
    const ratioSum = sum(...ratioNums);

    if (ratioSum === 0) {
        throw new Error('Total ratio must be greater than zero');
    }

    const result: number[] = [];
    let allocated = 0;

    for (let i = 0; i < ratioNums.length - 1; i++) {
        const share = round(
            (totalNum * ratioNums[i]) / ratioSum,
            decimalPlaces,
        );
        result.push(share);
        allocated += share;
    }

    // Last item gets remainder to ensure exact total
    result.push(round(totalNum - allocated, decimalPlaces));

    return result;
}
