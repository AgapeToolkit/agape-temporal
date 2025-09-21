# @agape/temporal

Temporal namespace

Access the Temporal namespace even when Temporal isn't installed on the system.
This allows you to program with Temporal objects, and hide them behind a check to
see if Temporal is available before calling them. If Temporal is not installed on the
system the objects will be replaced with no-op objects that produce errors when used.


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


---

## 📚 Documentation

See the full API documentation at [agape.dev/api](https://agape.dev/api).

## 📦 Agape Toolkit

This package is part of the [Agape Toolkit](https://github.com/AgapeToolkit/AgapeToolkit) - a comprehensive collection of TypeScript utilities and libraries for modern web development.
