import { Database } from "./database";
export class Service {
  repo: Database;
  constructor() {
    this.repo = new Database();
  }

  get(key: string): string | undefined {
    return this.repo.get(key);
  }

  set(key: string, value: string) {
    this.repo.set(key, value);
  }

  search(prefixKey: string | null, suffixKey: string | null): string[] {
    return this.repo.search(prefixKey, suffixKey);
  }
}
