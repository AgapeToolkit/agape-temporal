# @agape/metadata

Metadata annotations and descriptors for TypeScript classes, properties, methods, and parameters.

## ✨ Decorators

### `@Description(text)`
Attaches human-readable descriptions to classes, properties, methods, or parameters.

### `@Label(singular, plural?)`
Provides display labels for UI components and documentation.

### `@Name(name)`
Specifies custom names for serialization and identification.

### `@Sensitive(flag?)`
Marks elements as containing sensitive data (defaults to `true`).

### `@Token(singular, plural?)`
Associates tokens with elements for external system integration.

### `@Noun(singular, plural?)`
Defines grammatical nouns for natural language processing.

### `@Example(value)`
Provides example values for documentation and validation.

---

## 🚀 Example

```ts
import { Description, Label, Sensitive, Token, Noun, label, description, tokens } from '@agape/metadata';

@Label('User')
@Token('user')
@Noun('user', 'users')
@Description('User account with authentication and profile information')
class User {
  
  @Label('User ID')
  @Description('Unique identifier for the user')
  id!: number;
  
  @Label('Email Address')
  @Description('The user\'s email address for login and notifications')
  @Sensitive()
  email!: string;

  @Label('Full Name')
  @Description('The user\'s full name as displayed on their profile')
  fullName!: string;

  @Label('Created At')
  @Description('Account creation timestamp')
  createdAt!: Date;
}
```
---

## 🏗️ MetadataDescriptor

### `MetadataDescriptor.for(target, property?, index?)`
Creates or retrieves a metadata descriptor for a class, property, or parameter.

### `MetadataDescriptor.get(target, property?, index?)`
Retrieves an existing metadata descriptor for a class, property, or parameter.

---

## 📚 Documentation

See the full API documentation at [agape.dev/api](https://agape.dev/api).


## 📦 Agape Toolkit

This package is part of the [Agape Toolkit](https://github.com/AgapeToolkit/AgapeToolkit) - a comprehensive collection of TypeScript utilities and libraries for modern web development.
