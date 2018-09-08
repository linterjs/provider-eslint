const enum ESLintSeverity {
  WARNING = 1,
  ERROR = 2,
}

interface ESLintMessageBase {
  column: number;
  endColumn?: number;
  endLine?: number;
  fatal?: boolean;
  fix?: object;
  line: number;
  message: string;
  nodeType: string;
  ruleId?: string | null;
  severity: ESLintSeverity;
}

interface ESLintMessageFatal extends ESLintMessageBase {
  fatal: true;
  ruleId: null;
}

interface ESLintMessageNonFatal extends ESLintMessageBase {
  fatal: false;
  ruleId?: string;
}

type ESLintMessage = ESLintMessageFatal | ESLintMessageNonFatal;

interface ESLintResult {
  errorCount: number;
  filePath: string;
  fixableErrorCount: number;
  fixableWarningCount: number;
  messages: ESLintMessage[];
  output?: string;
  source?: string;
  warningCount: number;
}

interface ESLintReport {
  errorCount: number;
  fixableErrorCount: number;
  fixableWarningCount: number;
  results: ESLintResult[];
  warningCount: number;
}

export {
  ESLintMessage,
  ESLintMessageBase,
  ESLintMessageFatal,
  ESLintMessageNonFatal,
  ESLintReport,
  ESLintResult,
  ESLintSeverity,
};
