/**
 * These convert to sequential integers equal to the array index
 */
export enum XxxLogLevelEnum {
  ALL,
  DEBUG,
  INFO,
  WARN,
  ERROR,
  FATAL,
  OFF
}

export class XxxLogEntry {
  level: XxxLogLevelEnum;
  message: string;
  stack: string;
  time: Date;

  /**
   * Create a log entry object.
   * @param message: log message
   * @param level: log level, optional, default is ERROR
   */
  constructor(message: string, level?: XxxLogLevelEnum) {
    this.level = level || XxxLogLevelEnum.ERROR;
    this.message = message;
    this.time = new Date();
  }
}
