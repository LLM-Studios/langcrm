import pino from "pino";
import "pino-pretty";

const LOG_LEVEL = process.env.LOG_LEVEL;

export const loggerOptions = {
  level: LOG_LEVEL || "info",
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
};

export const logger = pino(loggerOptions);
