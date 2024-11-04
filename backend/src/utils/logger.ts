// import { createLogger, format, transports } from "winston";
// import morgan from "morgan";
// import path from "path";
// import fs from "fs";

// const logDirectory = path.join(__dirname, "../../logs");

// // Create the logs directory if it does not exist
// if (!fs.existsSync(logDirectory)) {
//   fs.mkdirSync(logDirectory, { recursive: true });
// }

// const logFormat = format.combine(
//   format.timestamp(),
//   format.printf(
//     ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
//   )
// );

// const logger = createLogger({
//   level: "info",
//   format: logFormat,
//   transports: [
//     new transports.Console(),
//     new transports.File({
//       filename: path.join(logDirectory, "error.log"),
//       level: "error",
//       format: logFormat,
//     }),
//     new transports.File({
//       filename: path.join(logDirectory, "combined.log"),
//       format: logFormat,
//     }),
//   ],
// });

// const stream = {
//   write: (message: string) => logger.info(message.trim()),
// };

// const requestLogger = morgan("combined", { stream });

// export { logger, requestLogger };

import { createLogger, format, transports } from "winston";
import morgan from "morgan";

const logFormat = format.combine(
  format.timestamp(),
  format.printf(
    ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
  )
);

const logger = createLogger({
  level: "info",
  format: logFormat,
  transports: [
    new transports.Console(), // Always log to console
  ],
});

// Conditionally add file transports if not in a serverless environment
if (process.env.NODE_ENV !== "production") {
  const path = require("path");
  logger.add(
    new transports.File({
      filename: path.join(__dirname, "../../logs/error.log"),
      level: "error",
      format: logFormat,
    })
  );
  logger.add(
    new transports.File({
      filename: path.join(__dirname, "../../logs/combined.log"),
      format: logFormat,
    })
  );
}

// Morgan stream for HTTP request logging
const stream = {
  write: (message: string) => logger.info(message.trim()),
};

const requestLogger = morgan("combined", { stream });

export { logger, requestLogger };
