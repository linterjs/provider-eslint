import {
  FormatInput,
  FormatOutput,
  LinterAdapter,
  LinterFactory,
  LinterProvider,
  LintInput,
  LintOutput,
} from "@linter/core";
import { CLIEngine } from "eslint";
import { eslintReportToFormatOutput, eslintReportToLintOutput } from "./utils";

export class Linter implements LinterAdapter {
  private cliEngine = new CLIEngine({
    fix: () => this.fix,
  });
  private fix = false;

  public format({ filePath, text }: FormatInput): FormatOutput {
    this.fix = true;
    const report = this.cliEngine.executeOnText(text, filePath, true);
    this.fix = false;

    return eslintReportToFormatOutput(report);
  }

  public lint({ filePath, text }: LintInput): LintOutput {
    const report = this.cliEngine.executeOnText(text, filePath, true);

    return eslintReportToLintOutput(report);
  }
}

export const linterFactory: LinterFactory = () => new Linter();

export const linterProvider: LinterProvider = {
  linterFactory,
  name: "eslint",
};
