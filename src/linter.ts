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
import { getLogLevel, logger } from "./logger";
import { eslintReportToFormatOutput, eslintReportToLintOutput } from "./utils";

class Linter implements LinterAdapter {
  private cliEngine = new CLIEngine({
    fix: () => this.fix,
  });
  private fix = false;

  constructor() {
    logger.debug("Initializing Linter");

    const logLevel = getLogLevel();
    logger.debug(`Setting log level to "${logLevel}"`);
    logger.setLevel(logLevel);
  }

  public format({ filePath, text }: FormatInput): FormatOutput {
    logger.debug("Running format");
    filePath && logger.debug(`filePath: ${filePath}`);
    logger.debug(`text: ${text}`);
    logger.debug('Setting fix to "true"');
    this.fix = true;

    logger.debug("Running ESLint");
    const report = this.cliEngine.executeOnText(text, filePath);

    logger.debug('Setting fix to "false"');
    this.fix = false;

    const formatOutput = eslintReportToFormatOutput(report);
    logger.debug("Format done");
    return formatOutput;
  }

  public lint({ filePath, text }: LintInput): LintOutput {
    logger.debug("Running lint");
    filePath && logger.debug(`filePath: ${filePath}`);
    logger.debug(`text: ${text}`);

    logger.debug("Running ESLint");
    const report = this.cliEngine.executeOnText(text, filePath);

    const lintOutput = eslintReportToLintOutput(report);
    logger.debug("Format done");
    return lintOutput;
  }
}

const linterFactory: LinterFactory = () => new Linter();

const linterProvider: LinterProvider = {
  factory: linterFactory,
  name: "eslint",
  supportedExtensions: ["js", "jsx"],
};

export { Linter, linterFactory, linterProvider };
