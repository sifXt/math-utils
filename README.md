# @sifx/math-utils

A comprehensive TypeScript math utilities library with type-safe operations, statistical functions, and interpolation tools.

[![npm version](https://img.shields.io/npm/v/@sifx/math-utils.svg)](https://www.npmjs.com/package/@sifx/math-utils)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install @sifx/math-utils
```

```bash
yarn add @sifx/math-utils
```

```bash
pnpm add @sifx/math-utils
```

## Quick Start

```typescript
import * as MathUtils from '@sifx/math-utils';
// or specific functions
import { mean, median, standardDeviation } from '@sifx/math-utils';

// Calculate statistics
const avg = mean(1, 2, 3, 4, 5);  // 3
const med = median(1, 2, 3, 4, 5); // 3

// Rounding with different modes
import { round, MathRoundingMode } from '@sifx/math-utils';
round(2.5, 0, MathRoundingMode.BANKERS); // 2 (banker's rounding)

// Percentage calculations
import { percent, percentChange } from '@sifx/math-utils';
percent(1000, 18);       // 180 (18% of 1000)
percentChange(100, 150); // 50 (50% increase)
```

## Features

✅ **Type Safe** - Accepts both numbers and strings  
✅ **Statistical Functions** - Mean, median, mode, variance, percentiles  
✅ **Multiple Rounding Modes** - Standard, ceil, floor, truncate, banker's  
✅ **Safe Parsing** - Handles invalid inputs gracefully  
✅ **Distribution** - Even and proportional allocation  
✅ **Interpolation** - Linear interpolation and range mapping  
✅ **Precise Decimal Arithmetic** - BigInt-based operations with zero floating-point errors  

## Quick Reference

### Precise Decimal Arithmetic (BigInt-based)

For financial calculations or any scenario where floating-point errors are unacceptable, use the `precise*` functions. These use BigInt internally and return string results for maximum precision.

```typescript
import {
    preciseAdd,
    preciseSubtract,
    preciseMultiply,
    preciseDivide,
    preciseRound,
    PrecisionRoundingMode,
} from '@sifx/math-utils';

// Zero floating-point errors
preciseAdd('0.1', '0.2');        // '0.3' (not 0.30000000000000004)
preciseMultiply('0.1', '0.2');   // '0.02' (not 0.020000000000000004)

// Arbitrary precision division
preciseDivide('1', '3');         // '0.33333333333333333333' (20 decimal places)
preciseDivide('10', '3', 4);     // '3.3333' (custom precision)

// Multiple rounding modes
preciseRound('2.5', 0, PrecisionRoundingMode.HALF_UP);    // '3'
preciseRound('2.5', 0, PrecisionRoundingMode.HALF_EVEN);  // '2' (banker's rounding)
preciseRound('2.555', 2);                                  // '2.56'

// Comparisons
preciseCompare('0.1', '0.2');    // -1
preciseEquals('0.30', '0.3');    // true
preciseGreaterThan('1.5', '1');  // true

// Percentage operations
precisePercentage('1000', '18');        // '180' (18% of 1000)
preciseAddPercentage('1000', '10');     // '1100' (add 10%)
precisePercentageOf('25', '100');       // '25' (25 is 25% of 100)

// Distribution
preciseDistribute('100', 3);            // ['33.34', '33.33', '33.33']
preciseAllocate('1000', [3, 2, 1]);     // ['500', '333.33', '166.67']
```

### Statistical Functions

```typescript
import * as M from '@sifx/math-utils';

M.mean(1, 2, 3, 4, 5);           // 3
M.median(1, 2, 3, 4, 5);         // 3
M.mode(1, 2, 2, 3, 3, 3);        // [3]
M.variance(2, 4, 4, 4, 5, 5, 7, 9);  // ~4.57
M.standardDeviation(...values);  // sqrt(variance)

// Complete statistics
M.statistics(1, 2, 3, 4, 5);
// {
//   count: 5,
//   sum: 15,
//   mean: 3,
//   median: 3,
//   mode: [1, 2, 3, 4, 5],
//   min: 1,
//   max: 5,
//   range: 4,
//   variance: 2.5,
//   standardDeviation: 1.58
// }

// Percentiles
M.percentile([1, 2, 3, 4, 5], 50);  // 3 (median)
M.percentile([1, 2, 3, 4, 5], 25);  // 2 (Q1)
M.percentile([1, 2, 3, 4, 5], 75);  // 4 (Q3)
```

### Rounding

```typescript
import { round, ceil, floor, truncate, MathRoundingMode } from '@sifx/math-utils';

round(123.456, 2);                           // 123.46
round(2.5, 0, MathRoundingMode.BANKERS);     // 2 (banker's rounding)
ceil(123.001, 2);                            // 123.01
floor(123.999, 2);                           // 123.99
truncate(-123.999, 2);                       // -123.99
```

### Percentages

```typescript
import { percent, percentOf, percentChange, addPercent, subtractPercent } from '@sifx/math-utils';

percent(1000, 18);           // 180 (18% of 1000)
percentOf(25, 100);          // 25 (25 is 25% of 100)
percentChange(100, 150);     // 50 (50% increase)
addPercent(1000, 10);        // 1100 (add 10%)
subtractPercent(1000, 10);   // 900 (subtract 10%)
```

### Safe Parsing

```typescript
import { toNumber, safeToNumber, isValidNumber } from '@sifx/math-utils';

toNumber('123.45');           // 123.45
toNumber('invalid');          // throws Error

safeToNumber('invalid');      // 0 (default)
safeToNumber('invalid', 10);  // 10 (custom default)
safeToNumber(null);           // 0
safeToNumber(NaN);            // 0

isValidNumber(123);           // true
isValidNumber('123.45');      // true
isValidNumber(NaN);           // false
isValidNumber(Infinity);      // false
```

### Comparison & Range

```typescript
import { min, max, clamp, inRange, compare, equals } from '@sifx/math-utils';

min(5, 2, 8, 1);              // 1
max(5, 2, 8, 1);              // 8
clamp(15, 0, 10);             // 10
clamp(-5, 0, 10);             // 0
inRange(5, 0, 10);            // true

compare(5, 3);                // 1 (a > b)
compare(3, 5);                // -1 (a < b)
compare(5, 5);                // 0 (equal)

equals(5.000001, 5, 0.001);   // true (within epsilon)
```

### Interpolation

```typescript
import { lerp, inverseLerp, mapRange } from '@sifx/math-utils';

// Linear interpolation
lerp(0, 100, 0.5);            // 50 (halfway between 0 and 100)
lerp(0, 100, 0.25);           // 25

// Inverse - find the t value
inverseLerp(0, 100, 50);      // 0.5

// Map from one range to another
mapRange(5, 0, 10, 0, 100);   // 50
mapRange(25, 0, 100, 0, 1);   // 0.25
```

### Distribution

```typescript
import { distribute, allocate } from '@sifx/math-utils';

// Even distribution (handles remainders)
distribute(100, 3);           // [33.34, 33.33, 33.33]

// Proportional allocation
allocate(1000, [3, 2, 1]);    // [500, 333.33, 166.67]
// Sums exactly to 1000
```

### Basic Arithmetic

```typescript
import { add, subtract, multiply, divide, mod } from '@sifx/math-utils';

add(1, 2, 3, 4);              // 10
subtract(10, 3, 2);           // 5
multiply(2, 3, 4);            // 24
divide(100, 2, 5);            // 10
mod(17, 5);                   // 2
```

### Power & Root Functions

```typescript
import { pow, sqrt, cbrt, nthRoot, ln, log10, log, exp } from '@sifx/math-utils';

pow(2, 3);                    // 8
sqrt(16);                     // 4
cbrt(27);                     // 3
nthRoot(16, 4);               // 2

ln(Math.E);                   // 1
log10(100);                   // 2
log(8, 2);                    // 3 (log base 2 of 8)
exp(1);                       // 2.718...
```

### Utility Functions

```typescript
import { abs, sign, isPositive, isNegative, isZero, isInteger, isEven, isOdd } from '@sifx/math-utils';

abs(-5);                      // 5
sign(-5);                     // -1
sign(0);                      // 0
sign(5);                      // 1

isPositive(5);                // true
isNegative(-5);               // true
isZero(0);                    // true
isZero(0.0000001);            // true (within epsilon)

isInteger(5);                 // true
isInteger(5.5);               // false
isEven(4);                    // true
isOdd(5);                     // true
```

### Angle Conversions

```typescript
import { degreesToRadians, radiansToDegrees } from '@sifx/math-utils';

degreesToRadians(180);        // π (3.14159...)
radiansToDegrees(Math.PI);    // 180
```

## Constants

### MATH_PRECISION

Precision constants for mathematical operations.

```typescript
import { MATH_PRECISION } from '@sifx/math-utils';

MATH_PRECISION.DEFAULT;       // 10 - Default precision for decimal calculations
MATH_PRECISION.HIGH;          // 20 - High precision for financial calculations
MATH_PRECISION.MAX;           // 15 - Maximum safe precision
MATH_PRECISION.EPSILON;       // 1e-10 - Epsilon for floating-point comparisons
```

### MathRoundingMode

Rounding modes for mathematical operations.

```typescript
import { MathRoundingMode } from '@sifx/math-utils';

MathRoundingMode.STANDARD;    // Standard mathematical rounding (round half up)
MathRoundingMode.CEIL;        // Round towards positive infinity
MathRoundingMode.FLOOR;       // Round towards negative infinity
MathRoundingMode.TRUNCATE;    // Truncate (round towards zero)
MathRoundingMode.BANKERS;     // Banker's rounding (round half to even)
```

### MATH_CONSTANTS

High-precision string representations of common mathematical constants.

```typescript
import { MATH_CONSTANTS } from '@sifx/math-utils';

MATH_CONSTANTS.PI;            // '3.14159265358979323846' - Pi (π)
MATH_CONSTANTS.E;             // '2.71828182845904523536' - Euler's number
MATH_CONSTANTS.SQRT2;         // '1.41421356237309504880' - Square root of 2
MATH_CONSTANTS.SQRT3;         // '1.73205080756887729352' - Square root of 3
MATH_CONSTANTS.PHI;           // '1.61803398874989484820' - Golden ratio (φ)
MATH_CONSTANTS.LN2;           // '0.69314718055994530942' - Natural logarithm of 2
MATH_CONSTANTS.LN10;          // '2.30258509299404568402' - Natural logarithm of 10
```

### STATISTICS

Common statistical thresholds and values.

```typescript
import { STATISTICS } from '@sifx/math-utils';

// Standard confidence levels (z-scores)
STATISTICS.CONFIDENCE_LEVELS[90];   // 1.645
STATISTICS.CONFIDENCE_LEVELS[95];   // 1.96
STATISTICS.CONFIDENCE_LEVELS[99];   // 2.576

// Common percentiles
STATISTICS.PERCENTILES.QUARTILE_1;  // 25
STATISTICS.PERCENTILES.MEDIAN;      // 50
STATISTICS.PERCENTILES.QUARTILE_3;  // 75
```

### ANGLE

Angle conversion constants.

```typescript
import { ANGLE } from '@sifx/math-utils';

ANGLE.DEG_TO_RAD;             // π / 180 - Degrees to radians conversion factor
ANGLE.RAD_TO_DEG;             // 180 / π - Radians to degrees conversion factor

// Usage
const radians = 90 * ANGLE.DEG_TO_RAD;       // Convert 90° to radians
const degrees = Math.PI * ANGLE.RAD_TO_DEG;  // Convert π radians to degrees (180°)
```

## Why @sifx/math-utils?

✅ **Type Safe** - Full TypeScript support with comprehensive type definitions  
✅ **Zero Dependencies** - Lightweight and self-contained  
✅ **Well Documented** - JSDoc comments for all functions  
✅ **Thoroughly Tested** - Comprehensive test coverage  
✅ **Tree Shakeable** - Import only what you need  
✅ **Production Ready** - Battle-tested in production environments

## API Reference

### Types

| Type | Description |
|------|-------------|
| `NumericInput` | `number \| string` - Input type accepted by most functions |
| `StatisticsResult` | Object containing comprehensive statistics (count, sum, mean, median, mode, min, max, range, variance, standardDeviation) |
| `PercentileResult` | Object containing value and percentile |

### Parsing and Validation

| Function | Signature | Description |
|----------|-----------|-------------|
| `toNumber` | `(value: NumericInput) => number` | Parse input to number, throws on invalid input |
| `safeToNumber` | `(value: any, defaultValue?: number) => number` | Safely parse to number with fallback (default: 0) |
| `isValidNumber` | `(value: any) => boolean` | Check if value is a valid finite number |

### Rounding Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `round` | `(value: NumericInput, decimalPlaces?: number, mode?: MathRoundingMode) => number` | Round with configurable mode |
| `ceil` | `(value: NumericInput, decimalPlaces?: number) => number` | Round up to decimal places |
| `floor` | `(value: NumericInput, decimalPlaces?: number) => number` | Round down to decimal places |
| `truncate` | `(value: NumericInput, decimalPlaces?: number) => number` | Truncate towards zero |

### Basic Arithmetic

| Function | Signature | Description |
|----------|-----------|-------------|
| `add` | `(...values: NumericInput[]) => number` | Add multiple numbers |
| `subtract` | `(first: NumericInput, ...rest: NumericInput[]) => number` | Subtract numbers (a - b - c - ...) |
| `multiply` | `(...values: NumericInput[]) => number` | Multiply numbers |
| `divide` | `(first: NumericInput, ...divisors: NumericInput[]) => number` | Divide numbers (a / b / c / ...) |
| `mod` | `(value: NumericInput, divisor: NumericInput) => number` | Calculate modulo (remainder) |

### Power and Root Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `pow` | `(base: NumericInput, exponent: NumericInput) => number` | Calculate power |
| `sqrt` | `(value: NumericInput) => number` | Calculate square root |
| `cbrt` | `(value: NumericInput) => number` | Calculate cube root |
| `nthRoot` | `(value: NumericInput, n: NumericInput) => number` | Calculate nth root |

### Comparison Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `min` | `(...values: NumericInput[]) => number` | Get minimum value |
| `max` | `(...values: NumericInput[]) => number` | Get maximum value |
| `clamp` | `(value: NumericInput, minVal: NumericInput, maxVal: NumericInput) => number` | Clamp value between min and max |
| `inRange` | `(value: NumericInput, minVal: NumericInput, maxVal: NumericInput) => boolean` | Check if value is within range (inclusive) |
| `compare` | `(a: NumericInput, b: NumericInput) => -1 \| 0 \| 1` | Compare two numbers |
| `equals` | `(a: NumericInput, b: NumericInput, epsilon?: number) => boolean` | Check equality within epsilon |

### Statistical Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `sum` | `(...values: NumericInput[]) => number` | Calculate sum |
| `mean` | `(...values: NumericInput[]) => number` | Calculate mean (average) |
| `median` | `(...values: NumericInput[]) => number` | Calculate median |
| `mode` | `(...values: NumericInput[]) => number[]` | Calculate mode (most frequent values) |
| `variance` | `(...values: NumericInput[]) => number` | Calculate sample variance |
| `populationVariance` | `(...values: NumericInput[]) => number` | Calculate population variance |
| `standardDeviation` | `(...values: NumericInput[]) => number` | Calculate sample standard deviation |
| `populationStandardDeviation` | `(...values: NumericInput[]) => number` | Calculate population standard deviation |
| `statistics` | `(...values: NumericInput[]) => StatisticsResult` | Calculate comprehensive statistics |
| `percentile` | `(values: NumericInput[], p: number) => number` | Calculate p-th percentile (0-100) |

### Percentage Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `percent` | `(value: NumericInput, percentage: NumericInput) => number` | Calculate percentage of a value |
| `percentOf` | `(part: NumericInput, whole: NumericInput) => number` | Calculate what percentage one value is of another |
| `percentChange` | `(oldValue: NumericInput, newValue: NumericInput) => number` | Calculate percentage change |
| `addPercent` | `(value: NumericInput, percentage: NumericInput) => number` | Add percentage to value |
| `subtractPercent` | `(value: NumericInput, percentage: NumericInput) => number` | Subtract percentage from value |

### Utility Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `abs` | `(value: NumericInput) => number` | Get absolute value |
| `sign` | `(value: NumericInput) => -1 \| 0 \| 1` | Get sign of a number |
| `isPositive` | `(value: NumericInput) => boolean` | Check if number is positive |
| `isNegative` | `(value: NumericInput) => boolean` | Check if number is negative |
| `isZero` | `(value: NumericInput, epsilon?: number) => boolean` | Check if number is zero (within epsilon) |
| `isInteger` | `(value: NumericInput) => boolean` | Check if number is an integer |
| `isEven` | `(value: NumericInput) => boolean` | Check if number is even |
| `isOdd` | `(value: NumericInput) => boolean` | Check if number is odd |

### Angle Conversions

| Function | Signature | Description |
|----------|-----------|-------------|
| `degreesToRadians` | `(degrees: NumericInput) => number` | Convert degrees to radians |
| `radiansToDegrees` | `(radians: NumericInput) => number` | Convert radians to degrees |

### Logarithmic Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `ln` | `(value: NumericInput) => number` | Natural logarithm (base e) |
| `log10` | `(value: NumericInput) => number` | Logarithm base 10 |
| `log` | `(value: NumericInput, base: NumericInput) => number` | Logarithm with custom base |
| `exp` | `(value: NumericInput) => number` | Exponential function (e^x) |

### Interpolation Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `lerp` | `(start: NumericInput, end: NumericInput, t: NumericInput) => number` | Linear interpolation between two values |
| `inverseLerp` | `(start: NumericInput, end: NumericInput, value: NumericInput) => number` | Inverse linear interpolation (find t given value) |
| `mapRange` | `(value: NumericInput, inMin: NumericInput, inMax: NumericInput, outMin: NumericInput, outMax: NumericInput) => number` | Map value from one range to another |

### Distribution Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `distribute` | `(total: NumericInput, parts: number, decimalPlaces?: number) => number[]` | Distribute total evenly across N parts |
| `allocate` | `(total: NumericInput, ratios: NumericInput[], decimalPlaces?: number) => number[]` | Allocate total proportionally based on ratios |

### Precise Decimal Arithmetic (BigInt-based)

These functions use BigInt internally for zero floating-point errors. All inputs accept `number | string` and return `string` for maximum precision. Ideal for financial calculations.

#### Parsing Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `parseToString` | `(value: number \| string) => string` | Parse a number or string to precise string representation |
| `isValidDecimalFormat` | `(value: string) => boolean` | Validate if string is a valid decimal format |
| `safeParsePreciseString` | `(value: any, defaultValue?: string) => string` | Safely parse to precise string with fallback |

#### Precise Arithmetic

| Function | Signature | Description |
|----------|-----------|-------------|
| `preciseAdd` | `(a: number \| string, b: number \| string) => string` | Add two decimals with arbitrary precision |
| `preciseSubtract` | `(a: number \| string, b: number \| string) => string` | Subtract two decimals (a - b) |
| `preciseMultiply` | `(a: number \| string, b: number \| string) => string` | Multiply two decimals |
| `preciseDivide` | `(a: number \| string, b: number \| string, precision?: number) => string` | Divide with configurable precision (default: 20) |
| `preciseNegate` | `(value: number \| string) => string` | Negate a value |
| `preciseAbs` | `(value: number \| string) => string` | Get absolute value |

#### Precise Rounding

| Function | Signature | Description |
|----------|-----------|-------------|
| `preciseRound` | `(value: number \| string, decimalPlaces?: number, mode?: PrecisionRoundingMode) => string` | Round with multiple modes (default: HALF_EVEN) |

#### Precise Comparison

| Function | Signature | Description |
|----------|-----------|-------------|
| `preciseCompare` | `(a: number \| string, b: number \| string) => -1 \| 0 \| 1` | Compare two decimals |
| `preciseEquals` | `(a: number \| string, b: number \| string) => boolean` | Check equality |
| `preciseGreaterThan` | `(a: number \| string, b: number \| string) => boolean` | Check if a > b |
| `preciseGreaterThanOrEqual` | `(a: number \| string, b: number \| string) => boolean` | Check if a >= b |
| `preciseLessThan` | `(a: number \| string, b: number \| string) => boolean` | Check if a < b |
| `preciseLessThanOrEqual` | `(a: number \| string, b: number \| string) => boolean` | Check if a <= b |
| `preciseEqualsWithinThreshold` | `(a: number \| string, b: number \| string, threshold?: string) => boolean` | Check equality within threshold |

#### Precise Aggregation

| Function | Signature | Description |
|----------|-----------|-------------|
| `preciseMin` | `(...values: (number \| string)[]) => string` | Get minimum value |
| `preciseMax` | `(...values: (number \| string)[]) => string` | Get maximum value |
| `preciseSum` | `(...values: (number \| string)[]) => string` | Sum multiple values |
| `preciseAverage` | `(...values: (number \| string)[]) => string` | Calculate average |
| `preciseClamp` | `(value, minValue, maxValue) => string` | Clamp value between min and max |
| `preciseInRange` | `(value, minValue, maxValue) => boolean` | Check if value is within range |

#### Precise Percentage

| Function | Signature | Description |
|----------|-----------|-------------|
| `precisePercentage` | `(value: number \| string, percent: number \| string) => string` | Calculate percentage of value |
| `preciseAddPercentage` | `(value: number \| string, percent: number \| string) => string` | Add percentage to value |
| `preciseSubtractPercentage` | `(value: number \| string, percent: number \| string) => string` | Subtract percentage from value |
| `precisePercentageOf` | `(part: number \| string, whole: number \| string) => string` | What percentage is part of whole |

#### Precise Validation

| Function | Signature | Description |
|----------|-----------|-------------|
| `preciseIsZero` | `(value: number \| string) => boolean` | Check if value is zero |
| `preciseIsPositive` | `(value: number \| string) => boolean` | Check if value is positive |
| `preciseIsNegative` | `(value: number \| string) => boolean` | Check if value is negative |

#### Precise Distribution

| Function | Signature | Description |
|----------|-----------|-------------|
| `preciseDistribute` | `(amount: number \| string, parts: number, decimalPlaces?: number) => string[]` | Distribute evenly with remainder handling |
| `preciseAllocate` | `(amount: number \| string, ratios: number[], decimalPlaces?: number) => string[]` | Allocate proportionally based on ratios |

### Constants Reference

| Constant | Description |
|----------|-------------|
| `MATH_PRECISION` | Precision constants (DEFAULT, HIGH, MAX, EPSILON) |
| `MathRoundingMode` | Rounding mode enum (STANDARD, CEIL, FLOOR, TRUNCATE, BANKERS) |
| `DEFAULT_MATH_ROUNDING_MODE` | Default rounding mode (MathRoundingMode.STANDARD) |
| `MATH_CONSTANTS` | Mathematical constants (PI, E, SQRT2, SQRT3, PHI, LN2, LN10) |
| `STATISTICS` | Statistical thresholds (CONFIDENCE_LEVELS, PERCENTILES) |
| `ANGLE` | Angle conversion factors (DEG_TO_RAD, RAD_TO_DEG) |
| `PrecisionRoundingMode` | Precise rounding modes (UP, DOWN, CEIL, FLOOR, HALF_UP, HALF_DOWN, HALF_EVEN, HALF_CEIL, HALF_FLOOR) |
| `DEFAULT_PRECISION_ROUNDING_MODE` | Default precise rounding mode (PrecisionRoundingMode.HALF_EVEN) |
| `DEFAULT_PRECISION_DECIMAL_PLACES` | Default decimal places for precise operations (2) |
| `PRECISION` | Precision constants for BigInt operations (DEFAULT: 20, HIGH: 40, MAX: 100, EPSILON) |

## When to Use Precise vs Standard Functions

| Use Case | Recommended | Reason |
|----------|-------------|--------|
| Financial calculations | `precise*` functions | Zero floating-point errors |
| Money/currency operations | `precise*` functions | Exact decimal representation |
| Tax, interest, invoicing | `precise*` functions | Audit-friendly precision |
| Scientific calculations | Standard functions | Faster, sufficient precision |
| Graphics/games | Standard functions | Performance critical |
| Statistics | Standard functions | Floating-point acceptable |
| General math | Standard functions | Simpler, returns numbers |

