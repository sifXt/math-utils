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
