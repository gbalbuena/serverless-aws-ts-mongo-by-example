import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.simple()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.simple()
      )
    })
  ]
})

logger.info('Logger initialized...', {
  env: process.env['NODE_ENV']
});

if (process.env['NODE_ENV'] == 'dev') {
  const files = new transports.File({ filename: 'combined.log' });
  logger.clear().add(files);
}

export default logger;