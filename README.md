# @agape/temporal

A stand-in for Temporal that lets you program for systems with or without Temporal support.

## ✨ Functions

### `hasTemporal(): boolean`
Check if Temporal is available in the current environment.

### `getTemporal(): TemporalLike`
Get the Temporal object. Returns real Temporal if available, typed stub if not.

### `TemporalLike`
Type alias for the complete Temporal namespace. Use for type annotations.

---

## 🚀 Example

```typescript
import { getTemporal, hasTemporal } from '@agape/temporal';

if (hasTemporal()) {
  const Temporal = getTemporal();
  const now = Temporal.PlainDateTime.from('2025-09-19T10:00');
  console.log(now.toString());
} else {
  console.warn('Temporal not available, using Date fallback');
  const fallback = new Date();
}
```

## Environment Support

- **Native Temporal**: Node.js 20+, Chrome 84+, Firefox 95+, Safari 15.4+
- **Polyfill**: Works with any configured polyfill
- **Fallback**: Typed stub with helpful error messages


---

## 📚 Documentation

See the full API documentation at [agape.dev/api](https://agape.dev/api).

## 📦 Agape Toolkit

This package is part of the [Agape Toolkit](https://github.com/AgapeToolkit/AgapeToolkit) - a comprehensive collection of TypeScript utilities and libraries for modern web development.
