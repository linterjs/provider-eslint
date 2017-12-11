import { format } from "./format";

describe("Format", () => {
  test("Format", () => {
    const text = 'var foo = "bar"';
    expect(format({ text })).toEqual(text);
  });
});
