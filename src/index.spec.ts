/* eslint-disable @typescript-eslint/no-explicit-any */
// Test the temporal library functionality
describe('@agape/temporal', () => {
  // Store original globalThis.Temporal
  const originalTemporal = (globalThis as any).Temporal;

  beforeEach(() => {
    // Reset global state
    delete (globalThis as any).Temporal;
  });

  afterEach(() => {
    // Restore original Temporal if it existed
    if (originalTemporal) {
      (globalThis as any).Temporal = originalTemporal;
    } else {
      delete (globalThis as any).Temporal;
    }
  });

  describe('hasTemporal', () => {
    it('should return true when native Temporal is available', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { hasTemporal } = await import('./index');
      
      const mockTemporal = {
        PlainDateTime: {
          from: jest.fn(),
        },
      };
      (globalThis as any).Temporal = mockTemporal;

      expect(hasTemporal()).toBe(true);
    });

    it('should return true when polyfill is available on globalThis', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { hasTemporal } = await import('./index');
      
      const mockPolyfill = {
        PlainDateTime: {
          from: jest.fn(),
        },
      };
      (globalThis as any).Temporal = mockPolyfill;

      expect(hasTemporal()).toBe(true);
    });

    it('should return false when Temporal is not available', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { hasTemporal } = await import('./index');
      
      expect(hasTemporal()).toBe(false);
    });

    it('should cache the result after first check', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { hasTemporal } = await import('./index');
      
      const mockTemporal = {
        PlainDateTime: {
          from: jest.fn(),
        },
      };
      (globalThis as any).Temporal = mockTemporal;

      // First call should check and cache
      expect(hasTemporal()).toBe(true);
      
      // Second call should use cached result
      expect(hasTemporal()).toBe(true);
    });
  });

  describe('getTemporal', () => {
    it('should return native Temporal when available', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { getTemporal } = await import('./index');
      
      const mockTemporal = {
        PlainDateTime: {
          from: jest.fn().mockReturnValue({
            toString: jest.fn().mockReturnValue('2025-09-19T10:00:00'),
          }),
        },
      };
      (globalThis as any).Temporal = mockTemporal;

      const temporal = getTemporal();
      expect(temporal).toBe(mockTemporal);
      expect(temporal.PlainDateTime.from).toBeDefined();
    });

    it('should return polyfill Temporal when available on globalThis', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { getTemporal } = await import('./index');
      
      const mockPolyfill = {
        PlainDateTime: {
          from: jest.fn().mockReturnValue({
            toString: jest.fn().mockReturnValue('2025-09-19T10:00:00'),
          }),
        },
      };
      (globalThis as any).Temporal = mockPolyfill;

      const temporal = getTemporal();
      expect(temporal).toBe(mockPolyfill);
      expect(temporal.PlainDateTime.from).toBeDefined();
    });

    it('should return cached Temporal on subsequent calls', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { getTemporal } = await import('./index');
      
      const mockTemporal = {
        PlainDateTime: {
          from: jest.fn(),
        },
      };
      (globalThis as any).Temporal = mockTemporal;

      const temporal1 = getTemporal();
      const temporal2 = getTemporal();
      
      expect(temporal1).toBe(temporal2);
      expect(temporal1).toBe(mockTemporal);
    });

    it('should return typed stub when Temporal is not available', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { getTemporal } = await import('./index');
      
      const temporal = getTemporal();
      expect(temporal).toBeDefined();
      expect(typeof temporal).toBe('object');
    });

    it('should throw descriptive error when accessing stub properties', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { getTemporal } = await import('./index');
      
      const temporal = getTemporal();
      
      expect(() => {
        (temporal as any).PlainDateTime;
      }).toThrow('Temporal is not available (accessed property: PlainDateTime). Install @js-temporal/polyfill or use Node 20+/modern browsers.');
    });

    it('should throw descriptive error when accessing nested stub properties', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { getTemporal } = await import('./index');
      
      const temporal = getTemporal();
      
      expect(() => {
        (temporal as any).PlainDateTime.from;
      }).toThrow('Temporal is not available (accessed property: PlainDateTime). Install @js-temporal/polyfill or use Node 20+/modern browsers.');
    });

    it('should work with different property names', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { getTemporal } = await import('./index');
      
      const temporal = getTemporal();
      
      expect(() => {
        (temporal as any).Now;
      }).toThrow('Temporal is not available (accessed property: Now). Install @js-temporal/polyfill or use Node 20+/modern browsers.');
    });
  });

  describe('TemporalLike type', () => {
    it('should be compatible with native Temporal', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { getTemporal } = await import('./index');
      
      const mockTemporal = {
        PlainDateTime: {
          from: jest.fn(),
        },
        PlainDate: {
          from: jest.fn(),
        },
        PlainTime: {
          from: jest.fn(),
        },
        Now: {
          plainDateTime: jest.fn(),
        },
      };
      (globalThis as any).Temporal = mockTemporal;

      const temporal = getTemporal();
      expect(temporal).toBeDefined();
      expect(temporal.PlainDateTime).toBeDefined();
      expect(temporal.PlainDate).toBeDefined();
      expect(temporal.PlainTime).toBeDefined();
      expect(temporal.Now).toBeDefined();
    });

    it('should be compatible with polyfill Temporal', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { getTemporal } = await import('./index');
      
      const mockPolyfill = {
        PlainDateTime: {
          from: jest.fn(),
        },
        PlainDate: {
          from: jest.fn(),
        },
        PlainTime: {
          from: jest.fn(),
        },
        Now: {
          plainDateTime: jest.fn(),
        },
      };
      (globalThis as any).Temporal = mockPolyfill;

      const temporal = getTemporal();
      expect(temporal).toBeDefined();
      expect(temporal.PlainDateTime).toBeDefined();
      expect(temporal.PlainDate).toBeDefined();
      expect(temporal.PlainTime).toBeDefined();
      expect(temporal.Now).toBeDefined();
    });
  });

  describe('integration scenarios', () => {
    it('should handle the example usage from documentation', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { getTemporal, hasTemporal } = await import('./index');
      
      const mockTemporal = {
        PlainDateTime: {
          from: jest.fn().mockReturnValue({
            toString: jest.fn().mockReturnValue('2025-09-19T10:00:00'),
          }),
        },
      };
      (globalThis as any).Temporal = mockTemporal;

      if (hasTemporal()) {
        const Temporal = getTemporal();
        const now = Temporal.PlainDateTime.from('2025-09-19T10:00');
        expect(now.toString()).toBe('2025-09-19T10:00:00');
      } else {
        throw new Error('Expected Temporal to be available');
      }
    });

    it('should handle fallback scenario when Temporal is not available', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { hasTemporal } = await import('./index');
      
      if (hasTemporal()) {
        throw new Error('Expected Temporal to not be available');
      } else {
        // console.warn('Temporal is not available — falling back to Date.');
        // In a real scenario, you would use Date here
        const fallbackDate = new Date();
        expect(fallbackDate).toBeInstanceOf(Date);
      }
    });

    it('should work in decorator context (synchronous)', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { getTemporal } = await import('./index');
      
      const mockTemporal = {
        PlainDateTime: {
          from: jest.fn(),
        },
      };
      (globalThis as any).Temporal = mockTemporal;

      // Simulate decorator usage - must be synchronous
      function temporalDecorator() {
        const temporal = getTemporal();
        return function(target: any, propertyKey: string) {
          // Decorator logic here
          expect(temporal).toBeDefined();
        };
      }

      class TestClass {
        @temporalDecorator()
        testProperty: string = 'test';
      }

      expect(new TestClass()).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should handle stub access with different property names', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { getTemporal } = await import('./index');
      
      const temporal = getTemporal();
      
      expect(() => {
        (temporal as any).PlainDateTime;
      }).toThrow('Temporal is not available (accessed property: PlainDateTime). Install @js-temporal/polyfill or use Node 20+/modern browsers.');
      
      expect(() => {
        (temporal as any).Now;
      }).toThrow('Temporal is not available (accessed property: Now). Install @js-temporal/polyfill or use Node 20+/modern browsers.');
      
      expect(() => {
        (temporal as any).Duration;
      }).toThrow('Temporal is not available (accessed property: Duration). Install @js-temporal/polyfill or use Node 20+/modern browsers.');
    });
  });
});