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

## Quick Reference

### Statistical Functions

```typescript
import * as M from '@/utils/math';

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
//   mode: [3],
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
import { round, ceil, floor, truncate, MathRoundingMode } from '@/utils/math';

round(123.456, 2);                           // 123.46
round(2.5, 0, MathRoundingMode.BANKERS);     // 2 (banker's rounding)
ceil(123.001, 2);                            // 123.01
floor(123.999, 2);                           // 123.99
truncate(-123.999, 2);                       // -123.99
```

### Percentages

```typescript
import { percent, percentOf, percentChange, addPercent, subtractPercent } from '@/utils/math';

percent(1000, 18);           // 180 (18% of 1000)
percentOf(25, 100);          // 25 (25 is 25% of 100)
percentChange(100, 150);     // 50 (50% increase)
addPercent(1000, 10);        // 1100 (add 10%)
subtractPercent(1000, 10);   // 900 (subtract 10%)
```

### Safe Parsing

```typescript
import { toNumber, safeToNumber, isValidNumber } from '@/utils/math';

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
import { min, max, clamp, inRange, compare, equals } from '@/utils/math';

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
import { lerp, inverseLerp, mapRange } from '@/utils/math';

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
import { distribute, allocate } from '@/utils/math';

// Even distribution (handles remainders)
distribute(100, 3);           // [33.34, 33.33, 33.33]

// Proportional allocation
allocate(1000, [3, 2, 1]);    // [500, 333.33, 166.67]
// Sums exactly to 1000
```

### Power & Root Functions

```typescript
import { pow, sqrt, cbrt, nthRoot, ln, log10, log, exp } from '@/utils/math';

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
import { abs, sign, isPositive, isNegative, isZero, isInteger, isEven, isOdd } from '@/utils/math';

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
import { degreesToRadians, radiansToDegrees } from '@/utils/math';

degreesToRadians(180);        // π (3.14159...)
radiansToDegrees(Math.PI);    // 180
```

## Why @sifx/math-utils?

✅ **Type Safe** - Full TypeScript support with comprehensive type definitions  
✅ **Zero Dependencies** - Lightweight and self-contained  
✅ **Well Documented** - JSDoc comments for all functions  
✅ **Thoroughly Tested** - Comprehensive test coverage  
✅ **Tree Shakeable** - Import only what you need  
✅ **Production Ready** - Battle-tested in production environments

## API Reference

### Statistical
- `mean(...values)` - Arithmetic mean
- `median(...values)` - Middle value
- `mode(...values)` - Most frequent values (array)
- `variance(...values)` - Sample variance
- `populationVariance(...values)` - Population variance
- `standardDeviation(...values)` - Sample std dev
- `populationStandardDeviation(...values)` - Population std dev
- `statistics(...values)` - Complete statistics object
- `percentile(values, p)` - p-th percentile (0-100)

### Rounding
- `round(value, decimals?, mode?)` - Round with mode
- `ceil(value, decimals?)` - Round up
- `floor(value, decimals?)` - Round down
- `truncate(value, decimals?)` - Truncate towards zero

### Arithmetic
- `add(...values)` - Sum
- `subtract(first, ...rest)` - Difference
- `multiply(...values)` - Product
- `divide(first, ...divisors)` - Division
- `mod(value, divisor)` - Modulo

### Power & Roots
- `pow(base, exponent)` - Power
- `sqrt(value)` - Square root
- `cbrt(value)` - Cube root
- `nthRoot(value, n)` - Nth root

### Comparison
- `min(...values)` / `max(...values)`
- `clamp(value, min, max)`
- `inRange(value, min, max)`
- `compare(a, b)` - Returns -1, 0, or 1
- `equals(a, b, epsilon?)`

### Percentage
- `percent(value, percentage)` - Calculate percentage
- `percentOf(part, whole)` - What % is part of whole
- `percentChange(old, new)` - % change
- `addPercent(value, pct)` - Add percentage
- `subtractPercent(value, pct)` - Subtract percentage

### Interpolation
- `lerp(start, end, t)` - Linear interpolation
- `inverseLerp(start, end, value)` - Find t
- `mapRange(value, inMin, inMax, outMin, outMax)`

### Logarithmic
- `ln(value)` - Natural log
- `log10(value)` - Base 10 log
- `log(value, base)` - Custom base log
- `exp(value)` - e^x

### Distribution
- `distribute(total, parts, decimals?)` - Even split
- `allocate(total, ratios, decimals?)` - Proportional split

### Utilities
- `abs(value)` - Absolute value
- `sign(value)` - Sign (-1, 0, 1)
- `isPositive(value)` / `isNegative(value)` / `isZero(value, epsilon?)`
- `isInteger(value)` / `isEven(value)` / `isOdd(value)`

### Parsing
- `toNumber(value)` - Parse to number (throws on invalid)
- `safeToNumber(value, default?)` - Safe parse with fallback
- `isValidNumber(value)` - Validate

### Angle
- `degreesToRadians(degrees)` - Degrees to radians
- `radiansToDegrees(radians)` - Radians to degrees

