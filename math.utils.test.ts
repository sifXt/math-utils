/**
 * Math Utilities Test Suite
 * Comprehensive tests for all math utility functions
 */

import * as MathUtils from './math.utils';
import { MathRoundingMode } from './constant/math';

describe('Math Utilities', () => {
    describe('Parsing and Validation', () => {
        test('toNumber - should parse string to number', () => {
            expect(MathUtils.toNumber('123.45')).toBe(123.45);
            expect(MathUtils.toNumber(123)).toBe(123);
        });

        test('toNumber - should throw on invalid input', () => {
            expect(() => MathUtils.toNumber('invalid')).toThrow(
                'Invalid numeric value',
            );
        });

        test('safeToNumber - should return default for invalid', () => {
            expect(MathUtils.safeToNumber('invalid')).toBe(0);
            expect(MathUtils.safeToNumber(null, 10)).toBe(10);
            expect(MathUtils.safeToNumber(undefined)).toBe(0);
        });

        test('isValidNumber - should validate numbers', () => {
            expect(MathUtils.isValidNumber(123)).toBe(true);
            expect(MathUtils.isValidNumber('123.45')).toBe(true);
            expect(MathUtils.isValidNumber(NaN)).toBe(false);
            expect(MathUtils.isValidNumber(Infinity)).toBe(false);
        });
    });

    describe('Rounding Functions', () => {
        test('round - standard rounding', () => {
            expect(MathUtils.round(123.456, 2)).toBe(123.46);
            expect(MathUtils.round(123.454, 2)).toBe(123.45);
            expect(MathUtils.round(123.5, 0)).toBe(124);
        });

        test("round - banker's rounding", () => {
            expect(MathUtils.round(2.5, 0, MathRoundingMode.BANKERS)).toBe(2);
            expect(MathUtils.round(3.5, 0, MathRoundingMode.BANKERS)).toBe(4);
            expect(MathUtils.round(2.55, 1, MathRoundingMode.BANKERS)).toBe(
                2.6,
            );
        });

        test('ceil - should round up', () => {
            expect(MathUtils.ceil(123.001, 2)).toBe(123.01);
            expect(MathUtils.ceil(123.999, 0)).toBe(124);
        });

        test('floor - should round down', () => {
            expect(MathUtils.floor(123.999, 2)).toBe(123.99);
            expect(MathUtils.floor(123.999, 0)).toBe(123);
        });

        test('truncate - should truncate towards zero', () => {
            expect(MathUtils.truncate(123.999, 2)).toBe(123.99);
            expect(MathUtils.truncate(-123.999, 2)).toBe(-123.99);
        });
    });

    describe('Basic Arithmetic', () => {
        test('add - should add numbers', () => {
            expect(MathUtils.add(1, 2, 3)).toBe(6);
            expect(MathUtils.add('1.5', '2.5')).toBe(4);
        });

        test('subtract - should subtract numbers', () => {
            expect(MathUtils.subtract(10, 3, 2)).toBe(5);
            expect(MathUtils.subtract('10', '3')).toBe(7);
        });

        test('multiply - should multiply numbers', () => {
            expect(MathUtils.multiply(2, 3, 4)).toBe(24);
            expect(MathUtils.multiply('2.5', '4')).toBe(10);
        });

        test('divide - should divide numbers', () => {
            expect(MathUtils.divide(24, 4, 2)).toBe(3);
            expect(MathUtils.divide('10', '2')).toBe(5);
        });

        test('divide - should throw on division by zero', () => {
            expect(() => MathUtils.divide(10, 0)).toThrow('Division by zero');
        });

        test('mod - should calculate modulo', () => {
            expect(MathUtils.mod(10, 3)).toBe(1);
            expect(MathUtils.mod(15, 5)).toBe(0);
        });
    });

    describe('Power and Root Functions', () => {
        test('pow - should calculate power', () => {
            expect(MathUtils.pow(2, 3)).toBe(8);
            expect(MathUtils.pow(4, 0.5)).toBe(2);
        });

        test('sqrt - should calculate square root', () => {
            expect(MathUtils.sqrt(16)).toBe(4);
            expect(MathUtils.sqrt(2)).toBeCloseTo(1.414, 2);
        });

        test('sqrt - should throw for negative numbers', () => {
            expect(() => MathUtils.sqrt(-1)).toThrow();
        });

        test('cbrt - should calculate cube root', () => {
            expect(MathUtils.cbrt(27)).toBe(3);
            expect(MathUtils.cbrt(-8)).toBe(-2);
        });

        test('nthRoot - should calculate nth root', () => {
            expect(MathUtils.nthRoot(16, 4)).toBe(2);
            expect(MathUtils.nthRoot(27, 3)).toBe(3);
        });
    });

    describe('Comparison Functions', () => {
        test('min - should return minimum', () => {
            expect(MathUtils.min(5, 2, 8, 1)).toBe(1);
        });

        test('max - should return maximum', () => {
            expect(MathUtils.max(5, 2, 8, 1)).toBe(8);
        });

        test('clamp - should clamp value', () => {
            expect(MathUtils.clamp(15, 0, 10)).toBe(10);
            expect(MathUtils.clamp(-5, 0, 10)).toBe(0);
            expect(MathUtils.clamp(5, 0, 10)).toBe(5);
        });

        test('inRange - should check range', () => {
            expect(MathUtils.inRange(5, 0, 10)).toBe(true);
            expect(MathUtils.inRange(15, 0, 10)).toBe(false);
        });

        test('compare - should compare numbers', () => {
            expect(MathUtils.compare(5, 3)).toBe(1);
            expect(MathUtils.compare(3, 5)).toBe(-1);
            expect(MathUtils.compare(5, 5)).toBe(0);
        });

        test('equals - should check equality', () => {
            expect(MathUtils.equals(5, 5)).toBe(true);
            expect(MathUtils.equals(5.000000001, 5, 0.01)).toBe(true);
        });
    });

    describe('Statistical Functions', () => {
        test('sum - should calculate sum', () => {
            expect(MathUtils.sum(1, 2, 3, 4, 5)).toBe(15);
        });

        test('mean - should calculate mean', () => {
            expect(MathUtils.mean(1, 2, 3, 4, 5)).toBe(3);
        });

        test('median - should calculate median (odd count)', () => {
            expect(MathUtils.median(1, 3, 5, 7, 9)).toBe(5);
        });

        test('median - should calculate median (even count)', () => {
            expect(MathUtils.median(1, 2, 3, 4)).toBe(2.5);
        });

        test('mode - should find mode', () => {
            expect(MathUtils.mode(1, 2, 2, 3, 3, 3)).toEqual([3]);
            expect(MathUtils.mode(1, 1, 2, 2)).toEqual([1, 2]);
        });

        test('variance - should calculate variance', () => {
            const v = MathUtils.variance(2, 4, 4, 4, 5, 5, 7, 9);
            expect(MathUtils.round(v, 2)).toBe(4.57);
        });

        test('standardDeviation - should calculate std dev', () => {
            const sd = MathUtils.standardDeviation(2, 4, 4, 4, 5, 5, 7, 9);
            expect(MathUtils.round(sd, 2)).toBe(2.14);
        });

        test('statistics - should return all statistics', () => {
            const stats = MathUtils.statistics(1, 2, 3, 4, 5);
            expect(stats.count).toBe(5);
            expect(stats.sum).toBe(15);
            expect(stats.mean).toBe(3);
            expect(stats.median).toBe(3);
            expect(stats.min).toBe(1);
            expect(stats.max).toBe(5);
            expect(stats.range).toBe(4);
        });

        test('percentile - should calculate percentile', () => {
            expect(MathUtils.percentile([1, 2, 3, 4, 5], 50)).toBe(3);
            expect(MathUtils.percentile([1, 2, 3, 4, 5], 0)).toBe(1);
            expect(MathUtils.percentile([1, 2, 3, 4, 5], 100)).toBe(5);
        });
    });

    describe('Percentage Functions', () => {
        test('percent - should calculate percentage', () => {
            expect(MathUtils.percent(100, 25)).toBe(25);
            expect(MathUtils.percent(200, 15)).toBe(30);
        });

        test('percentOf - should calculate percent of whole', () => {
            expect(MathUtils.percentOf(25, 100)).toBe(25);
            expect(MathUtils.percentOf(50, 200)).toBe(25);
        });

        test('percentChange - should calculate percent change', () => {
            expect(MathUtils.percentChange(100, 150)).toBe(50);
            expect(MathUtils.percentChange(100, 50)).toBe(-50);
        });

        test('addPercent - should add percentage', () => {
            expect(MathUtils.addPercent(100, 10)).toBeCloseTo(110);
        });

        test('subtractPercent - should subtract percentage', () => {
            expect(MathUtils.subtractPercent(100, 10)).toBeCloseTo(90);
        });
    });

    describe('Utility Functions', () => {
        test('abs - should return absolute value', () => {
            expect(MathUtils.abs(-5)).toBe(5);
            expect(MathUtils.abs(5)).toBe(5);
        });

        test('sign - should return sign', () => {
            expect(MathUtils.sign(5)).toBe(1);
            expect(MathUtils.sign(-5)).toBe(-1);
            expect(MathUtils.sign(0)).toBe(0);
        });

        test('isPositive/isNegative/isZero', () => {
            expect(MathUtils.isPositive(5)).toBe(true);
            expect(MathUtils.isNegative(-5)).toBe(true);
            expect(MathUtils.isZero(0)).toBe(true);
        });

        test('isInteger/isEven/isOdd', () => {
            expect(MathUtils.isInteger(5)).toBe(true);
            expect(MathUtils.isInteger(5.5)).toBe(false);
            expect(MathUtils.isEven(4)).toBe(true);
            expect(MathUtils.isOdd(5)).toBe(true);
        });
    });

    describe('Angle Conversions', () => {
        test('degreesToRadians', () => {
            expect(MathUtils.round(MathUtils.degreesToRadians(180), 4)).toBe(
                3.1416,
            );
        });

        test('radiansToDegrees', () => {
            expect(
                MathUtils.round(MathUtils.radiansToDegrees(Math.PI), 4),
            ).toBe(180);
        });
    });

    describe('Logarithmic Functions', () => {
        test('ln - natural log', () => {
            expect(MathUtils.round(MathUtils.ln(Math.E), 4)).toBe(1);
        });

        test('log10 - base 10 log', () => {
            expect(MathUtils.log10(100)).toBe(2);
        });

        test('log - custom base', () => {
            expect(MathUtils.log(8, 2)).toBe(3);
        });

        test('exp - exponential', () => {
            expect(MathUtils.round(MathUtils.exp(1), 4)).toBe(2.7183);
        });
    });

    describe('Interpolation', () => {
        test('lerp - linear interpolation', () => {
            expect(MathUtils.lerp(0, 100, 0.5)).toBe(50);
            expect(MathUtils.lerp(0, 100, 0)).toBe(0);
            expect(MathUtils.lerp(0, 100, 1)).toBe(100);
        });

        test('inverseLerp - find t', () => {
            expect(MathUtils.inverseLerp(0, 100, 50)).toBe(0.5);
        });

        test('mapRange - map between ranges', () => {
            expect(MathUtils.mapRange(50, 0, 100, 0, 1)).toBe(0.5);
            expect(MathUtils.mapRange(5, 0, 10, 0, 100)).toBe(50);
        });
    });

    describe('Distribution Functions', () => {
        test('distribute - even distribution', () => {
            const result = MathUtils.distribute(100, 3);
            expect(result).toHaveLength(3);
            expect(MathUtils.sum(...result)).toBeCloseTo(100, 2);
        });

        test('allocate - proportional allocation', () => {
            const result = MathUtils.allocate(1000, [3, 2, 1]);
            expect(result).toHaveLength(3);
            expect(MathUtils.round(MathUtils.sum(...result), 2)).toBe(1000);
            // Verify proportions (approximately 50%, 33.33%, 16.67%)
            expect(result[0]).toBeCloseTo(500, 0);
            expect(result[1]).toBeCloseTo(333.33, 0);
            expect(result[2]).toBeCloseTo(166.67, 0);
        });
    });
});
