// tests/utils/createMock.ts
/**
 * createMock<T>()
 * Returns a typed jest.Mocked<T> where every property access returns the same jest.fn().
 * This avoids the common bug where Proxy returns a fresh jest.fn() each time.
 */
export function createMock<T>(): jest.Mocked<T> {
  const map = new Map<PropertyKey, unknown>();

  const proxy = new Proxy(
    {},
    {
      get: (_, prop: PropertyKey) => {
        if (map.has(prop)) return map.get(prop);
        // create a mock function and cache it
        const fn = jest.fn();
        map.set(prop, fn);
        return fn;
      },
      // handle typeof / util.inspect etc gracefully
      has: (_, prop: PropertyKey) => map.has(prop),
    }
  );

  return proxy as unknown as jest.Mocked<T>;
}
