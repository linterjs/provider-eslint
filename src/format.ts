import {
  LinterAdapterFormatInput,
  LinterAdapterFormatOutput
} from "@linter/core";
import { CLIEngine, Linter } from "eslint";

export function format({
  filePath,
  text
}: LinterAdapterFormatInput): LinterAdapterFormatOutput {
  const cliEngine = new CLIEngine();
  const config = cliEngine.getConfigForFile(filePath);
  const linter = new Linter();
  const result = linter.verifyAndFix(text, config, filePath);
  // TODO: Better output format, formatted text isn't enough?
  return result.output;
}
