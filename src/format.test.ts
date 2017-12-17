import { format } from "./format";

describe("Format", () => {
  test("Format", () => {
    expect(format({ text: 'var foo = "bar"' })).toMatchSnapshot();
  });
});
