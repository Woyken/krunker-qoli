// eslint-disable-next-line no-console
const localConsoleLog = console.log.bind(console);

const logsEnabled = true;

class ScopedLogger {
    private argsScope: unknown[];

    constructor(...argsScope: unknown[]) {
        this.argsScope = argsScope;
    }

    createScopedLogger(...argsScope: unknown[]) {
        return new ScopedLogger(...this.argsScope, ...argsScope);
    }

    log(...args: unknown[]) {
        if (logsEnabled) localConsoleLog(...this.argsScope, ...args);
    }
}

export default function createScopedLogger(...argsScope: unknown[]) {
    return new ScopedLogger('[Krunker Qoli]', ...argsScope);
}
