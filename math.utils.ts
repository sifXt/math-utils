/**
 * Math Utility Functions
 * Pure TypeScript implementation for general mathematical operations
 *
 * Features:
 * - Type-safe mathematical operations
 * - Consistent rounding behavior
 * - Statistical functions
 * - Utility functions for common calculations
 * - Precise decimal arithmetic using BigInt (zero floating-point errors)
 * - Multiple rounding modes including Banker's rounding
 *
 * For financial/money calculations, use the precise* functions (preciseAdd,
 * preciseSubtract, preciseMultiply, preciseDivide, etc.) which use BigInt
 * internally to avoid floating-point errors.
 */

import {
    MATH_PRECISION,
    MathRoundingMode,
    DEFAULT_MATH_ROUNDING_MODE,
    MATH_CONSTANTS,
    ANGLE,
    PrecisionRoundingMode,
    DEFAULT_PRECISION_ROUNDING_MODE,
    DEFAULT_PRECISION_DECIMAL_PLACES,
    PRECISION,
} from './constant/math';

export {
    MathRoundingMode,
    DEFAULT_MATH_ROUNDING_MODE,
    MATH_PRECISION,
    MATH_CONSTANTS,
    PrecisionRoundingMode,
    DEFAULT_PRECISION_ROUNDING_MODE,
    DEFAULT_PRECISION_DECIMAL_PLACES,
    PRECISION,
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

// =============================================================================
// PRECISE DECIMAL ARITHMETIC (BigInt-based)
// =============================================================================
// These functions use BigInt internally to avoid floating-point errors.
// All inputs/outputs are strings for maximum precision.
// Ideal for financial calculations where accuracy is critical.

/**
 * Parse a number or string to a precise string representation
 */
export function parseToString(value: number | string): string {
    if (typeof value === 'string') {
        return value.trim();
    }
    return value.toString();
}

/**
 * Split a decimal number string into integer and fractional parts
 * @internal
 */
function splitDecimal(value: string): {
    integer: string;
    fraction: string;
    isNegative: boolean;
} {
    const trimmed = value.trim();
    const isNegative = trimmed.startsWith('-');
    const absolute = isNegative ? trimmed.slice(1) : trimmed;

    const parts = absolute.split('.');
    return {
        integer: parts[0] || '0',
        fraction: parts[1] || '0',
        isNegative: isNegative && absolute !== '0',
    };
}

/**
 * Add two decimal numbers with arbitrary precision
 * Returns a string to preserve precision
 * 
 * @example
 * ```typescript
 * preciseAdd('0.1', '0.2');     // '0.3' (not 0.30000000000000004)
 * preciseAdd('123.456', '789.012'); // '912.468'
 * preciseAdd('-5.5', '3.3');    // '-2.2'
 * ```
 */
export function preciseAdd(a: number | string, b: number | string): string {
    const aStr = parseToString(a);
    const bStr = parseToString(b);

    const aParts = splitDecimal(aStr);
    const bParts = splitDecimal(bStr);

    // Pad fractions to same length
    const maxFractionLength = Math.max(
        aParts.fraction.length,
        bParts.fraction.length,
    );
    const aFraction = aParts.fraction.padEnd(maxFractionLength, '0');
    const bFraction = bParts.fraction.padEnd(maxFractionLength, '0');

    // Convert to integers for calculation
    const aInt = BigInt(
        (aParts.isNegative ? '-' : '') + aParts.integer + aFraction,
    );
    const bInt = BigInt(
        (bParts.isNegative ? '-' : '') + bParts.integer + bFraction,
    );

    const result = aInt + bInt;
    const resultStr = result.toString();
    const isNegative = resultStr.startsWith('-');
    const absolute = isNegative ? resultStr.slice(1) : resultStr;

    if (maxFractionLength === 0) {
        return (isNegative ? '-' : '') + absolute;
    }

    const paddedAbsolute = absolute.padStart(maxFractionLength + 1, '0');
    const integerPart = paddedAbsolute.slice(0, -maxFractionLength) || '0';
    const fractionPart = paddedAbsolute
        .slice(-maxFractionLength)
        .replace(/0+$/, '');

    if (fractionPart) {
        return (isNegative ? '-' : '') + integerPart + '.' + fractionPart;
    }
    return (isNegative ? '-' : '') + integerPart;
}

/**
 * Subtract two decimal numbers with arbitrary precision (a - b)
 * Returns a string to preserve precision
 * 
 * @example
 * ```typescript
 * preciseSubtract('0.3', '0.1');     // '0.2' (not 0.19999999999999998)
 * preciseSubtract('100', '33.33');   // '66.67'
 * preciseSubtract('5', '8');         // '-3'
 * ```
 */
export function preciseSubtract(a: number | string, b: number | string): string {
    const bStr = parseToString(b);
    const negatedB = bStr.startsWith('-') ? bStr.slice(1) : '-' + bStr;
    return preciseAdd(a, negatedB);
}

/**
 * Multiply two decimal numbers with arbitrary precision
 * Returns a string to preserve precision
 * 
 * @example
 * ```typescript
 * preciseMultiply('0.1', '0.2');     // '0.02' (not 0.020000000000000004)
 * preciseMultiply('123.45', '67.89'); // '8381.0205'
 * preciseMultiply('-5', '3');        // '-15'
 * ```
 */
export function preciseMultiply(a: number | string, b: number | string): string {
    const aStr = parseToString(a);
    const bStr = parseToString(b);

    const aParts = splitDecimal(aStr);
    const bParts = splitDecimal(bStr);

    const aFractionLength = aParts.fraction.length;
    const bFractionLength = bParts.fraction.length;
    const totalFractionLength = aFractionLength + bFractionLength;

    const aInt = BigInt(
        (aParts.isNegative ? '-' : '') + aParts.integer + aParts.fraction,
    );
    const bInt = BigInt(
        (bParts.isNegative ? '-' : '') + bParts.integer + bParts.fraction,
    );

    const result = aInt * bInt;
    const resultStr = result.toString();
    const isNegative = resultStr.startsWith('-');
    const absolute = isNegative ? resultStr.slice(1) : resultStr;

    if (totalFractionLength === 0) {
        return (isNegative ? '-' : '') + absolute;
    }

    const paddedAbsolute = absolute.padStart(totalFractionLength + 1, '0');
    const integerPart = paddedAbsolute.slice(0, -totalFractionLength) || '0';
    const fractionPart = paddedAbsolute
        .slice(-totalFractionLength)
        .replace(/0+$/, '');

    if (fractionPart) {
        return (isNegative ? '-' : '') + integerPart + '.' + fractionPart;
    }
    return (isNegative ? '-' : '') + integerPart;
}

/**
 * Divide two decimal numbers with arbitrary precision (a / b)
 * Returns a string to preserve precision
 * 
 * @param a - Dividend
 * @param b - Divisor
 * @param precision - Number of decimal places to calculate (default: 20)
 * @throws Error if dividing by zero
 * 
 * @example
 * ```typescript
 * preciseDivide('1', '3');           // '0.33333333333333333333'
 * preciseDivide('10', '4', 2);       // '2.5'
 * preciseDivide('100', '7', 10);     // '14.2857142857'
 * ```
 */
export function preciseDivide(
    a: number | string,
    b: number | string,
    precision: number = PRECISION.DEFAULT,
): string {
    const aStr = parseToString(a);
    const bStr = parseToString(b);

    const aParts = splitDecimal(aStr);
    const bParts = splitDecimal(bStr);

    if (bParts.integer === '0' && bParts.fraction === '0') {
        throw new Error('Division by zero');
    }

    const isNegative = aParts.isNegative !== bParts.isNegative;

    // Scale both numbers to remove decimals
    const maxFractionLength = Math.max(
        aParts.fraction.length,
        bParts.fraction.length,
    );
    const aFraction = aParts.fraction.padEnd(maxFractionLength, '0');
    const bFraction = bParts.fraction.padEnd(maxFractionLength, '0');

    let dividend = BigInt(aParts.integer + aFraction);
    const divisor = BigInt(bParts.integer + bFraction);

    // Add extra precision for division
    const scaleFactor = BigInt(10) ** BigInt(precision);
    dividend = dividend * scaleFactor;

    const result = dividend / divisor;
    const resultStr = result.toString();
    const paddedResult = resultStr.padStart(precision + 1, '0');

    const integerPart = paddedResult.slice(0, -precision) || '0';
    const fractionPart = paddedResult.slice(-precision).replace(/0+$/, '');

    if (fractionPart) {
        return (isNegative ? '-' : '') + integerPart + '.' + fractionPart;
    }
    return (isNegative ? '-' : '') + integerPart;
}

/**
 * Compare two precise decimal numbers
 * Returns: -1 if a < b, 0 if a === b, 1 if a > b
 * 
 * @example
 * ```typescript
 * preciseCompare('0.1', '0.2');      // -1
 * preciseCompare('0.30', '0.3');     // 0
 * preciseCompare('1.5', '1.499');    // 1
 * ```
 */
export function preciseCompare(a: number | string, b: number | string): -1 | 0 | 1 {
    const diff = preciseSubtract(a, b);
    const parts = splitDecimal(diff);

    if (parts.integer === '0' && parts.fraction === '0') {
        return 0;
    }

    return parts.isNegative ? -1 : 1;
}

/**
 * Check if two precise decimal values are equal
 */
export function preciseEquals(a: number | string, b: number | string): boolean {
    return preciseCompare(a, b) === 0;
}

/**
 * Check if a is greater than b (precise)
 */
export function preciseGreaterThan(a: number | string, b: number | string): boolean {
    return preciseCompare(a, b) > 0;
}

/**
 * Check if a is greater than or equal to b (precise)
 */
export function preciseGreaterThanOrEqual(a: number | string, b: number | string): boolean {
    return preciseCompare(a, b) >= 0;
}

/**
 * Check if a is less than b (precise)
 */
export function preciseLessThan(a: number | string, b: number | string): boolean {
    return preciseCompare(a, b) < 0;
}

/**
 * Check if a is less than or equal to b (precise)
 */
export function preciseLessThanOrEqual(a: number | string, b: number | string): boolean {
    return preciseCompare(a, b) <= 0;
}

/**
 * Get the absolute value of a precise decimal
 */
export function preciseAbs(value: number | string): string {
    const str = parseToString(value);
    return str.startsWith('-') ? str.slice(1) : str;
}

/**
 * Negate a precise decimal value
 */
export function preciseNegate(value: number | string): string {
    const str = parseToString(value);
    if (str === '0' || str === '0.0') {
        return '0';
    }
    return str.startsWith('-') ? str.slice(1) : '-' + str;
}

/**
 * Round a precise decimal number to specified decimal places
 * Supports multiple rounding modes for different use cases
 * 
 * @param value - The value to round
 * @param decimalPlaces - Number of decimal places (default: 2)
 * @param mode - Rounding mode (default: HALF_EVEN / Banker's rounding)
 * 
 * @example
 * ```typescript
 * preciseRound('2.5', 0, PrecisionRoundingMode.HALF_UP);    // '3'
 * preciseRound('2.5', 0, PrecisionRoundingMode.HALF_EVEN);  // '2'
 * preciseRound('2.555', 2);                                  // '2.56'
 * preciseRound('-2.5', 0, PrecisionRoundingMode.FLOOR);     // '-3'
 * ```
 */
export function preciseRound(
    value: number | string,
    decimalPlaces: number = DEFAULT_PRECISION_DECIMAL_PLACES,
    mode: PrecisionRoundingMode = DEFAULT_PRECISION_ROUNDING_MODE,
): string {
    const str = parseToString(value);
    const parts = splitDecimal(str);

    if (decimalPlaces < 0) {
        throw new Error('Decimal places must be non-negative');
    }

    if (parts.fraction.length <= decimalPlaces) {
        // No rounding needed
        if (decimalPlaces === 0) {
            return (parts.isNegative ? '-' : '') + parts.integer;
        }
        const paddedFraction = parts.fraction.padEnd(decimalPlaces, '0');
        return (
            (parts.isNegative ? '-' : '') + parts.integer + '.' + paddedFraction
        );
    }

    const keepDigits = parts.fraction.slice(0, decimalPlaces);
    const nextDigit = parseInt(parts.fraction[decimalPlaces] || '0', 10);
    const hasMoreDigits =
        parts.fraction.slice(decimalPlaces + 1).replace(/0+$/, '') !== '';

    let shouldRoundUp = false;

    switch (mode) {
        case PrecisionRoundingMode.UP:
            shouldRoundUp =
                !parts.isNegative && (nextDigit > 0 || hasMoreDigits);
            break;
        case PrecisionRoundingMode.DOWN:
            shouldRoundUp = false;
            break;
        case PrecisionRoundingMode.CEIL:
            shouldRoundUp =
                !parts.isNegative && (nextDigit > 0 || hasMoreDigits);
            break;
        case PrecisionRoundingMode.FLOOR:
            shouldRoundUp =
                parts.isNegative && (nextDigit > 0 || hasMoreDigits);
            break;
        case PrecisionRoundingMode.HALF_UP:
            shouldRoundUp = nextDigit >= 5;
            break;
        case PrecisionRoundingMode.HALF_DOWN:
            shouldRoundUp = nextDigit > 5 || (nextDigit === 5 && hasMoreDigits);
            break;
        case PrecisionRoundingMode.HALF_EVEN:
            if (nextDigit > 5) {
                shouldRoundUp = true;
            } else if (nextDigit === 5 && !hasMoreDigits) {
                const lastKeepDigit = parseInt(
                    keepDigits[keepDigits.length - 1] ||
                        parts.integer[parts.integer.length - 1],
                    10,
                );
                shouldRoundUp = lastKeepDigit % 2 !== 0;
            } else if (nextDigit === 5 && hasMoreDigits) {
                shouldRoundUp = true;
            }
            break;
        case PrecisionRoundingMode.HALF_CEIL:
            if (nextDigit >= 5) {
                shouldRoundUp = !parts.isNegative;
            }
            break;
        case PrecisionRoundingMode.HALF_FLOOR:
            if (nextDigit >= 5) {
                shouldRoundUp = parts.isNegative;
            }
            break;
    }

    if (!shouldRoundUp) {
        if (decimalPlaces === 0) {
            return (parts.isNegative ? '-' : '') + parts.integer;
        }
        return (parts.isNegative ? '-' : '') + parts.integer + '.' + keepDigits;
    }

    // Round up
    const incrementValue = '0.' + '0'.repeat(decimalPlaces - 1) + '1';
    const rounded = preciseAdd(
        (parts.isNegative ? '-' : '') + parts.integer + '.' + keepDigits,
        parts.isNegative ? preciseNegate(incrementValue) : incrementValue,
    );

    // Ensure correct decimal places
    const roundedParts = splitDecimal(rounded);
    if (decimalPlaces === 0) {
        return (roundedParts.isNegative ? '-' : '') + roundedParts.integer;
    }
    const paddedFraction = roundedParts.fraction
        .padEnd(decimalPlaces, '0')
        .slice(0, decimalPlaces);
    return (
        (roundedParts.isNegative ? '-' : '') +
        roundedParts.integer +
        '.' +
        paddedFraction
    );
}

/**
 * Get the minimum of multiple precise decimal values
 */
export function preciseMin(...values: (number | string)[]): string {
    if (values.length === 0) {
        throw new Error('At least one value is required');
    }

    return values.reduce<string>((minVal, current) => {
        return preciseLessThan(current, minVal) ? parseToString(current) : minVal;
    }, parseToString(values[0]));
}

/**
 * Get the maximum of multiple precise decimal values
 */
export function preciseMax(...values: (number | string)[]): string {
    if (values.length === 0) {
        throw new Error('At least one value is required');
    }

    return values.reduce<string>((maxVal, current) => {
        return preciseGreaterThan(current, maxVal) ? parseToString(current) : maxVal;
    }, parseToString(values[0]));
}

/**
 * Sum multiple precise decimal values
 */
export function preciseSum(...values: (number | string)[]): string {
    return values.reduce<string>((total, current) => preciseAdd(total, current), '0');
}

/**
 * Calculate percentage of a precise decimal value
 * 
 * @example
 * ```typescript
 * precisePercentage('1000', '18');   // '180' (18% of 1000)
 * precisePercentage('250', '15');    // '37.5' (15% of 250)
 * ```
 */
export function precisePercentage(
    value: number | string,
    percent: number | string,
): string {
    return preciseDivide(preciseMultiply(value, percent), 100);
}

/**
 * Add percentage to a precise decimal value
 * 
 * @example
 * ```typescript
 * preciseAddPercentage('1000', '10');  // '1100' (add 10%)
 * ```
 */
export function preciseAddPercentage(
    value: number | string,
    percent: number | string,
): string {
    return preciseAdd(value, precisePercentage(value, percent));
}

/**
 * Subtract percentage from a precise decimal value
 * 
 * @example
 * ```typescript
 * preciseSubtractPercentage('1000', '10');  // '900' (subtract 10%)
 * ```
 */
export function preciseSubtractPercentage(
    value: number | string,
    percent: number | string,
): string {
    return preciseSubtract(value, precisePercentage(value, percent));
}

/**
 * Calculate what percentage one precise decimal value is of another
 * 
 * @example
 * ```typescript
 * precisePercentageOf('25', '100');  // '25' (25 is 25% of 100)
 * precisePercentageOf('3', '12');    // '25' (3 is 25% of 12)
 * ```
 */
export function precisePercentageOf(
    part: number | string,
    whole: number | string,
): string {
    return preciseMultiply(preciseDivide(part, whole), 100);
}

/**
 * Check if a precise decimal value is zero
 */
export function preciseIsZero(value: number | string): boolean {
    return preciseEquals(value, 0);
}

/**
 * Check if a precise decimal value is positive
 */
export function preciseIsPositive(value: number | string): boolean {
    return preciseGreaterThan(value, 0);
}

/**
 * Check if a precise decimal value is negative
 */
export function preciseIsNegative(value: number | string): boolean {
    return preciseLessThan(value, 0);
}

/**
 * Clamp a precise decimal value between min and max
 */
export function preciseClamp(
    value: number | string,
    minValue: number | string,
    maxValue: number | string,
): string {
    if (preciseLessThan(value, minValue)) {
        return parseToString(minValue);
    }
    if (preciseGreaterThan(value, maxValue)) {
        return parseToString(maxValue);
    }
    return parseToString(value);
}

/**
 * Check if a precise decimal value is within a range (inclusive)
 */
export function preciseInRange(
    value: number | string,
    minValue: number | string,
    maxValue: number | string,
): boolean {
    return (
        preciseGreaterThanOrEqual(value, minValue) && 
        preciseLessThanOrEqual(value, maxValue)
    );
}

/**
 * Calculate average of multiple precise decimal values
 */
export function preciseAverage(...values: (number | string)[]): string {
    if (values.length === 0) {
        throw new Error('At least one value is required');
    }

    const total = preciseSum(...values);
    return preciseDivide(total, values.length);
}

/**
 * Distribute a precise decimal amount evenly, handling remainders
 * Returns array of string amounts that sum exactly to the original
 * 
 * @example
 * ```typescript
 * preciseDistribute('100', 3);  // ['33.34', '33.33', '33.33']
 * preciseDistribute('10', 3);   // ['3.34', '3.33', '3.33']
 * ```
 */
export function preciseDistribute(
    amount: number | string,
    parts: number,
    decimalPlaces: number = DEFAULT_PRECISION_DECIMAL_PLACES,
): string[] {
    if (parts <= 0) {
        throw new Error('Parts must be greater than zero');
    }

    const amountStr = parseToString(amount);
    const baseAmount = preciseRound(preciseDivide(amountStr, parts.toString()), decimalPlaces);
    const results: string[] = new Array(parts).fill(baseAmount);

    // Calculate and distribute remainder
    const total = preciseMultiply(baseAmount, parts.toString());
    let remainder = preciseSubtract(amountStr, total);

    const increment = '0.' + '0'.repeat(decimalPlaces - 1) + '1';
    let index = 0;

    while (!preciseIsZero(remainder) && index < parts) {
        if (preciseIsPositive(remainder)) {
            results[index] = preciseAdd(results[index], increment);
            remainder = preciseSubtract(remainder, increment);
        } else {
            results[index] = preciseSubtract(results[index], increment);
            remainder = preciseAdd(remainder, increment);
        }
        index++;
    }

    return results;
}

/**
 * Allocate a precise decimal amount proportionally based on ratios
 * Ensures the sum of allocated amounts equals the original total
 * 
 * @example
 * ```typescript
 * preciseAllocate('1000', [3, 2, 1]);  // ['500', '333.33', '166.67']
 * ```
 */
export function preciseAllocate(
    amount: number | string,
    ratios: number[],
    decimalPlaces: number = DEFAULT_PRECISION_DECIMAL_PLACES,
): string[] {
    if (ratios.length === 0) {
        throw new Error('At least one ratio is required');
    }

    if (ratios.some((r) => r < 0)) {
        throw new Error('Ratios must be non-negative');
    }

    const totalRatio = ratios.reduce((sum, r) => sum + r, 0);

    if (totalRatio === 0) {
        throw new Error('Total ratio must be greater than zero');
    }

    const amountStr = parseToString(amount);
    const results: string[] = [];
    let remainder = amountStr;

    for (let i = 0; i < ratios.length - 1; i++) {
        const share = preciseRound(
            preciseDivide(preciseMultiply(amountStr, ratios[i].toString()), totalRatio.toString()),
            decimalPlaces,
        );
        results.push(share);
        remainder = preciseSubtract(remainder, share);
    }

    // Last item gets the remainder to ensure exact total
    results.push(remainder);

    return results;
}

/**
 * Check if two precise decimal amounts are equal within a threshold
 * Useful for comparing amounts that may have accumulated small differences
 */
export function preciseEqualsWithinThreshold(
    a: number | string,
    b: number | string,
    threshold: string = PRECISION.EPSILON,
): boolean {
    const diff = preciseAbs(preciseSubtract(a, b));
    return preciseLessThanOrEqual(diff, threshold);
}

/**
 * Validate if a string represents a valid decimal number format
 */
export function isValidDecimalFormat(value: string): boolean {
    if (!value || typeof value !== 'string') {
        return false;
    }

    // Allow negative sign, digits, and one decimal point
    const pattern = /^-?\d+(\.\d+)?$/;
    return pattern.test(value.trim());
}

/**
 * Safely parse a value to a precise decimal string, returning default for invalid inputs
 */
export function safeParsePreciseString(
    value: any,
    defaultValue: string = '0',
): string {
    if (value === null || value === undefined) {
        return defaultValue;
    }

    if (typeof value === 'number') {
        if (!isValidNumber(value)) {
            return defaultValue;
        }
        return value.toString();
    }

    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (isValidDecimalFormat(trimmed)) {
            return trimmed;
        }
        // Try to extract number
        const extracted = trimmed.replace(/[^\d.-]/g, '');
        if (isValidDecimalFormat(extracted)) {
            return extracted;
        }
    }

    return defaultValue;
}
