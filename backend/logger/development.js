const { createLogger, format, transports } = require('winston');

const customFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const developmentLogger = createLogger({
  level: 'info',
  format: format.json(),
  defaultMeta: { service: 'organic-farms-api' },
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.timestamp({ format: 'HH:mm:ss' }), customFormat),
      handleExceptions: true,
      handleRejections: true,
    }),
  ],
});

module.exports = developmentLogger;
