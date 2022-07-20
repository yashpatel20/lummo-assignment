import "jest";
import { Database } from "../../src/database";

describe("Database tests", () => {
  let database = new Database();
  database.map.set("key1", "value1");
  database.map.set("key2", "value2");

  test("Get", () => {
    const value = database.get("key1");
    expect(value).toBe("value1");
  });

  test("Set", () => {
    database.set("key3", "value3");
    const value = database.map.get("key3");
    expect(value).toBe("value3");
  });

  test("Search", () => {
    const results = database.search("key", null);
    expect(new Set(results)).toEqual(new Set(["key1", "key2", "key3"]));
  });
});
