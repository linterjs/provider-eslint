import { registerLinter, LinterAdapter, LinterFactory } from "@linter/core";
import { format } from "./format";
import { lint } from "./lint";

const adapter: LinterAdapter = {
  format,
  lint
};

const linterFactory: LinterFactory = () => adapter;

try {
  registerLinter("eslint", linterFactory);
} catch (error) {
  console.error(error);
}
