import {Component, ProviderMap} from '@loopback/core';
import {WinstonLoggerProvider} from './winston-logger.provider';

export class WinstonLoggerComponent implements Component {
  providers?: ProviderMap = {
    'winston-logger': WinstonLoggerProvider,
  };
}
