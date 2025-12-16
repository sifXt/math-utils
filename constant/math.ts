/**
 * Math utility constants
 * Configuration for mathematical operations
 */

// =============================================================================
// PRECISION CONSTANTS
// =============================================================================

/**
 * Mathematical precision constants
 */
export const MATH_PRECISION = {
    /** Default precision for decimal calculations */
    DEFAULT: 10,
    /** High precision for financial calculations */
    HIGH: 20,
    /** Maximum safe precision */
    MAX: 15,
    /** Epsilon for floating-point comparisons */
    EPSILON: 1e-10,
} as const;

// =============================================================================
// ROUNDING MODES (Shared with Money utils but math-focused)
// =============================================================================

/**
 * Rounding modes for mathematical operations
 * 
 * @example
 * ```typescript
 * import { round, MathRoundingMode } from '@sifx/math-utils';
 * 
 * round(2.5, 0, MathRoundingMode.STANDARD); // 3
 * round(2.5, 0, MathRoundingMode.BANKERS);  // 2 (rounds to even)
 * round(2.3, 0, MathRoundingMode.CEIL);     // 3
 * round(2.7, 0, MathRoundingMode.FLOOR);    // 2
 * ```
 */
export enum MathRoundingMode {
    /** Standard mathematical rounding (round half up) */
    STANDARD = 'STANDARD',
    /** Round towards positive infinity */
    CEIL = 'CEIL',
    /** Round towards negative infinity */
    FLOOR = 'FLOOR',
    /** Truncate (round towards zero) */
    TRUNCATE = 'TRUNCATE',
    /** Banker's rounding (round half to even) */
    BANKERS = 'BANKERS',
}

/**
 * Default rounding mode used throughout the library
 * @default MathRoundingMode.STANDARD
 */
export const DEFAULT_MATH_ROUNDING_MODE = MathRoundingMode.STANDARD;

// =============================================================================
// COMMON MATHEMATICAL CONSTANTS
// =============================================================================

/**
 * Mathematical constants as precise strings
 * 
 * Provides high-precision string representations of common mathematical constants
 * 
 * @example
 * ```typescript
 * import { MATH_CONSTANTS } from '@sifx/math-utils';
 * 
 * console.log(MATH_CONSTANTS.PI);   // '3.14159265358979323846'
 * console.log(MATH_CONSTANTS.E);    // '2.71828182845904523536'
 * console.log(MATH_CONSTANTS.PHI);  // '1.61803398874989484820'
 * ```
 */
export const MATH_CONSTANTS = {
    /** Pi (π) - ratio of circumference to diameter */
    PI: '3.14159265358979323846',
    /** Euler's number (e) */
    E: '2.71828182845904523536',
    /** Square root of 2 */
    SQRT2: '1.41421356237309504880',
    /** Square root of 3 */
    SQRT3: '1.73205080756887729352',
    /** Golden ratio (φ) */
    PHI: '1.61803398874989484820',
    /** Natural logarithm of 2 */
    LN2: '0.69314718055994530942',
    /** Natural logarithm of 10 */
    LN10: '2.30258509299404568402',
} as const;

// =============================================================================
// STATISTICAL CONSTANTS
// =============================================================================

/**
 * Common statistical thresholds and values
 * 
 * Provides standard confidence levels and percentile values for statistical calculations
 * 
 * @example
 * ```typescript
 * import { STATISTICS } from '@sifx/math-utils';
 * 
 * console.log(STATISTICS.CONFIDENCE_LEVELS[95]); // 1.96 (z-score for 95% confidence)
 * console.log(STATISTICS.PERCENTILES.MEDIAN);     // 50
 * ```
 */
export const STATISTICS = {
    /** Standard confidence levels (z-scores) */
    CONFIDENCE_LEVELS: {
        90: 1.645,
        95: 1.96,
        99: 2.576,
    },
    /** Common percentiles */
    PERCENTILES: {
        QUARTILE_1: 25,
        MEDIAN: 50,
        QUARTILE_3: 75,
    },
} as const;

// =============================================================================
// ANGLE CONVERSION CONSTANTS
// =============================================================================

/**
 * Angle conversion constants
 * 
 * Provides conversion factors for degrees and radians
 * 
 * @example
 * ```typescript
 * import { ANGLE } from '@sifx/math-utils';
 * 
 * const radians = 90 * ANGLE.DEG_TO_RAD;  // Convert 90° to radians
 * const degrees = Math.PI * ANGLE.RAD_TO_DEG;  // Convert π radians to degrees (180°)
 * ```
 */
export const ANGLE = {
    /** Degrees to radians conversion factor (π / 180) */
    DEG_TO_RAD: Math.PI / 180,
    /** Radians to degrees conversion factor (180 / π) */
    RAD_TO_DEG: 180 / Math.PI,
} as const;

// =============================================================================
// PRECISE DECIMAL ARITHMETIC CONSTANTS
// =============================================================================

/**
 * Rounding modes for precise decimal arithmetic (BigInt-based)
 * 
 * These modes are used for string-based precise decimal operations
 * that avoid floating-point errors.
 * 
 * @example
 * ```typescript
 * import { preciseRound, PrecisionRoundingMode } from '@sifx/math-utils';
 * 
 * preciseRound('2.5', 0, PrecisionRoundingMode.HALF_UP);    // '3'
 * preciseRound('2.5', 0, PrecisionRoundingMode.HALF_EVEN);  // '2' (banker's)
 * preciseRound('2.5', 0, PrecisionRoundingMode.HALF_DOWN);  // '2'
 * ```
 */
export enum PrecisionRoundingMode {
    /** Round away from zero for positive, towards zero for negative */
    UP = 'UP',
    /** Round towards zero (truncate) */
    DOWN = 'DOWN',
    /** Round towards positive infinity */
    CEIL = 'CEIL',
    /** Round towards negative infinity */
    FLOOR = 'FLOOR',
    /** Round half away from zero (standard rounding) */
    HALF_UP = 'HALF_UP',
    /** Round half towards zero */
    HALF_DOWN = 'HALF_DOWN',
    /** Round half to even (Banker's rounding) - best for financial calculations */
    HALF_EVEN = 'HALF_EVEN',
    /** Round half towards positive infinity */
    HALF_CEIL = 'HALF_CEIL',
    /** Round half towards negative infinity */
    HALF_FLOOR = 'HALF_FLOOR',
}

/**
 * Default rounding mode for precise decimal operations
 * HALF_EVEN (Banker's rounding) is recommended for financial calculations
 * as it minimizes cumulative rounding errors
 * @default PrecisionRoundingMode.HALF_EVEN
 */
export const DEFAULT_PRECISION_ROUNDING_MODE = PrecisionRoundingMode.HALF_EVEN;

/**
 * Default decimal places for precise operations
 */
export const DEFAULT_PRECISION_DECIMAL_PLACES = 2;

/**
 * Precision constants for BigInt-based decimal arithmetic
 * 
 * @example
 * ```typescript
 * import { PRECISION } from '@sifx/math-utils';
 * 
 * preciseDivide('10', '3', PRECISION.HIGH);  // High precision division
 * ```
 */
export const PRECISION = {
    /** Default precision for division operations */
    DEFAULT: 20,
    /** High precision for critical calculations */
    HIGH: 40,
    /** Maximum practical precision */
    MAX: 100,
    /** Epsilon for precise decimal comparisons */
    EPSILON: '0.0000000001',
} as const;
