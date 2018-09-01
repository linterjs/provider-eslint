import {
  FormatOutput,
  LintMessage,
  LintOutput,
  LintSeverity,
} from "@linter/core";
import {
  ESLintMessage,
  ESLintReport,
  ESLintSeverity,
  ESLintResult,
} from "./eslint";
import { logger } from "./logger";

export function eslintReportToLintOutput(report: ESLintReport): LintOutput {
  const {
    errorCount,
    results: [{ filePath, messages = [] } = {} as ESLintResult],
    warningCount,
  } = report;

  logger.debug("ESLint report:", JSON.stringify(report, null, 2));

  const lintOutput = {
    errorCount,
    ...(filePath && { filePath }),
    warningCount,
    messages: messages.map<LintMessage>(
      ({
        column,
        endColumn,
        endLine,
        line,
        message,
        ruleId,
        severity,
      }: ESLintMessage) => ({
        column,
        ...(endColumn && { endColumn }),
        ...(endLine && { endLine }),
        line,
        message,
        ruleId: ruleId ? ruleId : "parser",
        severity:
          severity === ESLintSeverity.ERROR
            ? LintSeverity.ERROR
            : LintSeverity.WARNING,
      }),
    ),
  };

  logger.debug("Mapping ESLint report to LintOutput");

  return lintOutput;
}

export function eslintReportToFormatOutput(report: ESLintReport): FormatOutput {
  const {
    results: [{ output } = {} as ESLintResult],
  } = report;

  const formatOutput = {
    ...eslintReportToLintOutput(report),
    ...(output && { output }),
  };

  logger.debug("Mapping ESLint report and LintOutput to FormatOutput");

  return formatOutput;
}
