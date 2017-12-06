import { registerLinter, LinterAdapter, LinterFactory, LintOutput } from "@linter/core";
import { CLIEngine } from "eslint";

const adapter: LinterAdapter = {
  format({ filePath, text }) {
    // TODO: Format all the things...
    return {};
  },
  lint({ filePath, text }) {
    // TOOD: Lint all the things...
    return {};
  },
};

const linterFactory: LinterFactory = () => adapter;

try {
  registerLinter("eslint", linterFactory);
} catch (error) {
  console.error(error);
}
