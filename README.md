# @agape/temporal

[![npm version](https://badge.fury.io/js/%40agape%2Ftemporal.svg)](https://badge.fury.io/js/%40agape%2Ftemporal)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Typed, dependency-free access to Temporal with fallback stub for environments where Temporal is not available.

## Features

- **Zero Required Dependencies**: No need to install `@js-temporal/polyfill` as a required dependency
- **Automatic Detection**: Automatically detects and uses native Temporal or polyfill if available
- **Type Safety**: Full TypeScript support with `TemporalLike` type for IntelliSense
- **Synchronous API**: Works in decorators and top-level initialization
- **Graceful Fallback**: Returns a typed stub that throws descriptive errors when Temporal is unavailable
- **No Global Pollution**: Safe runtime resolution without modifying global objects

## Installation

```bash
npm install @agape/temporal
```

## Quick Start

```typescript
import { getTemporal, hasTemporal, TemporalLike } from '@agape/temporal';

if (hasTemporal()) {
  const Temporal = getTemporal();
  const now: TemporalLike['PlainDateTime'] = Temporal.PlainDateTime.from('2025-09-19T10:00');
  console.log(now.toString());
} else {
  console.warn('Temporal is not available — falling back to Date.');
}
```

## API Reference

### `hasTemporal(): boolean`

Checks if Temporal is available (native or polyfill).

**Returns:** `true` if Temporal is available, `false` otherwise

**Example:**
```typescript
if (hasTemporal()) {
  // Safe to use Temporal
  const Temporal = getTemporal();
  // ... use Temporal
}
```

### `getTemporal(): TemporalLike`

Gets the Temporal object synchronously. Returns native Temporal, polyfill, or a typed stub.

**Returns:** The Temporal object (native, polyfill, or typed stub)

**Throws:** When accessing properties on the stub if Temporal is unavailable

**Example:**
```typescript
const Temporal = getTemporal();
const date = Temporal.PlainDateTime.from('2025-09-19T10:00');
```

### `TemporalLike`

Type alias for the Temporal namespace. Use this for type annotations without depending on `@js-temporal/polyfill`.

**Example:**
```typescript
function processDate(temporal: TemporalLike) {
  const now = temporal.Now.plainDateTime('iso8601');
  return now.toString();
}
```

## Usage Patterns

### Basic Usage

```typescript
import { getTemporal, hasTemporal } from '@agape/temporal';

// Check availability first
if (hasTemporal()) {
  const Temporal = getTemporal();
  const now = Temporal.Now.plainDateTime('iso8601');
  console.log('Current time:', now.toString());
}
```

### With Type Annotations

```typescript
import { getTemporal, TemporalLike } from '@agape/temporal';

function createDateTime(isoString: string): TemporalLike['PlainDateTime'] {
  const Temporal = getTemporal();
  return Temporal.PlainDateTime.from(isoString);
}
```

### Error Handling

```typescript
import { getTemporal } from '@agape/temporal';

try {
  const Temporal = getTemporal();
  const date = Temporal.PlainDateTime.from('2025-09-19T10:00');
  console.log(date.toString());
} catch (error) {
  if (error.message.includes('Temporal is not available')) {
    console.warn('Temporal not available, using Date fallback');
    const fallbackDate = new Date('2025-09-19T10:00');
    console.log(fallbackDate.toISOString());
  } else {
    throw error;
  }
}
```

### In Decorators

```typescript
import { getTemporal } from '@agape/temporal';

function temporalValidation() {
  const Temporal = getTemporal();
  
  return function(target: any, propertyKey: string) {
    // Decorator logic using Temporal
    const originalValue = target[propertyKey];
    // ... validation logic
  };
}

class MyClass {
  @temporalValidation()
  dateField: string = '2025-09-19T10:00';
}
```

## Environment Support

### Native Temporal Support

- **Node.js 20+**: Native Temporal support
- **Modern Browsers**: Chrome 84+, Firefox 95+, Safari 15.4+

### Polyfill Support

If native Temporal is not available, the library will automatically detect and use `@js-temporal/polyfill` if installed:

```bash
npm install @js-temporal/polyfill
```

### Fallback Behavior

When neither native Temporal nor polyfill is available, `getTemporal()` returns a typed stub that throws descriptive errors when accessed:

```typescript
const Temporal = getTemporal();
// This will throw: "Temporal is not available (accessed property: PlainDateTime). 
// Install @js-temporal/polyfill or use Node 20+/modern browsers."
const date = Temporal.PlainDateTime.from('2025-09-19T10:00');
```

## TypeScript Support

The library provides full TypeScript support with the `TemporalLike` type that covers the complete Temporal namespace:

```typescript
import { TemporalLike } from '@agape/temporal';

// Use TemporalLike for type annotations
function processTemporal(temporal: TemporalLike) {
  const now = temporal.Now.plainDateTime('iso8601');
  const date = temporal.PlainDateTime.from('2025-09-19T10:00');
  const time = temporal.PlainTime.from('10:00:00');
  
  return {
    now: now.toString(),
    date: date.toString(),
    time: time.toString()
  };
}
```

## Migration Guide

### From Direct Temporal Usage

**Before:**
```typescript
// Direct usage - requires Temporal to be available
const now = Temporal.Now.plainDateTime('iso8601');
```

**After:**
```typescript
import { getTemporal, hasTemporal } from '@agape/temporal';

if (hasTemporal()) {
  const Temporal = getTemporal();
  const now = Temporal.Now.plainDateTime('iso8601');
}
```

### From @js-temporal/polyfill

**Before:**
```typescript
import { Temporal } from '@js-temporal/polyfill';
// Requires polyfill to be installed
const now = Temporal.Now.plainDateTime('iso8601');
```

**After:**
```typescript
import { getTemporal, hasTemporal } from '@agape/temporal';

if (hasTemporal()) {
  const Temporal = getTemporal();
  const now = Temporal.Now.plainDateTime('iso8601');
}
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### 0.1.0
- Initial release
- Zero-dependency Temporal access
- Automatic native/polyfill detection
- Typed stub fallback
- Full TypeScript support