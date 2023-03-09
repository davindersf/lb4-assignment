import {Provider} from '@loopback/core';
import winston, {createLogger, format, transports} from 'winston';
import {Logger, LogLevel} from './winston-logger.types';

export class WinstonLoggerProvider implements Provider<Logger> {
  private logger: winston.Logger;

  constructor() {
    this.logger = createLogger({
      format: format.json(),
      transports: [
        new transports.File({filename: 'error.log', level: 'error'}),
        new transports.File({filename: 'combined.log'}),
      ],
    });
  }

  value(): Logger {
    return (msg: string, level: LogLevel = LogLevel.INFO) => {
      switch (level) {
        case LogLevel.ERROR:
          this.logger.error(msg);
          break;
        default:
          this.logger.info(msg);
      }
    };
  }
}
