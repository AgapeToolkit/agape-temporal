/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Temporal as TemporalPolyfill } from "@js-temporal/polyfill";

let agapeTemporal: typeof TemporalPolyfill | undefined;


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
 * This stub makes it trivial for libraries that wish to extend @agape/model
 * functionality to optionally support Temporal. Use the stub in place of T
 * Temporal in your library, if Temporal is available either natively or as a
 * polyfill the stub will point to the implementation, otherwise it will point
 * to a noop implementation that throws an error if instantiated.
 *
 * You can check if the user has Temporal before using the stub to avoid errors
 * using the {@link hasTemporal} function.
 */
export namespace Temporal {
  /**
   * `Temporal.Instant` constructor or noop implementation.
   * @see {@link https://tc39.es/proposal-temporal/docs/instant.html | The Temporal.Instant documentation}
   */
  export const Instant: typeof TemporalPolyfill.Instant = getTemporalInstance()?.Instant ?? InstantStub

  // 👇 This defines the type for usage like `TemporalStub.Instant`
  export type Instant = TemporalPolyfill.Instant;

  /**
   * `Temporal.ZonedDateTime` constructor or noop implementation.
   * @see {@link https://tc39.es/proposal-temporal/docs/zoneddatetime.html  | The Temporal.ZonedDateTime documentation}
   */
  export const ZonedDateTime: typeof TemporalPolyfill.ZonedDateTime = getTemporalInstance()?.ZonedDateTime ?? ZonedDateTimeStub

  // 👇 This defines the type for usage like `TemporalStub.ZonedDateTime`
  export type ZonedDateTime = TemporalPolyfill.ZonedDateTime;

  /**
   * `Temporal.PlainDate` constructor or noop implementation.
   * @see {@link https://tc39.es/proposal-temporal/docs/plaindate.html  | The Temporal.PlainDate documentation}
   */
  export const PlainDate: typeof TemporalPolyfill.PlainDate = installedTemporal?.PlainDate ?? PlainDateStub

  // 👇 This defines the type for usage like `TemporalStub.PlainDate`
  export type PlainDate = TemporalPolyfill.PlainDate;

  /**
   * `Temporal.PlainTime` constructor or noop implementation.
   * @see {@link https://tc39.es/proposal-temporal/docs/plaintime.html | The Temporal.PlainTime documentation}
   */
  export const PlainTime: typeof TemporalPolyfill.PlainTime = installedTemporal?.PlainTime ?? PlainTimeStub

  // 👇 This defines the type for usage like `TemporalStub.PlainTime`
  export type PlainTime = TemporalPolyfill.PlainTime;

  /**
   * `Temporal.PlainDateTime` constructor or noop implementation.
   * @see {@link https://tc39.es/proposal-temporal/docs/plaindatetime.html | The Temporal.PlainDateTime documentation}
   */
  export const PlainDateTime: typeof TemporalPolyfill.PlainDateTime = installedTemporal?.PlainDateTime ?? PlainDateTimeStub

  // 👇 This defines the type for usage like `TemporalStub.PlainDateTime`
  export type PlainDateTime = TemporalPolyfill.PlainDateTime;

  /**
   * `Temporal.PlainYearMonth` constructor or noop implementation.
   * @see {@link https://tc39.es/proposal-temporal/docs/plainyearmonth.html | The Temporal.PlainYearMonth documentation}
   */
  export const PlainYearMonth: typeof TemporalPolyfill.PlainYearMonth = installedTemporal?.PlainYearMonth ?? PlainYearMonthStub

  // 👇 This defines the type for usage like `TemporalStub.PlainYearMonth`
  export type PlainYearMonth = TemporalPolyfill.PlainYearMonth;

  /**
   * `Temporal.PlainMonthDay` constructor or noop implementation.
   * @see {@link https://tc39.es/proposal-temporal/docs/plainmonthday.html | The Temporal.PlainMonthDay documentation}
   */
  export const PlainMonthDay: typeof TemporalPolyfill.PlainMonthDay = installedTemporal?.PlainMonthDay ?? PlainMonthDayStub

  // 👇 This defines the type for usage like `TemporalStub.PlainMonthDay`
  export type PlainMonthDay = TemporalPolyfill.PlainMonthDay;

  /**
   * `Temporal.Duration` constructor or noop implementation.
   * @see {@link https://tc39.es/proposal-temporal/docs/duration.html | The Temporal.Duration documentation}
   */
  export const Duration: typeof TemporalPolyfill.Duration = installedTemporal?.Duration ?? DurationStub

  // 👇 This defines the type for usage like `TemporalStub.Duration`
  export type Duration = TemporalPolyfill.Duration;

  /**
   * `Temporal.TimeZone` constructor or noop implementation.
   * @see {@link https://tc39.es/proposal-temporal/docs/timezone.html | The Temporal.TimeZone documentation}
   */
  export const TimeZone: typeof TemporalPolyfill.TimeZone = installedTemporal?.TimeZone ?? TimeZoneStub

  // 👇 This defines the type for usage like `TemporalStub.TimeZone`
  export type TimeZone = TemporalPolyfill.TimeZone;
}


/**
 * Sets the Temporal library to be used by Agape.
 * 
 * This function allows you to explicitly set which Temporal implementation
 * should be used by the Agape Temporal namespace. This takes precedence over
 * any Temporal found on globalThis.
 * 
 * @param temporal - The Temporal implementation to use
 * 
 * @example
 * ```typescript
 * import { setTemporal } from '@agape/temporal';
 * import { Temporal as TemporalPolyfill } from '@js-temporal/polyfill';
 * 
 * // Set a specific polyfill
 * setTemporal(TemporalPolyfill);
 * 
 * // Now the Temporal namespace will use this specific implementation
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

updateTemporalNamespace();


/**
 * Checks if Temporal is available in the current environment.
 *
 * This function first checks if an agape-level temporal has been set via setTemporal(),
 * then checks for both native Temporal (Node.js 20+, modern browsers) and
 * polyfilled Temporal (when `@js-temporal/polyfill` is installed and configured).
 *
 * @returns `true` if Temporal is available, `false` otherwise
 *
 * @example
 * ```typescript
 * import { hasTemporal, getTemporal } from '@agape/temporal';
 *
 * if (hasTemporal()) {
 *   const Temporal = getTemporal();
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
