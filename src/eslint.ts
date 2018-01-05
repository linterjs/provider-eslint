export const enum ESLintSeverity {
  WARNING = 1,
  ERROR = 2,
}

export interface ESLintMessageBase {
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

export interface ESLintMessageFatal extends ESLintMessageBase {
  fatal: true;
  ruleId: null;
}

export interface ESLintMessageNonFatal extends ESLintMessageBase {
  fatal: false;
  ruleId?: string;
}

export type ESLintMessage = ESLintMessageFatal | ESLintMessageNonFatal;

export interface ESLintResult {
  errorCount: number;
  filePath: string;
  fixableErrorCount: number;
  fixableWarningCount: number;
  messages: ESLintMessage[];
  output?: string;
  source?: string;
  warningCount: number;
}

export interface ESLintReport {
  errorCount: number;
  fixableErrorCount: number;
  fixableWarningCount: number;
  results: ESLintResult[];
  warningCount: number;
}
