/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Temporal as TemporalPolyfill } from "@js-temporal/polyfill";

let agapeTemporal: typeof TemporalPolyfill | undefined;

const installedTemporal: typeof TemporalPolyfill = (globalThis as any)?.Temporal;

// Get the temporal instance to use (agape first, then globalThis)
function getTemporalInstance(): typeof TemporalPolyfill | undefined {
  return agapeTemporal ?? (globalThis as any)?.Temporal;
}

function throwTemporalError() {
  throw new Error(
    `Temporal required. Use a JavaScript runtime which has Temporal or use a polyfill such as @js-temporal/polyfill or temporal-polyfill.`
  )
}

class InstantStub {
  constructor() { throwTemporalError() }
  toString() { throwTemporalError() }
  static from(value: string): InstantStub { return new InstantStub() }
}

class ZonedDateTimeStub {
  constructor() { throwTemporalError() }
  toString() { throwTemporalError() }
  static from(value: string): ZonedDateTimeStub { return new ZonedDateTimeStub() }
}

class PlainDateStub {
  constructor() { throwTemporalError() }
  toString() { throwTemporalError() }
  static from(value: string): PlainDateStub { return new PlainDateStub() }
}

class PlainTimeStub {
  constructor() { throwTemporalError() }
  toString() { throwTemporalError() }
  static from(value: string): PlainTimeStub { return new PlainTimeStub() }
}

class PlainDateTimeStub {
  constructor() { throwTemporalError() }
  toString() { throwTemporalError() }
  static from(value: string): PlainDateTimeStub { return new PlainDateTimeStub() }
}

class PlainYearMonthStub {
  constructor() { throwTemporalError() }
  toString() { throwTemporalError() }
  static from(value: string): PlainYearMonthStub { return new PlainYearMonthStub() }
}

class PlainMonthDayStub {
  constructor() { throwTemporalError() }
  toString() { throwTemporalError() }
  static from(value: string): PlainMonthDayStub { return new PlainMonthDayStub() }
}

class DurationStub {
  constructor() { throwTemporalError() }
  toString() { throwTemporalError() }
  static from(value: string): DurationStub { return new DurationStub() }
}

class TimeZoneStub {
  constructor() { throwTemporalError() }
  toString() { throwTemporalError() }
  static from(value: string): TimeZoneStub { return new TimeZoneStub() }
  getOffsetNanosecondsFor(instant: InstantStub): number {
    throwTemporalError();
    return 0;
  }
}

/**
 * The Temporal namespace provides typed access to Temporal classes with intelligent fallback.
 *
 * This namespace automatically detects and uses the best available Temporal implementation:
 * 1. Agape-level temporal (set via `setTemporal()`)
 * 2. GlobalThis temporal (native or polyfill)
 * 3. Stub implementation (throws helpful errors)
 *
 * All Temporal classes are available as properties on this namespace:
 * - `Temporal.PlainDateTime` - Date and time without timezone
 * - `Temporal.PlainDate` - Date without time or timezone
 * - `Temporal.PlainTime` - Time without date or timezone
 * - `Temporal.ZonedDateTime` - Date and time with timezone
 * - `Temporal.Instant` - Single point in time
 * - `Temporal.Duration` - Length of time
 * - `Temporal.TimeZone` - Timezone representation
 *
 * @example
 * ```typescript
 * import { Temporal, hasTemporal } from '@agape/temporal';
 *
 * if (hasTemporal()) {
 *   const now = Temporal.PlainDateTime.from('2025-09-19T10:00');
 *   console.log(now.toString());
 * }
 * ```
 */
export namespace Temporal {
  /**
   * `Temporal.Instant` constructor or noop implementation.
   * 
   * Represents a single point in time, independent of timezone.
   * 
   * @see {@link https://tc39.es/proposal-temporal/docs/instant.html | The Temporal.Instant documentation}
   *
   * @example
   * ```typescript
   * const now = Temporal.Instant.from('2025-09-19T14:30:00Z');
   * const epoch = Temporal.Instant.fromEpochSeconds(0);
   * console.log(now.toString()); // "2025-09-19T14:30:00Z"
   * ```
   */
  export const Instant: typeof TemporalPolyfill.Instant = getTemporalInstance()?.Instant ?? InstantStub as any

  // 👇 This defines the type for usage like `TemporalStub.Instant`
  export type Instant = TemporalPolyfill.Instant;

  /**
   * `Temporal.ZonedDateTime` constructor or noop implementation.
   * 
   * Represents a date and time with timezone information.
   * 
   * @see {@link https://tc39.es/proposal-temporal/docs/zoneddatetime.html  | The Temporal.ZonedDateTime documentation}
   *
   * @example
   * ```typescript
   * const nyTime = Temporal.ZonedDateTime.from('2025-09-19T14:30:00[America/New_York]');
   * const utcTime = nyTime.withTimeZone('UTC');
   * console.log(nyTime.toString()); // "2025-09-19T14:30:00-04:00[America/New_York]"
   * ```
   */
  export const ZonedDateTime: typeof TemporalPolyfill.ZonedDateTime = getTemporalInstance()?.ZonedDateTime ?? ZonedDateTimeStub as any

