export type Logger = (msg: string, level?: LogLevel) => void;

export enum LogLevel {
  INFO = 'INFO',
  ERROR = 'ERROR',
}
