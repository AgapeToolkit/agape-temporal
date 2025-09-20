import type { Temporal } from "@js-temporal/polyfill";

/**
 * Type alias for the complete Temporal namespace.
 * 
 * Use this type for function parameters, return types, and variable declarations
 * when working with Temporal objects. This provides full IntelliSense support
 * and type safety from <a target="_blank" href="https://www.npmjs.com/package/@js-temporal/polyfill">`@js-temporal/polyfill`</a>.
 * 
 * @example
 * ```typescript
 * import { TemporalLike } from '@agape/temporal';
 * 
 * function processDate(temporal: TemporalLike) {
 *   const now = temporal.Now.plainDateTime('iso8601');
 *   return now.toString();
 * }
 * ```
 */
export type TemporalLike = typeof Temporal;

let TemporalRef: TemporalLike | undefined;

/**
 * Checks if Temporal is available in the current environment.
 * 
 * This function detects both native Temporal (Node.js 20+, modern browsers) and
 * polyfilled Temporal (when `@js-temporal/polyfill` is installed and configured).
 * The result is cached for performance.
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
  if (TemporalRef) return true;
  return "Temporal" in globalThis;
}

/**
 * Gets the Temporal object synchronously from the current environment.
 * 
 * This function returns the native Temporal object if available, or a polyfilled
 * version if one is installed and configured. If neither is available, it
 * returns a typed stub that throws descriptive errors when accessed.
 * 
 * The result is cached for performance, so subsequent calls return the same instance.
 * This function is synchronous and safe to use in decorators and top-level initialization.
 * 
 * @returns The Temporal object (native, polyfill, or typed stub)
 * 
 * @example
 * ### Get the Temporal object
 * ```typescript
 * import { getTemporal } from '@agape/temporal';
 * 
 * const Temporal = getTemporal();
 * const now = Temporal.PlainDateTime.from('2025-09-19T10:00');
 * console.log(now.toString()); // "2025-09-19T10:00:00"
 * ```
 * 
 * @example
 * 
 * # Configure a polyfill
 * 
 * ```typescript
 * import { Temporal as TemporalPolyfill } from '@js-temporal/polyfill';
 * 
 * // Set globalThis.Temporal to make it available to getTemporal()
 * (globalThis as any).Temporal = TemporalPolyfill;
 * 
 * const Temporal = getTemporal();
 * const now = Temporal.PlainDateTime.from('2025-09-19T10:00');
 * console.log(now.toString()); // "2025-09-19T10:00:00"
 * ```
 * 
 * @throws {Error} When Temporal is not available and a property is accessed on the stub.
 *                 The error message includes the property name and instructions for
 *                 installing the polyfill or using a Temporal-enabled environment.
 */
export function getTemporal(): TemporalLike {
  if (TemporalRef) return TemporalRef;

  if ("Temporal" in globalThis) {
    TemporalRef = (globalThis as unknown as { Temporal: TemporalLike }).Temporal;
    return TemporalRef;
  }

  // Return typed stub when Temporal is not available
  TemporalRef = new Proxy({} as TemporalLike, {
    get(_target, prop) {
      throw new Error(
        `Temporal is not available (accessed property: ${String(prop)}). ` +
        `Install @js-temporal/polyfill or use Node 20+/modern browsers.`
      );
    },
  });
  return TemporalRef;
}
