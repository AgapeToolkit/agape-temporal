/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Temporal as TemporalPolyfill } from "@js-temporal/polyfill";
import { TemporalNotAvailableError } from './errors';

let agapeTemporal: typeof TemporalPolyfill | undefined;

const installedTemporal: typeof TemporalPolyfill = (globalThis as any)?.Temporal;

// Get the temporal instance to use (agape first, then globalThis)
function getTemporalInstance(): typeof TemporalPolyfill | undefined {
  return agapeTemporal ?? (globalThis as any)?.Temporal;
}

class InstantStub {
  constructor() { throw new TemporalNotAvailableError(); }
  toString() { throw new TemporalNotAvailableError(); }
  static from(value: string): InstantStub { return new InstantStub() }
}

class ZonedDateTimeStub {
  constructor() { throw new TemporalNotAvailableError(); }
  toString() { throw new TemporalNotAvailableError(); }
  static from(value: string): ZonedDateTimeStub { return new ZonedDateTimeStub() }
}

class PlainDateStub {
  constructor() { throw new TemporalNotAvailableError(); }
  toString() { throw new TemporalNotAvailableError(); }
  static from(value: string): PlainDateStub { return new PlainDateStub() }
}

class PlainTimeStub {
  constructor() { throw new TemporalNotAvailableError(); }
  toString() { throw new TemporalNotAvailableError(); }
  static from(value: string): PlainTimeStub { return new PlainTimeStub() }
}

class PlainDateTimeStub {
  constructor() { throw new TemporalNotAvailableError(); }
  toString() { throw new TemporalNotAvailableError(); }
  static from(value: string): PlainDateTimeStub { return new PlainDateTimeStub() }
}

class PlainYearMonthStub {
  constructor() { throw new TemporalNotAvailableError(); }
  toString() { throw new TemporalNotAvailableError(); }
  static from(value: string): PlainYearMonthStub { return new PlainYearMonthStub() }
}

class PlainMonthDayStub {
  constructor() { throw new TemporalNotAvailableError(); }
  toString() { throw new TemporalNotAvailableError(); }
  static from(value: string): PlainMonthDayStub { return new PlainMonthDayStub() }
}

class DurationStub {
  constructor() { throw new TemporalNotAvailableError(); }
  toString() { throw new TemporalNotAvailableError(); }
  static from(value: string): DurationStub { return new DurationStub() }
}

class TimeZoneStub {
  constructor() { throw new TemporalNotAvailableError(); }
  toString() { throw new TemporalNotAvailableError(); }
  static from(value: string): TimeZoneStub { return new TimeZoneStub() }
  getOffsetNanosecondsFor(instant: InstantStub): number {
    throw new TemporalNotAvailableError();;
    return 0;
  }
}

/**
 * The Temporal namespace provides typed access to Temporal classes with intelligent fallback.
 *
 * This namespace automatically detects and uses the best available Temporal implementation:
 * 1. Agape-level temporal (set via <code><reference>setTemporal</reference>()</code>)
 * 2. GlobalThis temporal (native or polyfill)
 * 3. Stub implementation (throws helpful errors)
 *
 * @example
 *
 * ### Use Temporal if Available
 *
 * ```typescript
 * import { Temporal, hasTemporal } from '@agape/temporal';
 *
 * if (hasTemporal()) {
 *   const now = Temporal.PlainDateTime.from('2025-09-19T10:00');
 *   console.log(now.toString());
 * }
 * ```
 *
 * @example
 *
 * ### Throw an Error if it's not
 *
 * ```typescript
 * import { Temporal } from '@agape/temporal';
 *
 * const pdt = Temporal.PlainDateTime.from('2025-09-19T10:00');
 * // throws an error if temporal
 * ```
 *
 * @example
 *
 * ### Use A Global Polyfill
 *
 * ```ts
 * import type { Temporal as TemporalPolyfill } from "@js-temporal/polyfill";
 * (globalThis as any)['Temporal'] = TemporalPolyfill;
 *
 * import { Temporal, hasTemporal } from '@agape/temporal';
 * Temporal.PlainDateTime === TemporalPolyfill.PlainDateTime;
 * ```
 * @example
 * ### Set Agape Polyfill
 * ```ts
 * import type { Temporal as TemporalPolyfill } from "@js-temporal/polyfill";
 * import { Temporal, setTemporal } from '@agape/temporal';
 * setTemporal(TemporalPolyfill)
 *
 * Temporal.PlainDateTime === TemporalPolyfill.PlainDateTime;
 * ```
 */
