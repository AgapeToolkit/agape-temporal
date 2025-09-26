# @agape/temporal

Access the Temporal namespace safely, even in environments where it's not natively available.

@agape/temporal provides a drop-in mechanism for working with Temporal objects 
without requiring the native Temporal API to be installed. If Temporal is 
unavailable, this library provides stub implementations that raise clear runtime
errors (`TemporalNotAvailableError`), allowing your code to fail gracefully or fall back to alternatives.

## 🚀 Get Started

```typescript
import { Temporal, hasTemporal, setTemporal } from '@agape/temporal';

// Always works - checks for Temporal availability
if (hasTemporal()) {
  const now = Temporal.PlainDateTime.from('2025-09-19T10:00');
  console.log(now.toString()); // "2025-09-19T10:00:00"
} else {
  console.log('Temporal not available, using fallback');
}
```

### With Polyfill

If the native Temporal exists, or  polyfill has been set on the `globalThis`, that
will be the implementation used.

```typescript
import { Temporal as TemporalPolyfill } from '@js-temporal/polyfill';
(globalThis as any)['Temporal'] = TemporalPolyfill;

import { Temporal } from '@agape/temporal';

// Temporal just works
const date = Temporal.PlainDate.from('2025-09-19');
const duration = Temporal.Duration.from('PT1H30M');
```

### With Agape Configuration

You can configure which implementation Agape uses.

```typescript
import { Temporal as TemporalPolyfill } from '@js-temporal/polyfill';
import { setTemporal, Temporal } from '@agape/temporal';

setTemporal(TemporalPolyfill);

const date = Temporal.PlainDate.from('2025-09-19');
const duration = Temporal.Duration.from('PT1H30M');
```

## 📖 API

### `Temporal` Namespace
Use the full Temporal API - `Temporal.PlainDateTime`, `Temporal.PlainDate`, `Temporal.Duration`, etc. Works with real Temporal or provides helpful error stubs.

### `hasTemporal(): boolean`
Check if Temporal is available before using it.

### `setTemporal(temporal): void`
Configure your preferred Temporal implementation (polyfill, custom, etc.).

## ⚠️ Error Handling

When Temporal is not available, the library throws `TemporalNotAvailableError` with helpful guidance:

```typescript
import { Temporal, TemporalNotAvailableError } from '@agape/temporal';

try {
  const date = Temporal.PlainDate.from('2025-09-19');
} catch (error) {
  if (error instanceof TemporalNotAvailableError) {
    console.error('Temporal not available:', error.message);
    // Handle gracefully or use fallback
  }
}
```

The error message includes guidance on resolving the issue:
- Use a JavaScript runtime with native Temporal support
- Install a polyfill like `@js-temporal/polyfill`

---

## 📚 Documentation

See the full API documentation at [agape.dev/api](https://agape.dev/api).

## 📦 Agape Toolkit

This package is part of the [Agape Toolkit](https://github.com/AgapeToolkit/AgapeToolkit) - a comprehensive collection of TypeScript utilities and libraries for modern web development.
