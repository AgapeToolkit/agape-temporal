/* eslint-disable @typescript-eslint/no-explicit-any */
// Test the temporal library functionality
describe('@agape/temporal', () => {
  // Store original globalThis.Temporal
  const originalTemporal = (globalThis as any).Temporal;

  beforeEach(async () => {
    // Reset global state
    delete (globalThis as any).Temporal;
    // Clear any agape temporal that might be set
    const { clearAgapeTemporal } = await import('./index');
    clearAgapeTemporal();
  });

  afterEach(async () => {
    // Restore original Temporal if it existed
    if (originalTemporal) {
      (globalThis as any).Temporal = originalTemporal;
    } else {
      delete (globalThis as any).Temporal;
    }
    // Clear any agape temporal that might be set
    const { clearAgapeTemporal } = await import('./index');
    clearAgapeTemporal();
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

  describe('setTemporal', () => {
    it('should set agape temporal and update namespace', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { setTemporal, Temporal, hasTemporal } = await import('./index');

      const mockTemporal = {
        PlainDateTime: {
          from: jest.fn().mockReturnValue({
            toString: jest.fn().mockReturnValue('2025-09-19T10:00:00'),
          }),
        },
      };

      setTemporal(mockTemporal as any);
      
      expect(hasTemporal()).toBe(true);
      expect(Temporal.PlainDateTime).toBe(mockTemporal.PlainDateTime);
    });

    it('should prioritize agape temporal over globalThis', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { setTemporal, Temporal, hasTemporal } = await import('./index');

      const agapeTemporal = {
        PlainDateTime: {
          from: jest.fn().mockReturnValue('agape-temporal'),
        },
      };

      const globalTemporal = {
        PlainDateTime: {
          from: jest.fn().mockReturnValue('global-temporal'),
        },
      };

      (globalThis as any).Temporal = globalTemporal;
      setTemporal(agapeTemporal as any);
      
      expect(hasTemporal()).toBe(true);
      expect(Temporal.PlainDateTime).toBe(agapeTemporal.PlainDateTime);
      expect(Temporal.PlainDateTime).not.toBe(globalTemporal.PlainDateTime);
    });

    it('should fall back to globalThis when agape temporal is cleared', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { setTemporal, clearAgapeTemporal, Temporal, hasTemporal } = await import('./index');

      const agapeTemporal = {
        PlainDateTime: {
          from: jest.fn().mockReturnValue('agape-temporal'),
        },
      };

      const globalTemporal = {
        PlainDateTime: {
          from: jest.fn().mockReturnValue('global-temporal'),
        },
      };

      (globalThis as any).Temporal = globalTemporal;
      setTemporal(agapeTemporal as any);
      
      expect(Temporal.PlainDateTime).toBe(agapeTemporal.PlainDateTime);
      
      clearAgapeTemporal();
      
      expect(hasTemporal()).toBe(true);
      expect(Temporal.PlainDateTime).toBe(globalTemporal.PlainDateTime);
    });

    it('should use stubs when no temporal is available', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { Temporal, hasTemporal } = await import('./index');

      expect(hasTemporal()).toBe(false);
      expect(Temporal.PlainDateTime).toBeDefined();
      expect(typeof Temporal.PlainDateTime).toBe('function');
    });
  });

  describe('Temporal namespace', () => {
    it('should work with native Temporal', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { Temporal, hasTemporal } = await import('./index');

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

      expect(hasTemporal()).toBe(true);
      expect(Temporal.PlainDateTime).toBeDefined();
      expect(Temporal.PlainDate).toBeDefined();
      expect(Temporal.PlainTime).toBeDefined();
    });

    it('should work with polyfill Temporal', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { Temporal, hasTemporal } = await import('./index');

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

      expect(hasTemporal()).toBe(true);
      expect(Temporal.PlainDateTime).toBeDefined();
      expect(Temporal.PlainDate).toBeDefined();
      expect(Temporal.PlainTime).toBeDefined();
    });
  });
  
  describe('integration scenarios', () => {
    it('should handle the example usage from documentation', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { Temporal, hasTemporal } = await import('./index');

      const mockTemporal = {
        PlainDateTime: {
          from: jest.fn().mockReturnValue({
            toString: jest.fn().mockReturnValue('2025-09-19T10:00:00'),
          }),
        },
      };
      (globalThis as any).Temporal = mockTemporal;

      if (hasTemporal()) {
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
      const { Temporal } = await import('./index');

      const mockTemporal = {
        PlainDateTime: {
          from: jest.fn(),
        },
      };
      (globalThis as any).Temporal = mockTemporal;

      // Simulate decorator usage - must be synchronous
      function temporalDecorator() {
        return function() {
          // Decorator logic here
          expect(Temporal).toBeDefined();
        };
      }

      // Test that the decorator function works
      const decorator = temporalDecorator();
      expect(typeof decorator).toBe('function');
      
      // Test that Temporal is available synchronously
      expect(Temporal).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should throw error when trying to instantiate stub classes', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { Temporal } = await import('./index');

      expect(() => {
        new (Temporal as any).PlainDateTime();
      }).toThrow('Temporal required. Use a JavaScript runtime which has Temporal or use a polyfill such as @js-temporal/polyfill or temporal-polyfill.');

      expect(() => {
        new (Temporal as any).Duration();
      }).toThrow('Temporal required. Use a JavaScript runtime which has Temporal or use a polyfill such as @js-temporal/polyfill or temporal-polyfill.');

      expect(() => {
        new (Temporal as any).TimeZone();
      }).toThrow('Temporal required. Use a JavaScript runtime which has Temporal or use a polyfill such as @js-temporal/polyfill or temporal-polyfill.');
    });
  });
});