export namespace Temporal {
  /**
   * `Temporal.Instant` constructor or noop implementation.
   * @see {@link https://tc39.es/proposal-temporal/docs/instant.html | The Temporal.Instant documentation}
   */
  export const Instant: typeof TemporalPolyfill.Instant = getTemporalInstance()?.Instant ?? InstantStub as any

  // 👇 This defines the type for usage like `TemporalStub.Instant`
  export type Instant = TemporalPolyfill.Instant;

  /**
   * `Temporal.ZonedDateTime` constructor or noop implementation.
   * @see {@link https://tc39.es/proposal-temporal/docs/zoneddatetime.html  | The Temporal.ZonedDateTime documentation}
   */
  export const ZonedDateTime: typeof TemporalPolyfill.ZonedDateTime = getTemporalInstance()?.ZonedDateTime ?? ZonedDateTimeStub as any

  // 👇 This defines the type for usage like `TemporalStub.ZonedDateTime`
  export type ZonedDateTime = TemporalPolyfill.ZonedDateTime;

  /**
   * `Temporal.PlainDate` constructor or noop implementation.
   * @see {@link https://tc39.es/proposal-temporal/docs/plaindate.html  | The Temporal.PlainDate documentation}
   */
  export const PlainDate: typeof TemporalPolyfill.PlainDate = getTemporalInstance()?.PlainDate ?? PlainDateStub as any

  // 👇 This defines the type for usage like `TemporalStub.PlainDate`
  export type PlainDate = TemporalPolyfill.PlainDate;

  /**
   * `Temporal.PlainTime` constructor or noop implementation.
   * @see {@link https://tc39.es/proposal-temporal/docs/plaintime.html | The Temporal.PlainTime documentation}
   */
  export const PlainTime: typeof TemporalPolyfill.PlainTime = getTemporalInstance()?.PlainTime ?? PlainTimeStub as any

  // 👇 This defines the type for usage like `TemporalStub.PlainTime`
  export type PlainTime = TemporalPolyfill.PlainTime;

  /**
   * `Temporal.PlainDateTime` constructor or noop implementation.
   * @see {@link https://tc39.es/proposal-temporal/docs/plaindatetime.html | The Temporal.PlainDateTime documentation}
   */
  export const PlainDateTime: typeof TemporalPolyfill.PlainDateTime = getTemporalInstance()?.PlainDateTime ?? PlainDateTimeStub as any

  // 👇 This defines the type for usage like `TemporalStub.PlainDateTime`
  export type PlainDateTime = TemporalPolyfill.PlainDateTime;

  /**
   * `Temporal.PlainYearMonth` constructor or noop implementation.
   * @see {@link https://tc39.es/proposal-temporal/docs/plainyearmonth.html | The Temporal.PlainYearMonth documentation}
   */
  export const PlainYearMonth: typeof TemporalPolyfill.PlainYearMonth = getTemporalInstance()?.PlainYearMonth ?? PlainYearMonthStub as any

  // 👇 This defines the type for usage like `TemporalStub.PlainYearMonth`
  export type PlainYearMonth = TemporalPolyfill.PlainYearMonth;

  /**
   * `Temporal.PlainMonthDay` constructor or noop implementation.
   * @see {@link https://tc39.es/proposal-temporal/docs/plainmonthday.html | The Temporal.PlainMonthDay documentation}
   */
  export const PlainMonthDay: typeof TemporalPolyfill.PlainMonthDay = getTemporalInstance()?.PlainMonthDay ?? PlainMonthDayStub as any

  // 👇 This defines the type for usage like `TemporalStub.PlainMonthDay`
  export type PlainMonthDay = TemporalPolyfill.PlainMonthDay;

  /**
   * `Temporal.Duration` constructor or noop implementation.
   * @see {@link https://tc39.es/proposal-temporal/docs/duration.html | The Temporal.Duration documentation}
   */
  export const Duration: typeof TemporalPolyfill.Duration = getTemporalInstance()?.Duration ?? DurationStub as any

  // 👇 This defines the type for usage like `TemporalStub.Duration`
  export type Duration = TemporalPolyfill.Duration;

  /**
   * `Temporal.TimeZone` constructor or noop implementation.
   * @see {@link https://tc39.es/proposal-temporal/docs/timezone.html | The Temporal.TimeZone documentation}
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
