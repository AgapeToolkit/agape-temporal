/**
 * Error thrown when attempting to use Temporal functionality that is not available in the current environment.
 *
 * This error is thrown by the stub implementations of Temporal classes when no Temporal implementation
 * is available (neither native Temporal nor a polyfill). It provides helpful guidance on how to resolve
 * the issue by suggesting polyfill options.
 *
 * @example
 *
 * ### Produce an Error if no Temporal available
 *
 * ```typescript
 * import { Temporal } from '@agape/temporal';
 *
 * try {
 *   const date = Temporal.PlainDate.from('2025-09-19');
 * } catch (error) {
 *   if (error instanceof TemporalNotAvailableError) {
 *     console.error('Temporal is not available:', error.message);
 *     // Handle the error appropriately
 *   }
 * }
 * ```
 * @example
 * ### Resolve Error Using a Polyfill
 *
 * ```typescript
 * // Using a polyfill to resolve the error
 * import { Temporal as TemporalPolyfill } from '@js-temporal/polyfill';
 * import { setTemporal } from '@agape/temporal';
 *
 * // Set the polyfill
 * setTemporal(TemporalPolyfill);
 *
 * // Now Temporal operations will work
 * const now = Temporal.PlainDateTime.from('2025-09-19T10:00');
 * ```
 *
 */
export class TemporalNotAvailableError extends Error {

  /**
   * The name of the error. Always set to 'TemporalNotAvailableError'.
   *
   * This property identifies the specific type of error and is useful for error handling
   * and debugging purposes.
   *
   * @example
   * ```typescript
   * try {
   *   Temporal.PlainDate.from('2025-09-19');
   * } catch (error) {
   *   if (error.name === 'TemporalNotAvailableError') {
   *     console.log('Temporal is not available');
   *   }
   * }
   * ```
   */
  readonly name!: string;

  /**
   * The error message describing why Temporal is not available and how to resolve it.
   *
   * This message provides helpful guidance to developers about resolving the Temporal
   * availability issue, including suggestions for polyfills and runtime requirements.
   *
   * @example
   * ```typescript
   * try {
   *   Temporal.PlainDate.from('2025-09-19');
   * } catch (error) {
   *   console.error('Error:', error.message);
   *   // Output: "Temporal required. Use a JavaScript runtime which has Temporal or use a polyfill such as @js-temporal/polyfill or temporal-polyfill."
   * }
   * ```
   */
  readonly message!: string;

  /**
   * Creates a new TemporalNotAvailableError instance.
   *
   * @param message - Custom error message. If not provided, a default message with helpful
   *                  guidance about resolving the Temporal availability issue will be used.
   *
   * @example
   * ```typescript
   * // Using default message
   * throw new TemporalNotAvailableError();
   *
   * // Using custom message
   * throw new TemporalNotAvailableError('Custom error message');
   * ```
   */
  constructor(message: string = "Temporal required. Use a JavaScript runtime which has Temporal or use a polyfill such as @js-temporal/polyfill or temporal-polyfill.") {
    super(message);
    this.name = 'TemporalNotAvailableError';
  }
}
