export function assignOwnProperties<T, U>(target: T, source: U): T & U {
  let index: number;
  let key: string | symbol;
  let keys: (string | symbol)[] = Object.getOwnPropertyNames(source);

  for (index = 0; index < keys.length; index += 1) {
    key = keys[index];
    Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)!);
  }

  if (Object.getOwnPropertySymbols) {
    keys = Object.getOwnPropertySymbols(source);

    for (index = 0; index < keys.length; index += 1) {
      key = keys[index];
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)!);
    }
  }

  return target as T & U;
}
