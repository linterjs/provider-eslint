import { LinterAdapterLintInput, LinterAdapterLintOutput } from "@linter/core";
import { CLIEngine } from "eslint";

export function lint({
  filePath,
  text
}: LinterAdapterLintInput): LinterAdapterLintOutput {
  const cliEngine = new CLIEngine();
  const result = cliEngine.executeOnText(text, filePath);
  console.log(result);
  // TODO: Figure out result format
  return {};
}
