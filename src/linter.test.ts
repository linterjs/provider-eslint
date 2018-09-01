import fs from "jest-plugin-fs";
import { Linter, linterProvider, linterFactory } from "./linter";

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
  const linter = await linterProvider.linterFactory();
  expect(linter).toBeInstanceOf(Linter);
});

describe("Format", () => {
  test("with text", async () => {
    fs.mock({
      ".eslintrc": JSON.stringify({
        rules: {
          quotes: ["error", "single"],
          semi: ["warn"],
        },
      }),
    });

    const linter = await linterProvider.linterFactory();

    expect(linter.format({ text: 'var foo = "bar"' })).toMatchSnapshot();
  });

  test("with text and filePath", async () => {
    fs.mock({
      ".eslintrc": JSON.stringify({
        rules: {
          quotes: ["error", "single"],
          semi: ["warn"],
        },
      }),
    });

    const linter = await linterProvider.linterFactory();

    expect(
      linter.format({ filePath: "./foo.js", text: 'var bar = "baz"' }),
    ).toEqual({
      errorCount: 0,
      filePath: `${process.cwd()}/foo.js`,
      messages: [],
      output: "var bar = 'baz';",
      warningCount: 0,
    });
  });

  test("with already formatted text", async () => {
    fs.mock({
      ".eslintrc": JSON.stringify({
        rules: {
          quotes: ["error", "single"],
          semi: ["warn"],
        },
      }),
    });

    const linter = await linterProvider.linterFactory();

    expect(linter.format({ text: "var foo = 'bar';" })).toMatchSnapshot();
  });

  test("with ignored file", async () => {
    fs.mock({
      ".eslintrc": JSON.stringify({
        rules: {
          quotes: ["error", "single"],
          semi: ["warn"],
        },
      }),
      ".eslintignore": "foo.js",
    });

    const linter = await linterProvider.linterFactory();

    expect(
      linter.format({ filePath: "foo.js", text: 'var bar = "baz"' }),
    ).toMatchSnapshot();
  });
});

describe("Lint", () => {
  test("with text", async () => {
    fs.mock({
      ".eslintrc": JSON.stringify({
        rules: {
          quotes: ["error", "single"],
          semi: ["warn"],
        },
      }),
    });

    const linter = await linterProvider.linterFactory();

    expect(linter.lint({ text: 'var foo = "bar"' })).toMatchSnapshot();
  });

  test("with text and filePath", async () => {
    fs.mock({
      ".eslintrc": JSON.stringify({
        rules: {
          quotes: ["error", "single"],
          semi: ["warn"],
        },
      }),
    });

    const linter = await linterProvider.linterFactory();

    expect(
      linter.lint({ filePath: "foo.js", text: 'var bar = "baz"' }),
    ).toEqual({
      errorCount: 1,
      filePath: `${process.cwd()}/foo.js`,
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
      ".eslintrc": JSON.stringify({
        rules: {
          quotes: ["error", "single"],
          semi: ["warn"],
        },
      }),
    });

    const linter = await linterProvider.linterFactory();

    expect(linter.lint({ text: 'var foo ==== "bar"' })).toMatchSnapshot();
  });
});
