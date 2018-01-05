import { Linter, linterProvider } from "./linter";
import { LinterAdapter } from "@linter/core";

let linter: LinterAdapter;

test("Create linter", async () => {
  linter = await linterProvider.linterFactory();
  expect(linter).toBeInstanceOf(Linter);
});

describe("Format", () => {
  test("with text", () => {
    expect(linter.format({ text: 'var foo = "bar"' })).toMatchSnapshot();
  });

  test("with text and filePath", () => {
    expect(
      linter.format({ filePath: "foo.js", text: 'var bar = "baz"' }),
    ).toMatchSnapshot();
  });
});

describe("Lint", () => {
  test("with text", () => {
    expect(linter.lint({ text: 'var foo = "bar"' })).toMatchSnapshot();
  });

  test("with syntax error", () => {
    expect(linter.lint({ text: 'var foo ==== "bar"' })).toMatchSnapshot();
  });
});