  // 👇 This defines the type for usage like `TemporalStub.ZonedDateTime`
  export type ZonedDateTime = TemporalPolyfill.ZonedDateTime;

  /**
   * `Temporal.PlainDate` constructor or noop implementation.
   * 
   * Represents a calendar date without time or timezone.
   * 
   * @see {@link https://tc39.es/proposal-temporal/docs/plaindate.html  | The Temporal.PlainDate documentation}
   *
   * @example
   * ```typescript
   * const date = Temporal.PlainDate.from('2025-09-19');
   * const tomorrow = date.add({ days: 1 });
   * console.log(tomorrow.toString()); // "2025-09-20"
   * ```
   */
  export const PlainDate: typeof TemporalPolyfill.PlainDate = getTemporalInstance()?.PlainDate ?? PlainDateStub as any

  // 👇 This defines the type for usage like `TemporalStub.PlainDate`
  export type PlainDate = TemporalPolyfill.PlainDate;

  /**
   * `Temporal.PlainTime` constructor or noop implementation.
   * 
   * Represents a time of day without date or timezone.
   * 
   * @see {@link https://tc39.es/proposal-temporal/docs/plaintime.html | The Temporal.PlainTime documentation}
   *
   * @example
   * ```typescript
   * const time = Temporal.PlainTime.from('14:30:00');
   * const later = time.add({ hours: 2 });
   * console.log(later.toString()); // "16:30:00"
   * ```
   */
  export const PlainTime: typeof TemporalPolyfill.PlainTime = getTemporalInstance()?.PlainTime ?? PlainTimeStub as any

  // 👇 This defines the type for usage like `TemporalStub.PlainTime`
  export type PlainTime = TemporalPolyfill.PlainTime;

  /**
   * `Temporal.PlainDateTime` constructor or noop implementation.
   * 
   * Represents a date and time without timezone information.
   * 
   * @see {@link https://tc39.es/proposal-temporal/docs/plaindatetime.html | The Temporal.PlainDateTime documentation}
   *
   * @example
   * ```typescript
   * const dt = Temporal.PlainDateTime.from('2025-09-19T14:30:00');
   * const nextWeek = dt.add({ weeks: 1 });
   * console.log(nextWeek.toString()); // "2025-09-26T14:30:00"
   * ```
   */
  export const PlainDateTime: typeof TemporalPolyfill.PlainDateTime = getTemporalInstance()?.PlainDateTime ?? PlainDateTimeStub as any

  // 👇 This defines the type for usage like `TemporalStub.PlainDateTime`
  export type PlainDateTime = TemporalPolyfill.PlainDateTime;

  /**
   * `Temporal.PlainYearMonth` constructor or noop implementation.
   * 
   * Represents a year and month without day information.
   * 
   * @see {@link https://tc39.es/proposal-temporal/docs/plainyearmonth.html | The Temporal.PlainYearMonth documentation}
   *
   * @example
   * ```typescript
   * const ym = Temporal.PlainYearMonth.from('2025-09');
   * const nextMonth = ym.add({ months: 1 });
   * console.log(nextMonth.toString()); // "2025-10"
   * ```
   */
  export const PlainYearMonth: typeof TemporalPolyfill.PlainYearMonth = getTemporalInstance()?.PlainYearMonth ?? PlainYearMonthStub as any

  // 👇 This defines the type for usage like `TemporalStub.PlainYearMonth`
  export type PlainYearMonth = TemporalPolyfill.PlainYearMonth;

  /**
   * `Temporal.PlainMonthDay` constructor or noop implementation.
   * 
   * Represents a month and day without year information.
   * 
   * @see {@link https://tc39.es/proposal-temporal/docs/plainmonthday.html | The Temporal.PlainMonthDay documentation}
   *
   * @example
   * ```typescript
   * const md = Temporal.PlainMonthDay.from('09-19');
   * const thisYear = md.toPlainDate({ year: 2025 });
   * console.log(thisYear.toString()); // "2025-09-19"
   * ```
   */
  export const PlainMonthDay: typeof TemporalPolyfill.PlainMonthDay = getTemporalInstance()?.PlainMonthDay ?? PlainMonthDayStub as any

  // 👇 This defines the type for usage like `TemporalStub.PlainMonthDay`
  export type PlainMonthDay = TemporalPolyfill.PlainMonthDay;

  /**
   * `Temporal.Duration` constructor or noop implementation.
   * 
   * Represents a length of time (duration).
   * 
   * @see {@link https://tc39.es/proposal-temporal/docs/duration.html | The Temporal.Duration documentation}
   *
   * @example
   * ```typescript
   * const duration = Temporal.Duration.from('PT2H30M');
   * const doubled = duration.multiply(2);
   * console.log(doubled.toString()); // "PT5H"
   * ```
   */
  export const Duration: typeof TemporalPolyfill.Duration = getTemporalInstance()?.Duration ?? DurationStub as any

