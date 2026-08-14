import pc from 'picocolors';

export class Logger {
  /**
   * Logs general application and workflow information (Green).
   */
  static log(message: string, context?: any): void {
    const timestamp = this.getTimestamp();
    const prefix = pc.green(`[INFO]  [${timestamp}]`);
    
    if (context) {
      console.log(`${prefix} ${message}`, context);
    } else {
      console.log(`${prefix} ${message}`);
    }
  }

  /**
   * Logs warnings or non-fatal anomalies (Yellow).
   */
  static warn(message: string, context?: any): void {
    const timestamp = this.getTimestamp();
    const prefix = pc.yellow(`[WARN]  [${timestamp}]`);
    
    if (context) {
      console.warn(`${prefix} ${message}`, context);
    } else {
      console.warn(`${prefix} ${message}`);
    }
  }

  /**
   * Logs fatal exceptions and specialized database query errors (Red).
   */
  static error(message: string, error: any): void {
    const timestamp = this.getTimestamp();
    const prefix = pc.red(`[ERROR] [${timestamp}]`);
    
    // Check if the error is a specialized Drizzle/Postgres syntax error
    if (error && typeof error === 'object' && 'cause' in error && error.cause?.code === '22P02') {
      const dbError = error.cause;
      console.error(
        `${prefix} ${pc.bold(message)}\n` +
        `${pc.red('└── Database Error:')} Invalid input syntax (UUID format mismatch)\n` +
        `${pc.red('└── Failed Query:')} ${error.query}\n` +
        `${pc.red('└── Sent Params:')} [${error.params?.join(', ')}]\n` +
        `${pc.red('└── Location:')} ${dbError.file} line ${dbError.line} (${dbError.routine})`
      );
      return;
    }

    // Fallback for standard system or native runtime exceptions
    console.error(`${prefix} ${pc.bold(message)}`, error);
  }

  private static getTimestamp(): string {
    return new Date().toLocaleTimeString('en-US', { hour12: false });
  }
}
