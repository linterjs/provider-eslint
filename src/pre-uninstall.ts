import { deregisterLinterProvider } from "@linter/core";
import { resolve } from "path";
import { logger } from "./logger";

const packageName = require(resolve("../package.json")).name;

try {
  deregisterLinterProvider(packageName);
} catch (error) {
  logger.error("An error occured white deregistering linter.");
}
