import { LinterAdapterLintInput, LinterAdapterLintOutput } from "@linter/core";
import { CLIEngine, Linter } from "eslint";

export function lint({
  filePath,
  text
}: LinterAdapterLintInput): LinterAdapterLintOutput {
  const cliEngine = new CLIEngine();
  const config = cliEngine.getConfigForFile(filePath);
  const linter = new Linter();
  const result = linter.verify(text, config, filePath);
  console.log(JSON.stringify(result, null, 2));
  // TODO: Figure out common output format
  return {};
}
