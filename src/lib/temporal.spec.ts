/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Test the temporal library functionality
describe('@agape/temporal', () => {
  // Store original globalThis.Temporal
  const originalTemporal = (globalThis as any).Temporal;

  beforeEach(async () => {
    // Reset global state
    delete (globalThis as any).Temporal;
  });

  afterEach(async () => {
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
      const { hasTemporal } = await import('./temporal');

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
      const { hasTemporal } = await import('./temporal');

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
      const { hasTemporal } = await import('./temporal');

      expect(hasTemporal()).toBe(false);
    });

    it('should cache the result after first check', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { hasTemporal } = await import('./temporal');

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
    it('should set agape temporal and allow creating real temporal objects', async () => {
      // Clear module cache and re-import
      jest.resetModules();

      // Create a mock temporal polyfill
      const mockTemporal = {
        PlainDateTime: {
          from: jest.fn().mockImplementation((value: string) => ({
            toString: () => `2025-09-19T10:00:00`,
            year: 2025,
            month: 9,
            day: 19,
            hour: 10,
            minute: 0,
            second: 0,
          })),
        },
        PlainDate: {
          from: jest.fn().mockImplementation((value: string) => ({
            toString: () => `2025-09-19`,
            year: 2025,
            month: 9,
            day: 19,
          })),
        },
        Duration: {
          from: jest.fn().mockImplementation((value: string) => ({
            toString: () => `PT1H30M`,
            hours: 1,
            minutes: 30,
          })),
        },
      };

      const { setTemporal, Temporal, hasTemporal } = await import('./temporal');
      setTemporal(mockTemporal as any);

      expect(hasTemporal()).toBe(true);

      // Test creating real temporal objects using the namespace
      const dateTime = Temporal.PlainDateTime.from('2025-09-19T10:00');
      expect(dateTime.toString()).toBe('2025-09-19T10:00:00');
      expect(dateTime.year).toBe(2025);
      expect(dateTime.month).toBe(9);
      expect(dateTime.day).toBe(19);

      const date = Temporal.PlainDate.from('2025-09-19');
      expect(date.toString()).toBe('2025-09-19');
      expect(date.year).toBe(2025);

      const duration = Temporal.Duration.from('PT1H30M');
      expect(duration.toString()).toBe('PT1H30M');
      expect(duration.hours).toBe(1);
      expect(duration.minutes).toBe(30);
    });

    it('should prioritize agape temporal over globalThis', async () => {
      // Clear module cache and re-import
      jest.resetModules();

      const agapeTemporal = {
        PlainDateTime: {
          from: jest.fn().mockImplementation(() => ({
            toString: () => 'agape-temporal-result',
            source: 'agape',
          })),
        },
      };

      const globalTemporal = {
        PlainDateTime: {
          from: jest.fn().mockImplementation(() => ({
            toString: () => 'global-temporal-result',
            source: 'global',
          })),
        },
      };

      (globalThis as any).Temporal = globalTemporal;

      const { setTemporal, Temporal, hasTemporal } = await import('./temporal');
      setTemporal(agapeTemporal as any);

      expect(hasTemporal()).toBe(true);

      // Should use agape temporal, not global
      const result = Temporal.PlainDateTime.from('2025-09-19T10:00');
      expect(result.toString()).toBe('agape-temporal-result');
      expect((result as any).source).toBe('agape');
    });

    it('should fall back to globalThis when agape temporal is cleared', async () => {
      // Clear module cache and re-import
      jest.resetModules();

      const agapeTemporal = {
        PlainDateTime: {
          from: jest.fn().mockImplementation(() => ({
            toString: () => 'agape-temporal-result',
            source: 'agape',
          })),
        },
      };

      const globalTemporal = {
        PlainDateTime: {
          from: jest.fn().mockImplementation(() => ({
            toString: () => 'global-temporal-result',
            source: 'global',
          })),
        },
      };

      (globalThis as any).Temporal = globalTemporal;

      const { setTemporal, Temporal, hasTemporal } = await import('./temporal');
      setTemporal(agapeTemporal as any);

      // First should use agape
      let result = Temporal.PlainDateTime.from('2025-09-19T10:00');
      expect(result.toString()).toBe('agape-temporal-result');

      // Clear agape temporal by setting it to undefined
      setTemporal(undefined as any);

      expect(hasTemporal()).toBe(true);

      // Now should use global
      result = Temporal.PlainDateTime.from('2025-09-19T10:00');
      expect(result.toString()).toBe('global-temporal-result');
      expect((result as any).source).toBe('global');
    });

    it('should use stubs when no temporal is available', async () => {
      // Clear module cache and re-import
      jest.resetModules();
      const { Temporal, hasTemporal } = await import('./temporal');

      expect(hasTemporal()).toBe(false);
      expect(Temporal.PlainDateTime).toBeDefined();
      expect(typeof Temporal.PlainDateTime).toBe('function');

      // Should throw error when trying to create objects
      expect(() => {
        Temporal.PlainDateTime.from('2025-09-19T10:00');
      }).toThrow('Temporal required. Use a JavaScript runtime which has Temporal or use a polyfill such as @js-temporal/polyfill or temporal-polyfill.');
    });
  });

  describe('Temporal namespace with globalThis polyfill', () => {
    it('should work with native Temporal on globalThis', async () => {
      // Clear module cache and re-import
      jest.resetModules();

      // Set up a mock temporal polyfill on globalThis
      const mockTemporal = {
        PlainDateTime: {
          from: jest.fn().mockImplementation((value: string) => ({
            toString: () => `2025-09-19T10:00:00`,
            year: 2025,
            month: 9,
            day: 19,
            hour: 10,
            minute: 0,
            second: 0,
          })),
        },
        PlainDate: {
          from: jest.fn().mockImplementation((value: string) => ({
            toString: () => `2025-09-19`,
            year: 2025,
            month: 9,
            day: 19,
          })),
        },
        Duration: {
          from: jest.fn().mockImplementation((value: string) => ({
            toString: () => `PT2H45M`,
            hours: 2,
            minutes: 45,
          })),
        },
      };
      (globalThis as any).Temporal = mockTemporal;

      const { Temporal, hasTemporal } = await import('./temporal');

      expect(hasTemporal()).toBe(true);

      // Test creating real temporal objects using the namespace
      const dateTime = Temporal.PlainDateTime.from('2025-09-19T10:00');
      expect(dateTime.toString()).toBe('2025-09-19T10:00:00');
      expect(dateTime.year).toBe(2025);
      expect(dateTime.month).toBe(9);
      expect(dateTime.day).toBe(19);

      const date = Temporal.PlainDate.from('2025-09-19');
      expect(date.toString()).toBe('2025-09-19');
      expect(date.year).toBe(2025);

      const duration = Temporal.Duration.from('PT2H45M');
      expect(duration.toString()).toBe('PT2H45M');
      expect(duration.hours).toBe(2);
      expect(duration.minutes).toBe(45);
    });

    it('should work with polyfill Temporal on globalThis', async () => {
      // Clear module cache and re-import
      jest.resetModules();

      // Set up a mock polyfill on globalThis
      const mockPolyfill = {
        PlainDateTime: {
          from: jest.fn().mockImplementation((value: string) => ({
            toString: () => `polyfill-${value}`,
            source: 'polyfill',
          })),
        },
        PlainDate: {
          from: jest.fn().mockImplementation((value: string) => ({
            toString: () => `polyfill-date-${value}`,
            source: 'polyfill',
          })),
        },
        Duration: {
          from: jest.fn().mockImplementation((value: string) => ({
            toString: () => `polyfill-duration-${value}`,
            source: 'polyfill',
          })),
        },
      };
      (globalThis as any).Temporal = mockPolyfill;

      const { Temporal, hasTemporal } = await import('./temporal');

      expect(hasTemporal()).toBe(true);

      // Test creating real temporal objects using the namespace
      const dateTime = Temporal.PlainDateTime.from('2025-09-19T10:00');
      expect(dateTime.toString()).toBe('polyfill-2025-09-19T10:00');
      expect((dateTime as any).source).toBe('polyfill');

      const date = Temporal.PlainDate.from('2025-09-19');
      expect(date.toString()).toBe('polyfill-date-2025-09-19');
      expect((date as any).source).toBe('polyfill');

      const duration = Temporal.Duration.from('PT1H30M');
      expect(duration.toString()).toBe('polyfill-duration-PT1H30M');
      expect((duration as any).source).toBe('polyfill');
    });
  });

  describe('integration scenarios', () => {
    it('should handle the example usage from documentation', async () => {
      // Clear module cache and re-import
      jest.resetModules();

      const mockTemporal = {
        PlainDateTime: {
          from: jest.fn().mockReturnValue({
            toString: jest.fn().mockReturnValue('2025-09-19T10:00:00'),
          }),
        },
      };
      (globalThis as any).Temporal = mockTemporal;

      const { Temporal, hasTemporal } = await import('./temporal');

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
      const { hasTemporal } = await import('./temporal');

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
      const { Temporal } = await import('./temporal');

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
      const { Temporal } = await import('./temporal');

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
