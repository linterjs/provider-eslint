import fs from "jest-plugin-fs";
import { sep as separator } from "path";
import { Linter, linterFactory } from "./linter";

jest.mock("fs", () => {
  const realFs = require.requireActual("fs");
  const mockFs = require("jest-plugin-fs/mock");
  const { ufs } = require("unionfs");
  ufs.use(realFs).use(mockFs);
  return ufs;
});

beforeAll(() => {
  fs.root = process.cwd();
});

afterEach(() => {
  fs.restore();
  jest.resetModules();
});

test("Create linter", async () => {
  const linter = await linterFactory();
  expect(linter).toBeInstanceOf(Linter);
});

describe("Format", () => {
  test("with text and filePath", async () => {
    fs.mock({
      ".eslintrc.json": JSON.stringify({
        rules: {
          quotes: ["error", "single"],
          semi: ["warn"],
        },
      }),
    });

    const linter = await linterFactory();

    expect(
      linter.format({ filePath: "foo.js", text: 'var bar = "baz"' }),
    ).toEqual({
      errorCount: 0,
      filePath: `${process.cwd() + separator}foo.js`,
      messages: [],
      output: "var bar = 'baz';",
      warningCount: 0,
    });
  });

  test("with already formatted text", async () => {
    fs.mock({
      ".eslintrc.json": JSON.stringify({
        rules: {
          quotes: ["error", "single"],
          semi: ["warn"],
        },
      }),
    });

    const linter = await linterFactory();

    expect(
      linter.format({ filePath: "foo.js", text: "var foo = 'bar';" }),
    ).toEqual({
      errorCount: 0,
      filePath: `${process.cwd() + separator}foo.js`,
      messages: [],
      warningCount: 0,
    });
  });

  test("with ignored file", async () => {
    fs.mock({
      ".eslintrc.json": JSON.stringify({
        rules: {
          quotes: ["error", "single"],
          semi: ["warn"],
        },
      }),
      ".eslintignore": "foo.js",
    });

    const linter = await linterFactory();

    expect(
      linter.format({ filePath: "foo.js", text: 'var bar = "baz"' }),
    ).toMatchSnapshot();
  });
});

describe("Lint", () => {
  test("with text and filePath", async () => {
    fs.mock({
      ".eslintrc.json": JSON.stringify({
        rules: {
          quotes: ["error", "single"],
          semi: ["warn"],
        },
      }),
    });

    const linter = await linterFactory();

    expect(
      linter.lint({ filePath: "foo.js", text: 'var bar = "baz"' }),
    ).toEqual({
      errorCount: 1,
      filePath: `${process.cwd() + separator}foo.js`,
      messages: [
        {
          column: 11,
          endColumn: 16,
          endLine: 1,
          line: 1,
          message: "Strings must use singlequote.",
          ruleId: "quotes",
          severity: 2,
        },
        {
          column: 16,
          line: 1,
          message: "Missing semicolon.",
          ruleId: "semi",
          severity: 1,
        },
      ],
      warningCount: 1,
    });
  });

  test("with syntax error", async () => {
    fs.mock({
      ".eslintrc.json": JSON.stringify({
        rules: {
          quotes: ["error", "single"],
          semi: ["warn"],
        },
      }),
    });

    const linter = await linterFactory();

    expect(
      linter.lint({ filePath: "foo.js", text: 'var foo ==== "bar"' }),
    ).toEqual({
      errorCount: 1,
      filePath: `${process.cwd() + separator}foo.js`,
      messages: [
        {
          column: 9,
          line: 1,
          message: "Parsing error: Unexpected token ===",
          ruleId: "parser",
          severity: 2,
        },
      ],
      warningCount: 0,
    });
  });
});