  // 👇 This defines the type for usage like `TemporalStub.Duration`
  export type Duration = TemporalPolyfill.Duration;

  /**
   * `Temporal.TimeZone` constructor or noop implementation.
   * 
   * Represents a timezone.
   * 
   * @see {@link https://tc39.es/proposal-temporal/docs/timezone.html | The Temporal.TimeZone documentation}
   *
   * @example
   * ```typescript
   * const tz = Temporal.TimeZone.from('America/New_York');
   * const offset = tz.getOffsetNanosecondsFor(Temporal.Instant.from('2025-09-19T14:30:00Z'));
   * console.log(offset / 1_000_000_000 / 60); // -240 (minutes from UTC)
   * ```
   */
  export const TimeZone: typeof TemporalPolyfill.TimeZone = getTemporalInstance()?.TimeZone ?? TimeZoneStub as any

  // 👇 This defines the type for usage like `TemporalStub.TimeZone`
  export type TimeZone = TemporalPolyfill.TimeZone;
}


/**
 * Sets the Temporal implementation to be used by the Agape Temporal namespace.
 *
 * This function allows you to explicitly configure which Temporal implementation
 * should be used. The provided temporal takes precedence over any Temporal found
 * on globalThis, giving you full control over the Temporal implementation used
 * throughout your application.
 *
 * @param temporal - The Temporal implementation to use (e.g., from `@js-temporal/polyfill`)
 *
 * @example
 * ```typescript
 * import { setTemporal, Temporal } from '@agape/temporal';
 * import { Temporal as TemporalPolyfill } from '@js-temporal/polyfill';
 *
 * // Set your preferred polyfill
 * setTemporal(TemporalPolyfill);
 *
 * // Now all Temporal namespace usage will use this implementation
 * const now = Temporal.PlainDateTime.from('2025-09-19T10:00');
 * console.log(now.toString()); // Uses your polyfill
 * ```
 *
 * @example
 * ```typescript
 * import { setTemporal, Temporal } from '@agape/temporal';
 * import { Temporal as CustomTemporal } from './my-custom-temporal';
 *
 * // Use a custom Temporal implementation
 * setTemporal(CustomTemporal);
 *
 * const date = Temporal.PlainDate.from('2025-09-19');
 * ```
 */
export function setTemporal(temporal: typeof TemporalPolyfill): void {
  agapeTemporal = temporal;
  updateTemporalNamespace();
}

/**
 * Updates the Temporal namespace properties to point to the current temporal instance.
 * This is called whenever setTemporal() or clearAgapeTemporal() is called.
 */
function updateTemporalNamespace(): void {
  const currentTemporal = getTemporalInstance();

  // Update all properties to point to the current temporal instance or stubs
  (Temporal as any).Instant = currentTemporal?.Instant ?? (InstantStub as any);
  (Temporal as any).ZonedDateTime = currentTemporal?.ZonedDateTime ?? (ZonedDateTimeStub as any);
  (Temporal as any).PlainDate = currentTemporal?.PlainDate ?? (PlainDateStub as any);
  (Temporal as any).PlainTime = currentTemporal?.PlainTime ?? (PlainTimeStub as any);
  (Temporal as any).PlainDateTime = currentTemporal?.PlainDateTime ?? (PlainDateTimeStub as any);
  (Temporal as any).PlainYearMonth = currentTemporal?.PlainYearMonth ?? (PlainYearMonthStub as any);
  (Temporal as any).PlainMonthDay = currentTemporal?.PlainMonthDay ?? (PlainMonthDayStub as any);
  (Temporal as any).Duration = currentTemporal?.Duration ?? (DurationStub as any);
  (Temporal as any).TimeZone = currentTemporal?.TimeZone ?? (TimeZoneStub as any);
}


/**
 * Checks if Temporal is available in the current environment.
 *
 * This function checks for Temporal implementations in the following priority order:
 * 1. Agape-level temporal (set via `setTemporal()`)
 * 2. GlobalThis temporal (native or polyfill)
 *
 * @returns `true` if Temporal is available, `false` otherwise
 *
 * @example
 * ```typescript
 * import { hasTemporal, Temporal } from '@agape/temporal';
 *
 * if (hasTemporal()) {
 *   const now = Temporal.PlainDateTime.from('2025-09-19T10:00');
 *   console.log(now.toString());
 * } else {
 *   console.warn('Temporal not available, falling back to Date');
 * }
 * ```
 */
export function hasTemporal(): boolean {
  if (agapeTemporal) return true;
  return "Temporal" in globalThis;
}

// Initialize the namespace with the current temporal instance
updateTemporalNamespace();
