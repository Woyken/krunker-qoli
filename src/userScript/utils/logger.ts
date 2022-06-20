const localConsoleLog = console.log.bind(console);

const logsEnabled = true;

class ScopedLogger {
  private argsScope: any[];

  constructor(...argsScope: any[]) {
    this.argsScope = argsScope;
  }

  createScopedLogger(...argsScope: any[]) {
    return new ScopedLogger(...this.argsScope, ...argsScope);
  }

  log(...args: any[]) {
    if (logsEnabled) localConsoleLog(...this.argsScope, ...args);
  }
}

export function createScopedLogger(...argsScope: any[]) {
  return new ScopedLogger("[Krunker Qoli]", ...argsScope);
}
