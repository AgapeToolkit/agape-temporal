# @agape/temporal

Access the Temporal namespace safely, even in environments where it's not natively available.

`@agape/temporal` is designed primarily for **library authors** who need to work with Temporal but can’t guarantee it’s installed in the consumer’s runtime. It provides a drop-in `Temporal` namespace that either uses the real implementation (native or polyfill) or falls back to stubs that throw clear runtime errors. This lets your library **safely reference Temporal types**, fail gracefully when it’s unavailable, and let consumers decide whether to install a polyfill.

Example pattern for library authors:

```typescript
import { Temporal, hasTemporal } from '@agape/temporal';

export function addHours(hours: number) {
  if (!hasTemporal()) {
    throw new Error('Temporal support required for addHours');
  }

  return Temporal.Now.plainDateTimeISO().add({ hours });
}
```

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

If the native Temporal exists, or a polyfill has been set on the `globalThis`, that
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
Use the full Temporal API — `Temporal.PlainDateTime`, `Temporal.PlainDate`, `Temporal.Duration`, etc. Works with real Temporal or provides helpful error stubs.

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

## 🔗 Dependency on `@js-temporal/polyfill`

This package lists `@js-temporal/polyfill` as a dependency so that its **type definitions** are always available at build time.

- **No Runtime Code Included:** The polyfill’s runtime is **never imported or bundled** by `@agape/temporal`.
- **Safe for Library Authors:** Your consumers remain free to install or omit a polyfill — you are not forcing one into their build.
- **Tree-Shakable:** Modern bundlers will include nothing from `@js-temporal/polyfill` at runtime unless you explicitly call `setTemporal` with it or attach it to `globalThis` yourself.

This means you can confidently use `Temporal` types in your library’s API surface without bloating your downstream consumers’ bundles.

---

## 📚 Documentation

See the full API documentation at [agape.dev/api](https://agape.dev/api).

---

## 📦 Agape Toolkit

This package is part of the [Agape Toolkit](https://github.com/AgapeToolkit/AgapeToolkit) — a comprehensive collection of TypeScript utilities and libraries for modern web development.
