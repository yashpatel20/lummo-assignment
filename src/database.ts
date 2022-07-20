export class Database {
  map: Map<string, string>;
  constructor() {
    this.map = new Map();
  }

  count(): number {
    return this.map.size;
  }

  get(key: string): string | undefined {
    return this.map.get(key);
  }

  set(key: string, value: string) {
    this.map.set(key, value);
  }

  search(prefixKey: string | null, suffixKey: string | null): string[] {
    let keys = Array.from(this.map.keys());
    if (prefixKey != null) {
      keys = keys.filter((s) => s.startsWith(prefixKey));
    }
    if (suffixKey != null) {
      keys = keys.filter((s) => s.endsWith(suffixKey));
    }
    return keys;
  }
}
