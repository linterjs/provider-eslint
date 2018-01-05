import { registerLinterProvider } from "@linter/core";
import { oneLine } from "common-tags";
import { resolve } from "path";
import { logger } from "./logger";

const packageName = require(resolve("../package.json")).name;

try {
  registerLinterProvider(packageName);
} catch (error) {
  logger.error(oneLine`
    An error occured white registering linter, re-install the package to try
    again.
  `);
}
