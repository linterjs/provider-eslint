import {
  FormatOutput,
  LintMessage,
  LintOutput,
  LintSeverity,
} from "@linter/core";
import { ESLintMessage, ESLintReport, ESLintSeverity } from "./eslint";

export function eslintReportToLintOutput({
  errorCount,
  results: [{ filePath, messages, output }],
  warningCount,
}: ESLintReport): LintOutput {
  return {
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
}

export function eslintReportToFormatOutput(report): FormatOutput {
  const { results: [{ output }] } = report;
  return {
    ...eslintReportToLintOutput(report),
    ...(output && { output }),
  };
}
